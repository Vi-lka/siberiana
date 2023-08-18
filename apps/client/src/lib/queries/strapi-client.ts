"use client";

import request from "graphql-request";
import useSWR from "swr";

import type { QuestionsType } from "@siberiana/schemas";

const fetcher = (query: string): Promise<QuestionsType> =>
  request(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, query);

export function useQuestions() {
  const { data, error, isLoading } = useSWR<QuestionsType, Error>(
    `query Questions {
      questions {
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
    fetcher,
  );

  return {
    data: data,
    isLoading,
    error: error,
  };
}
