"use client"

import type { ArtifactForTable } from "@siberiana/schemas"
import { useMutation } from "@tanstack/react-query"
import request from "graphql-request"
import { clearDate, clearLocation, clearObject, getIds, getLocation, handleArrays } from "../utils/mutations-utils"
import { getLable } from "../utils/sizes-utils"

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
        mutationFn: (value: ArtifactForTable) => {
          return request(
            `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
            mutationString,
            {input: {
              status: value.status.id,
              collectionID: value.collection.id,
              displayName: value.displayName,
              description: value.description,
              primaryImageURL: value.primaryImageURL,
              weight: value.weight,
              width: value.sizes.width,
              height: value.sizes.height,
              length: value.sizes.length,
              depth: value.sizes.depth,
              diameter: value.sizes.diameter,
              dimensions: getLable(value.sizes),
              dating: value.dating,
              datingStart: value.datingRow.datingStart,
              datingEnd: value.datingRow.datingEnd,
              typology: value.typology,
              chemicalComposition: value.chemicalComposition,
              inventoryNumber: value.inventoryNumber,
              kpNumber: value.kpNumber,
              goskatalogNumber: value.goskatalogNumber,
              externalLink: value.externalLink,
              culturalAffiliationID: value.culturalAffiliation?.id,
              setID: value.set?.id,
              monumentID: value.monument?.id,
              countryID: getLocation(value.location, "country"),
              regionID: getLocation(value.location, "region"),
              districtID: getLocation(value.location, "district"),
              settlementID: getLocation(value.location, "settlement"),
              locationID: getLocation(value.location, "location"),
              mediumIDs: getIds(value.mediums),
              techniqueIDs: getIds(value.techniques),
              authorIDs: getIds(value.authors),
              publicationIDs: getIds(value.publications),
              projectIDs: getIds(value.projects),
              admissionDate: value.admissionDate,
            }},
            requestHeaders
          )
        }
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

export function useUpdateArtifact(access_token?: string) {
    const mutationString = `
        mutation UpdateArtifact($updateArtifactId: ID!, $input: UpdateArtifactInput!) {
            updateArtifact(id: $updateArtifactId, input: $input) {
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
        mutationFn: ({ id, newValue, oldValue }: { id: string, newValue: ArtifactForTable, oldValue: ArtifactForTable }) => {
            const authorsIds = handleArrays(newValue.authors, oldValue.authors)
            const mediumIDs = handleArrays(newValue.mediums, oldValue.mediums)
            const projectIDs = handleArrays(newValue.projects, oldValue.projects)
            const publicationIDs = handleArrays(newValue.publications, oldValue.publications)
            const techniqueIDs = handleArrays(newValue.techniques, oldValue.techniques)
            return request(
                `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
                mutationString,
                { 
                    updateArtifactId: id,
                    input: {
                        status: newValue.status.id,
                        displayName: newValue.displayName,
                        primaryImageURL: newValue.primaryImageURL,
                        description: newValue.description,
                        weight: newValue.weight,
                        width: newValue.sizes.width,
                        height: newValue.sizes.height,
                        length: newValue.sizes.length,
                        depth: newValue.sizes.depth,
                        diameter: newValue.sizes.diameter,
                        dimensions: getLable(newValue.sizes),
                        dating: newValue.dating,
                        datingStart: newValue.datingRow.datingStart,
                        datingEnd: newValue.datingRow.datingEnd,
                        typology: newValue.typology,
                        admissionDate: newValue.admissionDate,
                        chemicalComposition: newValue.chemicalComposition,
                        inventoryNumber: newValue.inventoryNumber,
                        kpNumber: newValue.kpNumber,
                        goskatalogNumber: newValue.goskatalogNumber,
                        externalLink: newValue.externalLink,
                        setID: newValue.set?.id,
                        monumentID: newValue.monument?.id,
                        culturalAffiliationID: newValue.culturalAffiliation?.id,
                        countryID: getLocation(newValue.location, "country"),
                        regionID: getLocation(newValue.location, "region"),
                        districtID: getLocation(newValue.location, "district"),
                        settlementID: getLocation(newValue.location, "settlement"),
                        locationID: getLocation(newValue.location, "location"),
                        addAuthorIDs: authorsIds.addValues,
                        addMediumIDs: mediumIDs.addValues,
                        addProjectIDs: projectIDs.addValues,
                        addPublicationIDs: publicationIDs.addValues,
                        addTechniqueIDs: techniqueIDs.addValues,
                        clearAdmissionDate: clearDate(newValue.admissionDate),
                        clearSet: clearObject(newValue.set),
                        clearMonument: clearObject(newValue.monument),
                        clearCulturalAffiliation: clearObject(newValue.culturalAffiliation),
                        clearCountry: clearLocation(newValue.location, "country"),
                        clearRegion: clearLocation(newValue.location, "region"),
                        clearDistrict: clearLocation(newValue.location, "district"),
                        clearSettlement: clearLocation(newValue.location, "settlement"),
                        clearLocation: clearLocation(newValue.location, "location"),
                        removeAuthorIDs: authorsIds.removeValues,
                        removeMediumIDs: mediumIDs.removeValues,
                        removeProjectIDs: projectIDs.removeValues,
                        removeTechniqueIDs: techniqueIDs.removeValues,
                        removePublicationIDs: publicationIDs.removeValues
                    }
                },
                requestHeaders
            )
        }
      })
    return mutation
}