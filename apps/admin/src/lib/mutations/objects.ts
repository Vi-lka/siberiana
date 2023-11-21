"use client";

import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";

import type { ArtifactForTable, BookForTable } from "@siberiana/schemas";

import { usePutObjects } from "../auth/siberiana";
import {
  clearDate,
  clearLocation,
  clearObject,
  getIds,
  getLocation,
  handleArrays,
  handleFiles,
} from "../utils/mutations-utils";
import { getLable } from "../utils/sizes-utils";

//.........................ARTIFACT.........................//
export function useCreateArtifact(access_token?: string) {
  const mutationString = `
        mutation CreateArtifact($input: CreateArtifactInput!) {
            createArtifact(input: $input) {
                id
                displayName
            }
        }
    `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const { upload, progress, isLoading } = usePutObjects()

  const mutation = useMutation({
    mutationFn: async (value: ArtifactForTable) => {
      const resUpload = value.primaryImage.file
        ? await upload({
            bucket: "artifacts",
            files: [value.primaryImage.file],
          })
            .then((res) => res.data)
            .catch((err) => {
              console.error(err);
              return null;
            })
        : null;

      const date = new Date(value.admissionDate as string);
      const isoDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          input: {
            status: value.status.id,
            collectionID: value.collection.id,
            displayName: value.displayName,
            description: value.description,
            primaryImageURL: resUpload !== null ? resUpload.urls[0] : "",
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
            donorID: value.donor?.id,
            modelID: value.model?.id,
            licenseID: value.license?.id,
            culturalAffiliationID: value.culturalAffiliation?.id,
            setID: value.set?.id,
            monumentID: value.monument?.id,
            organizationID: value.organization?.id,
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
            admissionDate: isoDate,
          },
        },
        requestHeaders,
      );
    },
  });
  return { mutation, progressFiles: progress, isLoadingFiles: isLoading };
}

export function useDeleteArtifact(access_token?: string) {
  const mutationString = `
        mutation DeleteArtifact($deleteArtifactId: ID!) {
            deleteArtifact(id: $deleteArtifactId)
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
        { deleteArtifactId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateArtifact(access_token?: string) {
  const mutationString = `
        mutation UpdateArtifact($updateArtifactId: ID!, $input: UpdateArtifactInput!) {
            updateArtifact(id: $updateArtifactId, input: $input) {
                id
                displayName
            }
        }
    `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const { upload, progress, isLoading } = usePutObjects()

  const mutation = useMutation({
    mutationFn: async ({
      id,
      newValue,
      oldValue,
    }: {
      id: string;
      newValue: ArtifactForTable;
      oldValue: ArtifactForTable;
    }) => {
      const authorsIds = handleArrays(newValue.authors, oldValue.authors);
      const mediumIDs = handleArrays(newValue.mediums, oldValue.mediums);
      const projectIDs = handleArrays(newValue.projects, oldValue.projects);
      const publicationIDs = handleArrays(
        newValue.publications,
        oldValue.publications,
      );
      const techniqueIDs = handleArrays(
        newValue.techniques,
        oldValue.techniques,
      );

      const resUpload =
        newValue.primaryImage.url !== oldValue.primaryImage.url &&
        newValue.primaryImage.file
          ? await upload({
              bucket: "artifacts",
              files: [newValue.primaryImage.file],
            })
              .then((res) => res.data)
              .catch((err) => {
                console.error(err);
                return null;
              })
          : null;

      const date = new Date(newValue.admissionDate as string);
      const isoDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        mutationString,
        {
          updateArtifactId: id,
          input: {
            status: newValue.status.id,
            displayName: newValue.displayName,
            primaryImageURL:
              resUpload !== null
                ? resUpload.urls[0]
                : newValue.primaryImage.url.length === 0
                ? newValue.primaryImage.url
                : oldValue.primaryImage.url,
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
            admissionDate: !!newValue.admissionDate ? isoDate : newValue.admissionDate,
            chemicalComposition: newValue.chemicalComposition,
            inventoryNumber: newValue.inventoryNumber,
            kpNumber: newValue.kpNumber,
            goskatalogNumber: newValue.goskatalogNumber,
            externalLink: newValue.externalLink,
            donorID: newValue.donor?.id,
            modelID: newValue.model?.id,
            licenseID: newValue.license?.id,
            setID: newValue.set?.id,
            monumentID: newValue.monument?.id,
            culturalAffiliationID: newValue.culturalAffiliation?.id,
            organizationID: newValue.organization?.id,
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
            clearDonor: clearObject(newValue.donor),
            clearModel: clearObject(newValue.model),
            clearLicense: clearObject(newValue.license),
            clearSet: clearObject(newValue.set),
            clearMonument: clearObject(newValue.monument),
            clearCulturalAffiliation: clearObject(newValue.culturalAffiliation),
            clearOrganization: clearObject(newValue.organization),
            clearCountry: clearLocation(newValue.location, "country"),
            clearRegion: clearLocation(newValue.location, "region"),
            clearDistrict: clearLocation(newValue.location, "district"),
            clearSettlement: clearLocation(newValue.location, "settlement"),
            clearLocation: clearLocation(newValue.location, "location"),
            removeAuthorIDs: authorsIds.removeValues,
            removeMediumIDs: mediumIDs.removeValues,
            removeProjectIDs: projectIDs.removeValues,
            removeTechniqueIDs: techniqueIDs.removeValues,
            removePublicationIDs: publicationIDs.removeValues,
          },
        },
        requestHeaders,
      );
    },
  });
  return { updateMutation: mutation, progressFiles: progress, isLoadingFiles: isLoading };
}

//.........................BOOKS.........................//
export function useCreateBook(access_token?: string) {
  const mutationString = `
        mutation CreateBook($input: CreateBookInput!) {
            createBook(input: $input) {
                id
                displayName
            }
        }
    `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const { upload, progress, isLoading } = usePutObjects()

  const mutation = useMutation({
    mutationFn: async (value: BookForTable) => {
      const primaryImageUpload = value.primaryImage.file
        ? await upload({
            bucket: "books",
            files: [value.primaryImage.file],
          })
            .then((res) => res.data)
            .catch((err) => {
              console.error(err);
              return null;
            })
        : null;

      const additionalImagesFiles =  value.additionalImages?.map(image => image.file).filter((item): item is File => !!item)
      const additionalImagesUpload = additionalImagesFiles && additionalImagesFiles.length > 0
        ? await upload({
            bucket: "books",
            files: additionalImagesFiles,
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
            collectionID: value.collection.id,
            displayName: value.displayName,
            description: value.description,
            primaryImageURL: primaryImageUpload?.urls[0],
            additionalImagesUrls: additionalImagesUpload?.urls,
            externalLink: value.externalLink,
            year: Number(Number(value.year).toFixed()),
            bookGenreIDs: getIds(value.bookGenres),
            authorIDs: getIds(value.authors),
            periodicalID: value.periodical?.id,
            publisherID: value.publisher?.id,
            licenseID: value.license?.id,
            libraryID: value.library?.id,
            countryID: getLocation(value.location, "country"),
            regionID: getLocation(value.location, "region"),
            districtID: getLocation(value.location, "district"),
            settlementID: getLocation(value.location, "settlement"),
            locationID: getLocation(value.location, "location"),
          },
        },
        requestHeaders,
      );
    },
  });
  return { mutation, progressFiles: progress, isLoadingFiles: isLoading };
}

export function useDeleteBook(access_token?: string) {
  const mutationString = `
        mutation DeleteBook($deleteBookId: ID!) {
            deleteBook(id: $deleteBookId)
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
        { deleteBookId: value },
        requestHeaders,
      ),
  });
  return mutation;
}

export function useUpdateBook(access_token?: string) {
  const mutationString = `
        mutation UpdateBook($updateBookId: ID!, $input: UpdateBookInput!) {
            updateBook(id: $updateBookId, input: $input) {
                id
                displayName
            }
        }
    `;
  const requestHeaders = {
    Authorization: `Bearer ${access_token}`,
    "Content-Type": "application/json",
  };

  const { upload, progress, isLoading } = usePutObjects()

  const mutation = useMutation({
    mutationFn: async ({
      id,
      newValue,
      oldValue,
    }: {
      id: string;
      newValue: BookForTable;
      oldValue: BookForTable;
    }) => {
      const bookGenreIDs = handleArrays(newValue.bookGenres, oldValue.bookGenres)
      const authorsIds = handleArrays(newValue.authors, oldValue.authors);

      const resUpload =
        newValue.primaryImage.url !== oldValue.primaryImage.url &&
        newValue.primaryImage.file
          ? await upload({
              bucket: "books",
              files: [newValue.primaryImage.file],
            })
              .then((res) => res.data)
              .catch((err) => {
                console.error(err);
                return null;
              })
          : null;

      const additionalImagesFiles =  newValue.additionalImages?.map(image => image.file).filter((item): item is File => !!item)
      const additionalImagesUpload = additionalImagesFiles && additionalImagesFiles.length > 0
        ? await upload({
            bucket: "books",
            files: additionalImagesFiles,
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
          updateBookId: id,
          input: {
            status: newValue.status.id,
            displayName: newValue.displayName,
            primaryImageURL:
              resUpload !== null
                ? resUpload.urls[0]
                : newValue.primaryImage.url.length === 0
                ? newValue.primaryImage.url
                : oldValue.primaryImage.url,
            additionalImagesUrls: handleFiles(newValue.additionalImages, oldValue.additionalImages, additionalImagesUpload?.urls),
            description: newValue.description,
            externalLink: newValue.externalLink,
            year: Number(Number(newValue.year).toFixed()),
            libraryID: newValue.library?.id,
            periodicalID: newValue.periodical?.id,
            publisherID: newValue.publisher?.id,
            licenseID: newValue.license?.id,
            countryID: getLocation(newValue.location, "country"),
            regionID: getLocation(newValue.location, "region"),
            districtID: getLocation(newValue.location, "district"),
            settlementID: getLocation(newValue.location, "settlement"),
            locationID: getLocation(newValue.location, "location"),
            addAuthorIDs: authorsIds.addValues,
            addBookGenreIDs: bookGenreIDs.addValues,
            clearLibrary: clearObject(newValue.library),
            clearPeriodical: clearObject(newValue.periodical),
            clearPublisher: clearObject(newValue.publisher),
            clearLicense: clearObject(newValue.license),
            clearCountry: clearLocation(newValue.location, "country"),
            clearRegion: clearLocation(newValue.location, "region"),
            clearDistrict: clearLocation(newValue.location, "district"),
            clearSettlement: clearLocation(newValue.location, "settlement"),
            clearLocation: clearLocation(newValue.location, "location"),
            removeAuthorIDs: authorsIds.removeValues,
            removeBookGenreIDs: bookGenreIDs.removeValues,
          },
        },
        requestHeaders,
      );
    },
  });
  return { updateMutation: mutation, progressFiles: progress, isLoadingFiles: isLoading };
}
