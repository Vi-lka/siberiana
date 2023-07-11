"use client"

import type { QuestionsType } from "@siberiana/schemas";
import request from "graphql-request";
import useSWR from 'swr'

const fetcher = (query: string): Promise<QuestionsType> => request(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, query)

export function useQuestions(locale: string) {
  const { data, error, isLoading } = useSWR<QuestionsType, Error>(
    `query Questions {
      questions(locale: "${locale}") {
        data {
          attributes {
            title
            image {
              data {
                attributes {
                  url
                  alternativeText
                }
              }
            }
            tip
            variants {
              title
              index
            }
            answerIndex
            url
            urlName
          }
        }
      }
    }`, 
    fetcher
  )
 
  return {
    data: data,
    isLoading,
    error: error
  }
}