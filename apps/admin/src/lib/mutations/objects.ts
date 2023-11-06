"use client"

import type { ArtifactForTable } from "@siberiana/schemas"
import { useMutation } from "@tanstack/react-query"
import request from "graphql-request"

function getIds(values: { id: string, displayName: string }[]) {
    const ids = values.map(value => value.id)
    return ids
}

//.........................ARTIFACT.........................//
export function useCreateArtifact(access_token?: string) {
    const mutationString = `
        mutation CreateArtifact($input: CreateArtifactInput!) {
            createArtifact(input: $input) {
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
        mutationFn: (value: ArtifactForTable) => 
          request(
            `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
            mutationString,
            {input: {
              status: value.status.id,
              collectionID: value.collection.id,
              displayName: value.displayName,
              description: value.description,
              primaryImageURL: value.primaryImageURL,
              typology: value.typology,
              chemicalComposition: value.chemicalComposition,
              culturalAffiliationID: value.culturalAffiliation?.id,
              setID: value.set?.id,
              monumentID: value.monument?.id,
              locationID: value.location?.id,
              mediumIDs: getIds(value.mediums),
              techniqueIDs: getIds(value.techniques),
              authorIDs: getIds(value.authors),
              publicationIDs: getIds(value.publications),
              projectIDs: getIds(value.projects),
              admissionDate: value.admissionDate,
            }},
            requestHeaders
          ),
      })
    return mutation
}

export function useDeleteArtifact(access_token?: string) {
    const mutationString = `
        mutation DeleteArtifact($deleteArtifactId: ID!) {
            deleteArtifact(id: $deleteArtifactId)
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
            { deleteArtifactId: value },
            requestHeaders
          ),
      })
    return mutation
}