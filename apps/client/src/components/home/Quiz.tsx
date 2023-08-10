"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ZodError } from "zod";

import { QuestionsSchema } from "@siberiana/schemas";
import type { ErrorsDictType, QuizDictType } from "@siberiana/schemas";

import { useQuestions } from "~/lib/queries/strapi-client";
import getLinkDir from "~/lib/utils/getLinkDir";
import getURL from "~/lib/utils/getURL";
import { useLocale } from "~/lib/utils/useLocale";
import QuizSkeleton from "../skeletons/QuizSkeleton";
import ButtonComponent from "../ui/ButtonComponent";
import ErrorToast from "../ui/ErrorToast";

export default function Quiz({
  qiuzDict,
  errorDict,
}: {
  qiuzDict: QuizDictType;
  errorDict: ErrorsDictType;
}) {
  const [answer, setAnswer] = React.useState<boolean>();
  const [tryAgain, setTryAgain] = React.useState<boolean>();

  const locale = useLocale();

  // Get all questions TODO: if useQuestions() returns random we will get only one question
  const { data, isLoading, error } = useQuestions(locale);

  // Get random question
  const { questionRandomId } = React.useMemo<{ questionRandomId: number }>(
    () => ({
      questionRandomId: data
        ? Math.floor(Math.random() * data.questions.data.length)
        : Math.floor(Math.random() * 2),
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, tryAgain],
  );

  // Check for data
  if (isLoading) return <QuizSkeleton />;
  if (!data || !(data.questions.data) || !(data.questions.data[questionRandomId]) || error){
    return (
      <ErrorToast
        dict={errorDict}
        error={error ? error.message : "Quiz Data is undefined"}
        place="Quiz"
      />
    );
  }

  // Validate data
  try {
    QuestionsSchema.parse(data);
  } catch (error) {
    console.log((error as ZodError).issues);
    return <ErrorToast dict={errorDict} error={(error as ZodError).issues} place="Quiz" />;
  }

  const dataResult = data;

  // Set question
  const question = dataResult.questions.data[questionRandomId];

  function handleAnswer(index: number) {
    question.attributes.answerIndex === index
      ? setAnswer(true)
      : setAnswer(false);
  }

  function handleWrong() {
    setAnswer(undefined);
    setTryAgain(!tryAgain);
    // void refetch(); // TODO: if useQuestions() returns random
  }

  return (
    <div className="hidden grid-cols-2 justify-center gap-6 md:grid">
      <div className="relative h-[300px] w-full max-w-[800px] overflow-hidden rounded-md 2xl:h-[350px]">
        <Image
          src={
            question.attributes.image.data
              ? getURL(question.attributes.image.data.attributes.url, "strapi")
              : "/images/image-placeholder.png"
          }
          fill
          className={"object-cover"}
          sizes="(max-width: 1280px) 45vw, 35vw"
          alt={question.attributes.title}
          priority={true}
        />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <h1 className="font-OpenSans mb-6 text-lg font-bold uppercase lg:text-2xl">
            {question.attributes.title}
          </h1>
          <p className="font-Inter mb- text-xs lg:text-sm">
            {question.attributes.tip}
          </p>
        </div>

        {answer === undefined ? (
          <div className="grid grid-cols-2 gap-6">
            {question.attributes.variants.map((elem) => (
              <ButtonComponent
                key={elem.index}
                className="font-Inter px-8 py-6 text-xs uppercase lg:text-sm"
                type="button"
                onClick={() => handleAnswer(elem.index)}
              >
                {elem.title}
              </ButtonComponent>
            ))}
          </div>
        ) : answer ? (
          <div className="flex flex-col gap-6">
            <h1 className="font-OpenSans text-xl font-bold uppercase text-lime-600 dark:text-lime-800">
              {qiuzDict.right}
            </h1>

            <Link href={getLinkDir(question.attributes.url, locale)}>
              <ButtonComponent className="font-Inter w-fit px-8 py-6 text-xs uppercase lg:text-sm">
                {question.attributes.urlName}
              </ButtonComponent>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6">
            <h1 className="font-OpenSans text-lg font-bold uppercase text-red-600 dark:text-red-800 lg:text-xl">
              {qiuzDict.wrong}
            </h1>

            <ButtonComponent
              className="font-Inter w-fit px-8 py-6 text-xs uppercase lg:text-sm"
              onClick={() => handleWrong()}
            >
              {qiuzDict.tryAgain}
            </ButtonComponent>
          </div>
        )}
      </div>
    </div>
  );
}
