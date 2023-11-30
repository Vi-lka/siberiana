import React from "react";
import type { Row } from "@tanstack/react-table";

import type { ArtifactForTable } from "@siberiana/schemas";

import FormInput from "~/components/tables/inputs/FormInput";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import InputDropzone from "~/components/tables/inputs/dropzone/InputDropzone";
import InputMultiDropzone from "~/components/tables/inputs/dropzone/InputMultiDropzone";
import Culture from "~/components/tables/artifacts/Culture";
import Set from "~/components/tables/artifacts/Set";
import Monument from "~/components/tables/artifacts/Monument";
import Locations from "~/components/tables/global-fields/Locations";
import DatingSelect from "~/components/tables/inputs/dating/DatingSelect";
import Materials from "~/components/tables/artifacts/Materials";
import Techniques from "~/components/tables/artifacts/Techniques";
import SizesSelect from "~/components/tables/global-fields/SizesSelect";
import DateSelect from "~/components/tables/inputs/DateSelect";
import Persons from "~/components/tables/global-fields/Persons";
import Publications from "~/components/tables/global-fields/Publications";
import Projects from "~/components/tables/global-fields/Projects";
import PersonSingle from "../tables/global-fields/PersonSingle";
import Organization from "../tables/global-fields/Organization";
import License from "../tables/global-fields/License";
import Model from "../tables/artifacts/Model";
import { useSession } from "next-auth/react";
import Status from "../tables/global-fields/Status";

export default function Artifacts({ row }: { row: Row<ArtifactForTable> }) {
  const session = useSession()
  const isModerator = session.data?.user.roles?.includes("moderator");
  return (
    <div className="flex w-full flex-col gap-6 pt-3">
      <div className="flex w-full items-center gap-6 flex-wrap">
        <p className="break-words font-light text-sm sm:min-w-[20rem] min-w-full">ID: {row.original.id}</p>
        {isModerator
          ? (
            <div className="flex-1 sm:min-w-[20rem] min-w-full">
              <Status
                defaultStatus={row.original.status}
                formValueName={`artifacts[${row.index}].status`}
                className="w-full max-w-none border-[1px] rounded-md border-border"
              />
            </div>
          )
          : null
        }
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[15rem] min-w-full">
          <p className="mb-2 font-medium text-center">Инвентарный номер</p>
          <FormInput
            name={`artifacts[${row.index}].inventoryNumber`}
            defaultValue={row.original.inventoryNumber}
            className="border-border w-full max-w-lg bg-transparent text-center"
            placeholder="__"
          />
        </div>

        <div className="flex-1 sm:min-w-[15rem] min-w-full">
          <p className="mb-2 font-medium text-center">КП номер</p>
          <FormInput
            name={`artifacts[${row.index}].kpNumber`}
            defaultValue={row.original.kpNumber}
            className="border-border w-full max-w-lg bg-transparent text-center"
            placeholder="__"
          />
        </div>

        <div className="flex-1 sm:min-w-[15rem] min-w-full">
          <p className="mb-2 font-medium text-center">Госкаталог номер</p>
          <FormInput
            name={`artifacts[${row.index}].goskatalogNumber`}
            defaultValue={row.original.goskatalogNumber}
            className="border-border w-full max-w-lg bg-transparent text-center"
            placeholder="__"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Название</p>
          <FormTextArea
            name={`artifacts[${row.index}].displayName`}
            defaultValue={row.original.displayName}
            className="border-border w-full max-w-xl bg-transparent text-center text-base min-w-[15rem]"
          />
        </div>

        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Описание</p>
          <FormTextArea
            name={`artifacts[${row.index}].description`}
            defaultValue={row.original.description}
            className="border-border w-full max-w-xl bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Фото</p>
          <InputDropzone 
            formValueName={`artifacts[${row.index}].primaryImage`}
            defaultValue={row.original.primaryImage}
            file={false} 
          />
        </div>

        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Доп. Фото</p>
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
        <div className="flex-1 sm:min-w-[15rem] min-w-full">
          <p className="mb-2 font-medium text-center">Культура</p>
          <Culture
            formValueName={`artifacts[${row.index}].culturalAffiliation`}
            defaultCulture={row.original.culturalAffiliation}
            className="w-full max-w-md border-[1px] rounded-md border-border"
          />
        </div>

        <div className="flex-1 sm:min-w-[15rem] min-w-full">
          <p className="mb-2 font-medium text-center">Комплекс</p>
          <Set
            formValueName={`artifacts[${row.index}].set`}
            defaultSet={row.original.set}
            className="w-full max-w-md border-[1px] rounded-md border-border"
          />
        </div>

        <div className="flex-1 sm:min-w-[15rem] min-w-full">
          <p className="mb-2 font-medium text-center">Памятник</p>
          <Monument
            formValueName={`artifacts[${row.index}].monument`}
            defaultMonument={row.original.monument}
            className="w-full max-w-md border-[1px] rounded-md border-border"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[15rem] min-w-full">
          <p className="mb-2 font-medium text-center">Место находки</p>
          <Locations
            formValueName={`artifacts[${row.index}].location`}
            defaultLocation={row.original.location}
            className="w-full max-w-md border-[1px] rounded-md border-border"
          />
        </div>


        <div className="flex-1 sm:min-w-[15rem] min-w-full">
          <p className="mb-2 font-medium text-center">Датировка</p>
          <DatingSelect
            formValueName={`artifacts[${row.index}].datingRow`}
            datingStringName={`artifacts[${row.index}].dating`}
            defaultDating={row.original.datingRow}
            defaultDatingString={row.original.dating}
            className="w-full max-w-md border-[1px] rounded-md border-border flex-1"
          />
        </div>

        <div className="flex-1 sm:min-w-[15rem] min-w-full">
          <p className="mb-2 font-medium text-center">Датировка (строка)</p>
          <FormTextArea
            name={`artifacts[${row.index}].dating`}
            defaultValue={row.original.dating}
            className="border-border w-full max-w-xl bg-transparent text-center"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Типология</p>
          <FormInput
            name={`artifacts[${row.index}].typology`}
            defaultValue={row.original.typology}
            className="border-border w-full max-w-xl bg-transparent text-center"
            placeholder="__"
          />
        </div>

        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Химический состав</p>
          <FormInput
            name={`artifacts[${row.index}].chemicalComposition`}
            defaultValue={row.original.chemicalComposition}
            className="border-border w-full max-w-xl bg-transparent text-center"
            placeholder="__"
          />
        </div>
      </div>


      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Материалы</p>
          <Materials
            defaultMaterials={row.original.mediums}
            formValueName={`artifacts[${row.index}].mediums`}
            className="w-full max-w-xl border-[1px] rounded-md border-border"
          />
        </div>

        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Техники</p>
          <Techniques
            defaultTechniques={row.original.techniques}
            formValueName={`artifacts[${row.index}].techniques`}
            className="w-full max-w-xl border-[1px] rounded-md border-border"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Размеры</p>
          <SizesSelect
            formValueName={`artifacts[${row.index}].sizes`}
            defaultValues={row.original.sizes}
            className="w-full max-w-xl border-[1px] rounded-md border-border"
          />
        </div>

        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Вес</p>
          <FormTextArea
            name={`artifacts[${row.index}].weight`}
            defaultValue={row.original.weight}
            className="border-border w-full max-w-xl bg-transparent text-center"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Дата приема в фонд</p>
          <DateSelect
            name={`artifacts[${row.index}].admissionDate`}
            placeholder="Выберите дату"
            defaultValue={row.original.admissionDate}
            className="w-full max-w-xl py-10"
            side="bottom"
          />
        </div>

        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Авторы работ</p>
          <Persons
            formValueName={`artifacts[${row.index}].authors`}
            defaultPersons={row.original.authors}
            className="w-full max-w-xl border-[1px] rounded-md border-border"
          />
        </div>
      </div>


      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Публикации</p>
          <Publications
            formValueName={`artifacts[${row.index}].publications`}
            defaultPublications={row.original.publications}
            className="w-full max-w-xl border-[1px] rounded-md border-border"
          />
        </div>

        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Проекты</p>
          <Projects
            formValueName={`artifacts[${row.index}].projects`}
            defaultProjects={row.original.projects}
            className="w-full max-w-xl border-[1px] rounded-md border-border"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Донор</p>
          <PersonSingle
            formValueName={`artifacts[${row.index}].donor`}
            defaultPerson={row.original.donor}
            className="w-full max-w-xl border-[1px] rounded-md border-border"
          />
        </div>

        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Организация</p>
          <Organization
            formValueName={`artifacts[${row.index}].organization`}
            defaultOrganization={row.original.organization}
            className="w-full max-w-xl border-[1px] rounded-md border-border"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Лицензия</p>
          <License
            formValueName={`artifacts[${row.index}].license`}
            defaultLicense={row.original.license}
            className="w-full max-w-xl border-[1px] rounded-md border-border"
          />
        </div>

        <div className="flex-1 sm:min-w-[20rem] min-w-full">
          <p className="mb-2 font-medium text-center">Внешняя ссылка</p>
          <FormTextArea
            name={`artifacts[${row.index}].externalLink`}
            defaultValue={row.original.externalLink}
            className="border-border w-full max-w-xl bg-transparent text-center"
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 font-medium text-center">3D Модель</p>
        <Model
          formValueName={`artifacts[${row.index}].model`}
          defaultModel={row.original.model}
          className="w-full max-w-none border-[1px] rounded-md border-border"
        />
      </div>
    </div>
  );
}
