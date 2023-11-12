import request from "graphql-request";
import useSWR from "swr";

import type { ProtectedAreaById } from "@siberiana/schemas";

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
