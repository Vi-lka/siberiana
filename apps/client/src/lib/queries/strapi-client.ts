"use client";

import request from "graphql-request";
import useSWR from "swr";

import type { ProtectedAreaById, Questions } from "@siberiana/schemas";

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

//.........................MAP.........................//

type ProtectedAreaByIdResponse = {
  protectedAreas: {
    edges: [{ node: ProtectedAreaById }];
  };
};

export function useProtectedAreaPoints(id?: string) {
  const { data, error, isLoading } = useSWR<ProtectedAreaByIdResponse, Error>(
    `query ProtectedAreas {
      protectedAreas(where: { id: "${id}" }) {
        edges {
          node {
            id
            displayName
            protectedAreaPictures {
              geometry
              displayName
              description
              id
              primaryImageURL
            }
          }
        }
      }
    }`,
    (query: string): Promise<ProtectedAreaByIdResponse> =>
      request(`${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`, query),
  );

  return {
    data: data,
    isLoading,
    error: error,
  };
}
