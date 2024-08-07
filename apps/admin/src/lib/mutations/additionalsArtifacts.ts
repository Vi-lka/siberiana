import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";

import type {
  CultureForTable,
  EthnosForTable,
  MaterialForTable,
  ModelForTable,
  MonumentForTable,
  SetForTable,
  TechniqueForTable,
} from "@siberiana/schemas";

import { usePutObjects } from "../auth/siberiana";
import { getIds, handleArrays } from "../utils/mutations-utils";

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

//.........................ETHNOS.........................//
export function useCreateEthnos(access_token?: string) {
  const mutationString = `
        mutation CreateEthnos($input: CreateEthnosInput!) {
            createEthnos(input: $input) {
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
    mutationFn: (value: EthnosForTable) => {
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

export function useDeleteEthnos(access_token?: string) {
  const mutationString = `
        mutation DeleteEthnos($deleteEthnosId: ID!) {
            deleteEthnos(id: $deleteEthnosId)
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
        { deleteEthnosId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateEthnos(access_token?: string) {
  const mutationString = `
        mutation UpdateEthnos($updateEthnosId: ID!, $input: UpdateEthnosInput!) {
            updateEthnos(id: $updateEthnosId, input: $input) {
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
      newValue: EthnosForTable;
    }) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updateEthnosId: id,
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

//.........................SET.........................//
export function useCreateSet(access_token?: string) {
  const mutationString = `
        mutation CreateSet($input: CreateSetInput!) {
            createSet(input: $input) {
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
    mutationFn: (value: SetForTable) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          input: {
            displayName: value.displayName,
            description: value.description,
            externalLink: value.externalLink,
            monumentIDs: getIds(value.monuments),
          },
        },
        requestHeaders,
      );
    },
  });
  return mutation;
}

export function useDeleteSet(access_token?: string) {
  const mutationString = `
        mutation DeleteSet($deleteSetId: ID!) {
            deleteSet(id: $deleteSetId)
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
        { deleteSetId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateSet(access_token?: string) {
  const mutationString = `
        mutation UpdateSet($updateSetId: ID!, $input: UpdateSetInput!) {
            updateSet(id: $updateSetId, input: $input) {
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
      oldValue,
    }: {
      id: string;
      newValue: SetForTable;
      oldValue: SetForTable;
    }) => {
      const monumentIDs = handleArrays(newValue.monuments, oldValue.monuments);
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updateSetId: id,
          input: {
            displayName: newValue.displayName,
            description: newValue.description,
            externalLink: newValue.externalLink,
            addMonumentIDs: monumentIDs.addValues,
            removeMonumentIDs: monumentIDs.removeValues,
          },
        },
        requestHeaders,
      );
    },
  });
  return mutation;
}

//.........................MONUMENT.........................//
export function useCreateMonument(access_token?: string) {
  const mutationString = `
        mutation CreateMonument($input: CreateMonumentInput!) {
            createMonument(input: $input) {
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
    mutationFn: (value: MonumentForTable) => {
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          input: {
            displayName: value.displayName,
            description: value.description,
            externalLink: value.externalLink,
            setIDs: getIds(value.sets),
          },
        },
        requestHeaders,
      );
    },
  });
  return mutation;
}

export function useDeleteMonument(access_token?: string) {
  const mutationString = `
        mutation DeleteMonument($deleteMonumentId: ID!) {
            deleteMonument(id: $deleteMonumentId)
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
        { deleteMonumentId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateMonument(access_token?: string) {
  const mutationString = `
        mutation UpdateMonument($updateMonumentId: ID!, $input: UpdateMonumentInput!) {
            updateMonument(id: $updateMonumentId, input: $input) {
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
      oldValue,
    }: {
      id: string;
      newValue: MonumentForTable;
      oldValue: MonumentForTable;
    }) => {
      const setIDs = handleArrays(newValue.sets, oldValue.sets);
      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updateMonumentId: id,
          input: {
            displayName: newValue.displayName,
            description: newValue.description,
            externalLink: newValue.externalLink,
            addSetIDs: setIDs.addValues,
            removeSetIDs: setIDs.removeValues,
          },
        },
        requestHeaders,
      );
    },
  });
  return mutation;
}

//.........................MODEL.........................//
export function useCreateModel(access_token?: string) {
  const mutationString = `
        mutation CreateModel($input: CreateModelInput!) {
            createModel(input: $input) {
                id
                displayName
            }
        }
    `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const { upload, progress, isLoading } = usePutObjects();

  const mutation = useMutation({
    mutationFn: async (value: ModelForTable) => {
      const resUpload = value.file.file
        ? await upload({
            bucket: "models",
            files: [value.file.file],
          })
            .then((res) => res.data)
            .catch((err) => {
              console.error(err);
              return null;
            })
        : null;

      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          input: {
            status: value.status.id,
            displayName: value.displayName,
            description: value.description,
            externalLink: value.externalLink,
            fileURL: resUpload !== null ? resUpload.urls[0] : "",
          },
        },
        requestHeaders,
      );
    },
  });
  return { mutation, progressFiles: progress, isLoadingFiles: isLoading };
}

export function useDeleteModel(access_token?: string) {
  const mutationString = `
        mutation DeleteModel($deleteModelId: ID!) {
            deleteModel(id: $deleteModelId)
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
        { deleteModelId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateModel(access_token?: string) {
  const mutationString = `
        mutation UpdateModel($updateModelId: ID!, $input: UpdateModelInput!) {
            updateModel(id: $updateModelId, input: $input) {
                id
                displayName
            }
        }
    `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const { upload, progress, isLoading } = usePutObjects();

  const mutation = useMutation({
    mutationFn: async ({
      id,
      newValue,
      oldValue,
    }: {
      id: string;
      newValue: ModelForTable;
      oldValue: ModelForTable;
    }) => {
      const resUpload =
        newValue.file.url !== oldValue.file.url && newValue.file.file
          ? await upload({
              bucket: "models",
              files: [newValue.file.file],
            })
              .then((res) => res.data)
              .catch((err) => {
                console.error(err);
                return null;
              })
          : null;

      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updateModelId: id,
          input: {
            status: newValue.status.id,
            displayName: newValue.displayName,
            fileURL:
              resUpload !== null
                ? resUpload.urls[0]
                : newValue.file.url.length === 0
                  ? newValue.file.url
                  : oldValue.file.url,
            description: newValue.description,
            externalLink: newValue.externalLink,
          },
        },
        requestHeaders,
      );
    },
  });
  return {
    updateMutation: mutation,
    progressFiles: progress,
    isLoadingFiles: isLoading,
  };
}
