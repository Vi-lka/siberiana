import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";

import type {
  CultureForTable,
  MaterialForTable,
  TechniqueForTable,
} from "@siberiana/schemas";

//.........................CULTURE.........................//
export function useCreateCulture(access_token?: string) {
  const mutationString = `
        mutation CreateCulture($input: CreateCultureInput!) {
            createCulture(input: $input) {
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
    mutationFn: (value: CultureForTable) => {
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

export function useDeleteCulture(access_token?: string) {
  const mutationString = `
        mutation DeleteCulture($deleteCultureId: ID!) {
            deleteCulture(id: $deleteCultureId)
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
        { deleteCultureId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateCulture(access_token?: string) {
  const mutationString = `
        mutation UpdateCulture($updateCultureId: ID!, $input: UpdateCultureInput!) {
            updateCulture(id: $updateCultureId, input: $input) {
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
      newValue: CultureForTable;
    }) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updateCultureId: id,
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

//.........................MATERIAL.........................//
export function useCreateMaterial(access_token?: string) {
  const mutationString = `
        mutation CreateMedium($input: CreateMediumInput!) {
            createMedium(input: $input) {
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
    mutationFn: (value: MaterialForTable) => {
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

export function useDeleteMaterial(access_token?: string) {
  const mutationString = `
        mutation DeleteMedium($deleteMediumId: ID!) {
            deleteMedium(id: $deleteMediumId)
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
        { deleteMediumId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateMaterial(access_token?: string) {
  const mutationString = `
        mutation UpdateMedium($updateMediumId: ID!, $input: UpdateMediumInput!) {
            updateMedium(id: $updateMediumId, input: $input) {
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
      newValue: MaterialForTable;
    }) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updateMediumId: id,
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

//.........................TECHNIQUE.........................//
export function useCreateTechnique(access_token?: string) {
  const mutationString = `
        mutation CreateTechnique($input: CreateTechniqueInput!) {
            createTechnique(input: $input) {
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
    mutationFn: (value: TechniqueForTable) => {
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

export function useDeleteTechnique(access_token?: string) {
  const mutationString = `
        mutation DeleteTechnique($deleteTechniqueId: ID!) {
            deleteTechnique(id: $deleteTechniqueId)
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
        { deleteTechniqueId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateTechnique(access_token?: string) {
  const mutationString = `
        mutation UpdateTechnique($updateTechniqueId: ID!, $input: UpdateTechniqueInput!) {
            updateTechnique(id: $updateTechniqueId, input: $input) {
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
      newValue: TechniqueForTable;
    }) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updateTechniqueId: id,
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
