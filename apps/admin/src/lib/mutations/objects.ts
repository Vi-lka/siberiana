"use client"

import type { ArtifactForTable, LocationEnum } from "@siberiana/schemas"
import { useMutation } from "@tanstack/react-query"
import request from "graphql-request"

function getIds(values: { id: string, displayName: string }[]) {
    const ids = values.map(value => value.id)
    return ids
}

function getLocation(
  location: {
    id: string;
    type: LocationEnum;
    displayName: string;
  } | null,
  target: LocationEnum,
) {
  if (!location) return undefined;

  switch (location.type) {
    case "country":
      if (target === "country") return location.id;
      return undefined;

    case "region":
      if (target === "region") return location.id;
      return undefined;

    case "district":
      if (target === "district") return location.id;
      return undefined;

    case "settlement":
      if (target === "settlement") return location.id;
      return undefined;

    case "location":
      if (target === "location") return location.id;
      return undefined;

    default:
      return undefined;
  }
}

function clearLocation(
  location: {
    id: string;
    type: LocationEnum;
    displayName: string;
  } | null,
  target: LocationEnum,
) {
  if (!location) return true;

  switch (location.type) {
    case "country":
      if (target === "country") return undefined;
      return true;

    case "region":
      if (target === "region") return undefined;
      return true;

    case "district":
      if (target === "district") return undefined;
      return true;

    case "settlement":
      if (target === "settlement") return undefined;
      return true;

    case "location":
      if (target === "location") return undefined;
      return true;

    default:
      return undefined;
  }
}

function clearObject(object: {
  id: string;
  displayName: string;
} | null) {
  if (!object || !object.id || (object.id.length === 0)) return true
  else false
}

function clearDate(date: Date | null | undefined) {
  if (!date || date.toISOString().length === 0) return true
  else false
}

function handleArrays(
  newValues: {
    id: string;
    displayName: string;
  }[], 
  oldValues: {
    id: string;
    displayName: string;
  }[]
) {
  const addValues = newValues.map(item => {
      return item.id
  }).filter(id => {
    // includes() doesn't work with object, so we do this:
    const contains = oldValues.some(elem => elem.id === id)
    if (!contains) {
      return id
    }
  })
  const removeValues = oldValues.map(item => {
      return item.id
  }).filter(id => {
    // includes() doesn't work with object, so we do this:
    const contains = newValues.some(elem => elem.id === id)
    if (!contains) {
      return id
    }
  })
  return { addValues, removeValues }
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
              typology: value.typology,
              chemicalComposition: value.chemicalComposition,
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
                        typology: newValue.typology,
                        admissionDate: newValue.admissionDate,
                        chemicalComposition: newValue.chemicalComposition,
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