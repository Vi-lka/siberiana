import type { CultureForTable } from "@siberiana/schemas";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";

//.........................CULTURE.........................//
export function useCreateCulture(access_token?: string) {
    const mutationString = `
        mutation CreateCulture($input: CreateCultureInput!) {
            createCulture(input: $input) {
                id
                displayName
            }
        }
    `
    const requestHeaders = {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
    };
    const mutation = useMutation({
        mutationFn: (value: CultureForTable) => {
          return request(
            `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
            mutationString,
            {input: {
              displayName: value.displayName,
              description: value.description,
              externalLink: value.externalLink,
            }},
            requestHeaders
          )
        }
      })
    return mutation
}

export function useDeleteCulture(access_token?: string) {
    const mutationString = `
        mutation DeleteCulture($deleteCultureId: ID!) {
            deleteCulture(id: $deleteCultureId)
        }
    `
    const requestHeaders = {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
    };
    const mutation = useMutation({
        mutationFn: (value: string) => 
          request(
            `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
            mutationString,
            { deleteCultureId: value },
            requestHeaders
          ),
      })
    return mutation
}

export function useUpdateCulture(access_token?: string) {
    const mutationString = `
        mutation UpdateCulture($updateCultureId: ID!, $input: UpdateCultureInput!) {
            updateCulture(id: $updateCultureId, input: $input) {
                id
                displayName
            }
        }
    `
    const requestHeaders = {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json',
    };
    const mutation = useMutation({
        mutationFn: ({ id, newValue }: { id: string, newValue: CultureForTable }) => {
            return request(
                `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
                mutationString,
                { 
                    updateCultureId: id,
                    input: {
                        displayName: newValue.displayName,
                        description: newValue.description,
                        externalLink: newValue.externalLink,
                    }
                },
                requestHeaders
            )
        }
      })
    return mutation
}