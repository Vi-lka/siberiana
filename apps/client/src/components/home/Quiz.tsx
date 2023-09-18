"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ZodError } from "zod";
import { Questions } from "@siberiana/schemas";
import type { ErrorsDict, QuizDict } from "@siberiana/schemas";
import { useQuestions } from "~/lib/queries/strapi-client";
import getLinkDir from "~/lib/utils/getLinkDir";
import QuizSkeleton from "../skeletons/QuizSkeleton";
import ButtonComponent from "../ui/ButtonComponent";
import ErrorToast from "../errors/ErrorToast";

export default function Quiz({
  qiuzDict,
  errorDict,
}: {
  qiuzDict: QuizDict;
  errorDict: ErrorsDict;
}) {
  const [answer, setAnswer] = React.useState<boolean>();
  const [tryAgain, setTryAgain] = React.useState<boolean>();

  // Get all questions TODO: if useQuestions() returns random we will get only one question
  const { data, isLoading, error } = useQuestions();

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
  if (error){
    return (
      <ErrorToast
        dict={errorDict}
        error={error.message}
        place="Quiz"
      />
    );
  }
  if (!data || !(data.questions.data) || !(data.questions.data[questionRandomId])){
    return null
  }

  // Validate data
  try {
    Questions.parse(data);
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
    <div className="grid md:grid-cols-2 justify-center gap-6 mb-24">
      <h1 className="md:hidden font-OpenSans mb-0 text-xl font-bold uppercase lg:text-2xl">
        {question.attributes.title}
      </h1>
      <div className="relative h-[300px] md:w-full w-[85%] mx-auto max-w-[800px] overflow-hidden rounded-md 2xl:h-[350px]">
        <Image
          src={
            question.attributes.image.data
              ? question.attributes.image.data.attributes.url
              : "/images/image-placeholder.png"
          }
          fill
          className={"object-cover"}
          sizes="(max-width: 1280px) 45vw, 35vw"
          alt={question.attributes.title}
          priority={true}
        />
      </div>

      <div className="flex flex-col justify-between md:w-full w-[85%] mx-auto">
        <div>
          <h1 className="md:block hidden font-OpenSans mb-6 text-lg font-bold uppercase lg:text-2xl">
            {question.attributes.title}
          </h1>
          <p className="font-Inter mb- text-xs lg:text-sm md:mb-0 mb-6">
            {question.attributes.tip}
          </p>
        </div>

        {answer === undefined ? (
          <div className="grid md:grid-cols-2 gap-6">
            {question.attributes.variants.map((elem) => (
              <ButtonComponent
                key={elem.index}
                className="px-8 py-6 text-xs lg:text-sm"
                type="button"
                onClick={() => handleAnswer(elem.index)}
              >
                {elem.title}
              </ButtonComponent>
            ))}
          </div>
        ) : answer ? (
          <div className="flex flex-col gap-6 text-center">
            <h1 className="font-OpenSans text-xl font-bold uppercase text-lime-600 dark:text-lime-800">
              {qiuzDict.right}
            </h1>

            <Link href={getLinkDir(question.attributes.url)}>
              <ButtonComponent className="w-fit px-8 py-6 text-xs lg:text-sm">
                {question.attributes.urlName}
              </ButtonComponent>
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-6 text-center">
            <h1 className="font-OpenSans text-lg font-bold uppercase text-red-600 dark:text-red-800 lg:text-xl">
              {qiuzDict.wrong}
            </h1>

            <ButtonComponent
              className="w-fit px-8 py-6 text-xs lg:text-sm mx-auto"
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
