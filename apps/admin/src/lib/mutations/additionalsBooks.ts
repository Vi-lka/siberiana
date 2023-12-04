import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";

import type { BookGenreForTable, PeriodicalForTable } from "@siberiana/schemas";

//.........................BOOK GENRES.........................//
export function useCreateBookGenre(access_token?: string) {
  const mutationString = `
          mutation CreateBookGenre($input: CreateBookGenreInput!) {
              createBookGenre(input: $input) {
                  id
                  displayName
              }
          }
      `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const mutation = useMutation({
    mutationFn: (value: BookGenreForTable) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          input: {
            displayName: value.displayName,
            description: value.description,
            externalLink: value.externalLink,
          },
        },
        requestHeaders,
      );
    },
  });
  return mutation;
}

export function useDeleteBookGenre(access_token?: string) {
  const mutationString = `
          mutation DeleteBookGenre($deleteBookGenreId: ID!) {
              deleteBookGenre(id: $deleteBookGenreId)
          }
      `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const mutation = useMutation({
    mutationFn: (value: string) =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        { deleteBookGenreId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateBookGenre(access_token?: string) {
  const mutationString = `
          mutation UpdateBookGenre($updateBookGenreId: ID!, $input: UpdateBookGenreInput!) {
              updateBookGenre(id: $updateBookGenreId, input: $input) {
                  id
                  displayName
              }
          }
      `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const mutation = useMutation({
    mutationFn: ({
      id,
      newValue,
    }: {
      id: string;
      newValue: BookGenreForTable;
    }) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updateBookGenreId: id,
          input: {
            displayName: newValue.displayName,
            description: newValue.description,
            externalLink: newValue.externalLink,
          },
        },
        requestHeaders,
      );
    },
  });
  return mutation;
}

//.........................PERIODICALS.........................//
export function useCreatePeriodical(access_token?: string) {
  const mutationString = `
          mutation CreatePeriodical($input: CreatePeriodicalInput!) {
              createPeriodical(input: $input) {
                  id
                  displayName
              }
          }
      `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const mutation = useMutation({
    mutationFn: (value: PeriodicalForTable) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          input: {
            displayName: value.displayName,
            description: value.description,
            externalLink: value.externalLink,
          },
        },
        requestHeaders,
      );
    },
  });
  return mutation;
}

export function useDeletePeriodical(access_token?: string) {
  const mutationString = `
          mutation DeletePeriodical($deletePeriodicalId: ID!) {
              deletePeriodical(id: $deletePeriodicalId)
          }
      `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const mutation = useMutation({
    mutationFn: (value: string) =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        { deletePeriodicalId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdatePeriodical(access_token?: string) {
  const mutationString = `
          mutation UpdatePeriodical($updatePeriodicalId: ID!, $input: UpdatePeriodicalInput!) {
              updatePeriodical(id: $updatePeriodicalId, input: $input) {
                  id
                  displayName
              }
          }
      `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };
  const mutation = useMutation({
    mutationFn: ({
      id,
      newValue,
    }: {
      id: string;
      newValue: PeriodicalForTable;
    }) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updatePeriodicalId: id,
          input: {
            displayName: newValue.displayName,
            description: newValue.description,
            externalLink: newValue.externalLink,
          },
        },
        requestHeaders,
      );
    },
  });
  return mutation;
}
