"use client";

import request from "graphql-request";
import useSWR from "swr";
import type { Questions } from "@siberiana/schemas";

const fetcher = (query: string): Promise<Questions> =>
  request(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, query);

//.........................QUESTIONS.........................//
export function useQuestions() {
  const { data, error, isLoading } = useSWR<Questions, Error>(
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
