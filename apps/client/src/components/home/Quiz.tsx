"use client"

import React from 'react'
import ButtonComponent from '../ui/ButtonComponent'
import { useQuery } from '@tanstack/react-query'
import { fetchQuestions } from '~/lib/queries/strapi-client'
import QuizSkeleton from '../skeletons/QuizSkeleton'
import type { QuizType } from '@siberiana/schemas'
import { useLocale } from '~/lib/utils/useLocale'
import Link from 'next/link'
import Image from "next/image"
import getURL from '~/lib/utils/getURL'


export default function Quiz({ text }: { text: QuizType }) {

  const [answer, setAnswer] = React.useState<boolean>()
  const [tryAgain, setTryAgain] = React.useState<boolean>()

  const locale = useLocale()

  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["quiz"],
    queryFn: () => fetchQuestions(),
  });
  
  const { questionRandomId } = React.useMemo<{ questionRandomId: number }>(
    () => ({
      questionRandomId: data ? 
        Math.floor(Math.random() * data.questions.data.length) 
        : 
        Math.floor(Math.random() * 2)
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, tryAgain]
  );

  if (isLoading || isFetching) return <QuizSkeleton />
  if ((data === undefined) || error) return null

  const question = data.questions.data[questionRandomId]

  function handleAnswer(index: number) {
    question.attributes.AnswerIndex === index ? 
      setAnswer(true) 
      : 
      setAnswer(false)
  }

  function handleWrong() {
    setAnswer(undefined)
    setTryAgain(!tryAgain)
    // void refetch(); // TODO: if fetchQuestions() returns random
  }

  return (
    data ? (
      <div className='hidden md:grid grid-cols-2 gap-6 justify-center'>
        <div className='relative max-w-[800px] w-full 2xl:h-[350px] h-[300px] rounded-md overflow-hidden'>
              <Image
                src={
                  question.attributes.Image.data ? 
                    getURL(question.attributes.Image.data.attributes.url, "strapi") 
                    : 
                    '/images/image-placeholder.png'
                }
                fill
                className={"object-cover"}
                sizes="(max-width: 1280px) 45vw, 35vw"
                alt={question.attributes.Title}
                priority={true}
              />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className='font-OpenSans lg:text-2xl text-lg font-bold uppercase mb-6'>
              {question.attributes.Title}
            </h1>
            <p className='font-Inter lg:text-sm text-xs mb-'>
              {question.attributes.Tip}
            </p>
          </div>

          {
            (answer === undefined) ? (
              <div className='grid grid-cols-2 gap-6'>
                {question.attributes.Variant.map(elem => (
                  <ButtonComponent
                    key={elem.Index}
                    className='uppercase font-Inter px-8 py-6 lg:text-sm text-xs'
                    type="button"
                    onClick={() => handleAnswer(elem.Index)}
                  >
                    {elem.Title}
                  </ButtonComponent>
                ))}
              </div>
            ) : answer ? (
              <div className='flex flex-col gap-6'>
                <h1 className='font-OpenSans uppercase text-xl font-bold text-lime-600 dark:text-lime-800'>
                  {text.right}
                </h1>

                <Link href={`${locale}/objects?${question.attributes.url}`}>
                  <ButtonComponent
                    className='uppercase font-Inter w-fit px-8 py-6 lg:text-sm text-xs'
                  >
                    {question.attributes.urlName}
                  </ButtonComponent>
                </Link>
              </div>
            ) : (
              <div className='flex flex-col gap-6'>
                <h1 className='font-OpenSans uppercase lg:text-xl text-lg font-bold text-red-600 dark:text-red-800'>
                  {text.wrong}
                </h1>
                
                <ButtonComponent
                  className='uppercase font-Inter w-fit px-8 py-6 lg:text-sm text-xs'
                  onClick={() => handleWrong()}
                >
                  {text.tryAgain}
                </ButtonComponent>
              </div>
            )
          }
        </div>   
      </div>
    ) : null
  )
}
