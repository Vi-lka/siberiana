"use client";

import type { UseMutationResult } from "@tanstack/react-query";

import type { EntityEnum } from "@siberiana/schemas";

import {
  useCreateCulture,
  useCreateEthnos,
  useCreateMaterial,
  useCreateModel,
  useCreateMonument,
  useCreateSet,
  useCreateTechnique,
  useDeleteCulture,
  useDeleteEthnos,
  useDeleteMaterial,
  useDeleteModel,
  useDeleteMonument,
  useDeleteSet,
  useDeleteTechnique,
  useUpdateCulture,
  useUpdateEthnos,
  useUpdateMaterial,
  useUpdateModel,
  useUpdateMonument,
  useUpdateSet,
  useUpdateTechnique,
} from "../mutations/additionalsArtifacts";
import {
  useCreateBookGenre,
  useCreatePeriodical,
  useDeleteBookGenre,
  useDeletePeriodical,
  useUpdateBookGenre,
  useUpdatePeriodical,
} from "../mutations/additionalsBooks";
import {
  useCreateArtifact,
  useCreateBook,
  useDeleteArtifact,
  useDeleteBook,
  useUpdateArtifact,
  useUpdateBook,
} from "../mutations/objects";
import { useCreateCountry, useCreateDistrict, useCreateLocation, useCreateRegion, useCreateSettlement, useDeleteCountry, useDeleteDistrict, useDeleteLocation, useDeleteRegion, useDeleteSettlement, useUpdateCountry, useUpdateDistrict, useUpdateLocation, useUpdateRegion, useUpdateSettlement } from "../mutations/additionalsGlobal";

const progressFiles = 100;
const isLoadingFiles = false;

//.........................CREATE.........................//
export function useCreateMutation(
  entity: EntityEnum,
  access_token?: string,
):
  | {
      mutation: UseMutationResult<unknown, Error, any, unknown>;
      progressFiles: number;
      isLoadingFiles: boolean;
    }
  | undefined {
  const artifactCreate = useCreateArtifact(access_token);
  const cultureCreate = useCreateCulture(access_token);
  const ethnosCreate = useCreateEthnos(access_token);
  const materialCreate = useCreateMaterial(access_token);
  const techniqueCreate = useCreateTechnique(access_token);
  const setCreate = useCreateSet(access_token);
  const monumentCreate = useCreateMonument(access_token);
  const modelCreate = useCreateModel(access_token);
  const bookCreate = useCreateBook(access_token);
  const bookGenreCreate = useCreateBookGenre(access_token);
  const periodicalCreate = useCreatePeriodical(access_token);
  const locationCreate = useCreateLocation(access_token);
  const countryCreate = useCreateCountry(access_token);
  const regionCreate = useCreateRegion(access_token);
  const districtCreate = useCreateDistrict(access_token);
  const settlementCreate = useCreateSettlement(access_token);

  switch (entity) {
    case "artifacts":
      return artifactCreate;
    case "books":
      return bookCreate;
    case "models":
      return modelCreate;
    case "cultures":
      return { mutation: cultureCreate, progressFiles, isLoadingFiles };
    case "ethnosSlice":
      return { mutation: ethnosCreate, progressFiles, isLoadingFiles };
    case "materials":
      return { mutation: materialCreate, progressFiles, isLoadingFiles };
    case "techniques":
      return { mutation: techniqueCreate, progressFiles, isLoadingFiles };
    case "sets":
      return { mutation: setCreate, progressFiles, isLoadingFiles };
    case "monuments":
      return { mutation: monumentCreate, progressFiles, isLoadingFiles };
    case "bookGenres":
      return { mutation: bookGenreCreate, progressFiles, isLoadingFiles };
    case "periodicals":
      return { mutation: periodicalCreate, progressFiles, isLoadingFiles };
    case "locations":
      return { mutation: locationCreate, progressFiles, isLoadingFiles };
    case "countries":
      return { mutation: countryCreate, progressFiles, isLoadingFiles };
    case "regions":
      return { mutation: regionCreate, progressFiles, isLoadingFiles };
    case "districts":
      return { mutation: districtCreate, progressFiles, isLoadingFiles };
    case "settlements":
      return { mutation: settlementCreate, progressFiles, isLoadingFiles };

    default:
      const exhaustiveCheck: never = entity;
      throw new Error(`Unhandled case: ${exhaustiveCheck}`);
  }
}

//.........................DELETE.........................//
export function useDeleteMutation(entity: EntityEnum, access_token?: string) {
  const artifactDelete = useDeleteArtifact(access_token);
  const cultureDelete = useDeleteCulture(access_token);
  const ethnosDelete = useDeleteEthnos(access_token)
  const materialDelete = useDeleteMaterial(access_token);
  const techniqueDelete = useDeleteTechnique(access_token);
  const setDelete = useDeleteSet(access_token);
  const monumentDelete = useDeleteMonument(access_token);
  const modelDelete = useDeleteModel(access_token);
  const bookDelete = useDeleteBook(access_token);
  const bookGenreDelete = useDeleteBookGenre(access_token);
  const periodicalDelete = useDeletePeriodical(access_token);
  const locationDelete = useDeleteLocation(access_token);
  const countryDelete = useDeleteCountry(access_token);
  const regionDelete = useDeleteRegion(access_token);
  const districtDelete = useDeleteDistrict(access_token);
  const settlementDelete = useDeleteSettlement(access_token);

  switch (entity) {
    case "artifacts":
      return artifactDelete;
    case "books":
      return bookDelete;
    case "models":
      return modelDelete;
    case "cultures":
      return cultureDelete;
    case "ethnosSlice":
      return ethnosDelete;
    case "materials":
      return materialDelete;
    case "techniques":
      return techniqueDelete;
    case "sets":
      return setDelete;
    case "monuments":
      return monumentDelete;
    case "bookGenres":
      return bookGenreDelete;
    case "periodicals":
      return periodicalDelete;
    case "locations":
      return locationDelete;
    case "countries":
      return countryDelete;
    case "regions":
      return regionDelete;
    case "districts":
      return districtDelete;
    case "settlements":
      return settlementDelete;

    default:
      const exhaustiveCheck: never = entity;
      throw new Error(`Unhandled case: ${exhaustiveCheck}`);
  }
}

//.........................UPDATE.........................//
export function useUpdateMutation(
  entity: EntityEnum,
  access_token?: string,
):
  | {
      updateMutation: UseMutationResult<unknown, Error, any, unknown>;
      progressFiles: number;
      isLoadingFiles: boolean;
    }
  | undefined {
  const artifactUpdate = useUpdateArtifact(access_token);
  const cultureUpdate = useUpdateCulture(access_token);
  const ethnosUpdate = useUpdateEthnos(access_token);
  const materialUpdate = useUpdateMaterial(access_token);
  const techniqueUpdate = useUpdateTechnique(access_token);
  const setUpdate = useUpdateSet(access_token);
  const monumentUpdate = useUpdateMonument(access_token);
  const modelUpdate = useUpdateModel(access_token);
  const bookUpdate = useUpdateBook(access_token);
  const bookGenreUpdate = useUpdateBookGenre(access_token);
  const periodicalUpdate = useUpdatePeriodical(access_token);
  const locationUpdate = useUpdateLocation(access_token);
  const countryUpdate = useUpdateCountry(access_token);
  const regionUpdate = useUpdateRegion(access_token);
  const districtUpdate = useUpdateDistrict(access_token);
  const settlementUpdate = useUpdateSettlement(access_token);


  switch (entity) {
    case "artifacts":
      return artifactUpdate;
    case "books":
      return bookUpdate;
    case "models":
      return modelUpdate;
    case "cultures":
      return { updateMutation: cultureUpdate, progressFiles, isLoadingFiles };
    case "ethnosSlice":
      return { updateMutation: ethnosUpdate, progressFiles, isLoadingFiles };
    case "materials":
      return { updateMutation: materialUpdate, progressFiles, isLoadingFiles };
    case "techniques":
      return { updateMutation: techniqueUpdate, progressFiles, isLoadingFiles };
    case "sets":
      return { updateMutation: setUpdate, progressFiles, isLoadingFiles };
    case "monuments":
      return { updateMutation: monumentUpdate, progressFiles, isLoadingFiles };
    case "bookGenres":
      return { updateMutation: bookGenreUpdate, progressFiles, isLoadingFiles };
    case "periodicals":
      return { updateMutation: periodicalUpdate, progressFiles, isLoadingFiles };
    case "locations":
      return { updateMutation: locationUpdate, progressFiles, isLoadingFiles };
    case "countries":
      return { updateMutation: countryUpdate, progressFiles, isLoadingFiles };
    case "regions":
      return { updateMutation: regionUpdate, progressFiles, isLoadingFiles };
    case "districts":
      return { updateMutation: districtUpdate, progressFiles, isLoadingFiles };
    case "settlements":
      return { updateMutation: settlementUpdate, progressFiles, isLoadingFiles };

    default:
      const exhaustiveCheck: never = entity;
      throw new Error(`Unhandled case: ${exhaustiveCheck}`);
  }
}
