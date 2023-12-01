import React from "react";
import type { Row } from "@tanstack/react-table";
import { useSession } from "next-auth/react";

import type { ArtifactForTable } from "@siberiana/schemas";

import Culture from "~/components/tables/artifacts/Culture";
import Materials from "~/components/tables/artifacts/Materials";
import Monument from "~/components/tables/artifacts/Monument";
import Set from "~/components/tables/artifacts/Set";
import Techniques from "~/components/tables/artifacts/Techniques";
import Locations from "~/components/tables/global-fields/Locations";
import Persons from "~/components/tables/global-fields/Persons";
import Projects from "~/components/tables/global-fields/Projects";
import Publications from "~/components/tables/global-fields/Publications";
import SizesSelect from "~/components/tables/global-fields/SizesSelect";
import DateSelect from "~/components/tables/inputs/DateSelect";
import DatingSelect from "~/components/tables/inputs/dating/DatingSelect";
import InputDropzone from "~/components/tables/inputs/dropzone/InputDropzone";
import InputMultiDropzone from "~/components/tables/inputs/dropzone/InputMultiDropzone";
import FormInput from "~/components/tables/inputs/FormInput";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import Model from "../tables/artifacts/Model";
import License from "../tables/global-fields/License";
import Organization from "../tables/global-fields/Organization";
import PersonSingle from "../tables/global-fields/PersonSingle";
import Status from "../tables/global-fields/Status";

export default function Artifacts({ row }: { row: Row<ArtifactForTable> }) {
  const session = useSession();
  const isModerator = session.data?.user.roles?.includes("moderator");
  return (
    <div className="flex w-full flex-col gap-6 pt-3">
      <div className="flex w-full flex-wrap items-center gap-6">
        <p className="min-w-full break-words text-sm font-light sm:min-w-[20rem]">
          ID: {row.original.id}
        </p>
        {isModerator ? (
          <div className="min-w-full flex-1 sm:min-w-[20rem]">
            <Status
              defaultStatus={row.original.status}
              formValueName={`artifacts[${row.index}].status`}
              className="border-border w-full max-w-none rounded-md border-[1px]"
            />
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">Инвентарный номер</p>
          <FormInput
            name={`artifacts[${row.index}].inventoryNumber`}
            defaultValue={row.original.inventoryNumber}
            className="border-border w-full max-w-lg bg-transparent text-center"
            placeholder="__"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">КП номер</p>
          <FormInput
            name={`artifacts[${row.index}].kpNumber`}
            defaultValue={row.original.kpNumber}
            className="border-border w-full max-w-lg bg-transparent text-center"
            placeholder="__"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">Госкаталог номер</p>
          <FormInput
            name={`artifacts[${row.index}].goskatalogNumber`}
            defaultValue={row.original.goskatalogNumber}
            className="border-border w-full max-w-lg bg-transparent text-center"
            placeholder="__"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Название</p>
          <FormTextArea
            name={`artifacts[${row.index}].displayName`}
            defaultValue={row.original.displayName}
            className="border-border w-full min-w-[15rem] max-w-xl bg-transparent text-center text-base"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Описание</p>
          <FormTextArea
            name={`artifacts[${row.index}].description`}
            defaultValue={row.original.description}
            className="border-border w-full max-w-xl bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Фото</p>
          <InputDropzone
            formValueName={`artifacts[${row.index}].primaryImage`}
            defaultValue={row.original.primaryImage}
            file={false}
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Доп. Фото</p>
          <InputMultiDropzone
            formValueName={`artifacts[${row.index}].additionalImages`}
            defaultValues={row.original.additionalImages}
            files={false}
            accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
            maxSize={1024 * 1024 * 100} // 100Mb
            className="min-w-[11rem] lg:p-12"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">Культура</p>
          <Culture
            formValueName={`artifacts[${row.index}].culturalAffiliation`}
            defaultCulture={row.original.culturalAffiliation}
            className="border-border w-full max-w-md rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">Комплекс</p>
          <Set
            formValueName={`artifacts[${row.index}].set`}
            defaultSet={row.original.set}
            className="border-border w-full max-w-md rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">Памятник</p>
          <Monument
            formValueName={`artifacts[${row.index}].monument`}
            defaultMonument={row.original.monument}
            className="border-border w-full max-w-md rounded-md border-[1px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">Место находки</p>
          <Locations
            formValueName={`artifacts[${row.index}].location`}
            defaultLocation={row.original.location}
            className="border-border w-full max-w-md rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">Датировка</p>
          <DatingSelect
            formValueName={`artifacts[${row.index}].datingRow`}
            datingStringName={`artifacts[${row.index}].dating`}
            defaultDating={row.original.datingRow}
            defaultDatingString={row.original.dating}
            className="border-border w-full max-w-md flex-1 rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">Датировка (строка)</p>
          <FormTextArea
            name={`artifacts[${row.index}].dating`}
            defaultValue={row.original.dating}
            className="border-border w-full max-w-xl bg-transparent text-center"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Типология</p>
          <FormInput
            name={`artifacts[${row.index}].typology`}
            defaultValue={row.original.typology}
            className="border-border w-full max-w-xl bg-transparent text-center"
            placeholder="__"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Химический состав</p>
          <FormInput
            name={`artifacts[${row.index}].chemicalComposition`}
            defaultValue={row.original.chemicalComposition}
            className="border-border w-full max-w-xl bg-transparent text-center"
            placeholder="__"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Материалы</p>
          <Materials
            defaultMaterials={row.original.mediums}
            formValueName={`artifacts[${row.index}].mediums`}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Техники</p>
          <Techniques
            defaultTechniques={row.original.techniques}
            formValueName={`artifacts[${row.index}].techniques`}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Размеры</p>
          <SizesSelect
            formValueName={`artifacts[${row.index}].sizes`}
            defaultValues={row.original.sizes}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Вес</p>
          <FormTextArea
            name={`artifacts[${row.index}].weight`}
            defaultValue={row.original.weight}
            className="border-border w-full max-w-xl bg-transparent text-center"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Дата приема в фонд</p>
          <DateSelect
            name={`artifacts[${row.index}].admissionDate`}
            placeholder="Выберите дату"
            defaultValue={row.original.admissionDate}
            className="w-full max-w-xl py-10"
            side="bottom"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Авторы работ</p>
          <Persons
            formValueName={`artifacts[${row.index}].authors`}
            defaultPersons={row.original.authors}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Публикации</p>
          <Publications
            formValueName={`artifacts[${row.index}].publications`}
            defaultPublications={row.original.publications}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Проекты</p>
          <Projects
            formValueName={`artifacts[${row.index}].projects`}
            defaultProjects={row.original.projects}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Донор</p>
          <PersonSingle
            formValueName={`artifacts[${row.index}].donor`}
            defaultPerson={row.original.donor}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Организация</p>
          <Organization
            formValueName={`artifacts[${row.index}].organization`}
            defaultOrganization={row.original.organization}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Лицензия</p>
          <License
            formValueName={`artifacts[${row.index}].license`}
            defaultLicense={row.original.license}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Внешняя ссылка</p>
          <FormTextArea
            name={`artifacts[${row.index}].externalLink`}
            defaultValue={row.original.externalLink}
            className="border-border w-full max-w-xl bg-transparent text-center"
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-center font-medium">3D Модель</p>
        <Model
          formValueName={`artifacts[${row.index}].model`}
          defaultModel={row.original.model}
          className="border-border w-full max-w-none rounded-md border-[1px]"
        />
      </div>
    </div>
  );
}
