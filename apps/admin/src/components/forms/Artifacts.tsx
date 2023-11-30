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

export default function Artifacts({ row }: { row: Row<ArtifactForTable> }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <p className="break-words font-light text-sm">ID: {row.original.id}</p>

      <div>
        <p className="mb-2 font-medium">Инвентарный номер</p>
        <FormInput
          name={`artifacts[${row.index}].inventoryNumber`}
          defaultValue={row.original.inventoryNumber}
          className="border-border w-full max-w-lg bg-transparent text-center"
          placeholder="__"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">КП номер</p>
        <FormInput
          name={`artifacts[${row.index}].kpNumber`}
          defaultValue={row.original.kpNumber}
          className="border-border w-full max-w-lg bg-transparent text-center"
          placeholder="__"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Госкаталог номер</p>
        <FormInput
          name={`artifacts[${row.index}].goskatalogNumber`}
          defaultValue={row.original.goskatalogNumber}
          className="border-border w-full max-w-lg bg-transparent text-center"
          placeholder="__"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Название</p>
        <FormTextArea
          name={`artifacts[${row.index}].displayName`}
          defaultValue={row.original.displayName}
          className="border-border w-full max-w-lg bg-transparent text-center"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Фото</p>
        <InputDropzone 
          formValueName={`artifacts[${row.index}].primaryImage`}
          file={false} 
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Доп. Фото</p>
        <InputMultiDropzone
          formValueName={`artifacts[${row.index}].additionalImages`}
          defaultValues={row.original.additionalImages}
          files={false}
          accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
          maxSize={1024 * 1024 * 100} // 100Mb
          className="min-w-[11rem]"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Описание</p>
        <FormTextArea
          name={`artifacts[${row.index}].description`}
          defaultValue={row.original.description}
          className="border-border w-full max-w-lg bg-transparent"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Культура</p>
        <Culture
          defaultCulture={row.original.culturalAffiliation}
          formValueName={`artifacts[${row.index}].culturalAffiliation`}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Комплекс</p>
        <Set
          defaultSet={row.original.set}
          formValueName={`artifacts[${row.index}].set`}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Памятник</p>
        <Monument
          defaultMonument={row.original.monument}
          formValueName={`artifacts[${row.index}].monument`}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Место находки</p>
        <Locations
          defaultLocation={row.original.location}
          formValueName={`artifacts[${row.index}].location`}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>


      <div>
        <p className="mb-2 font-medium">Датировка</p>
        <DatingSelect
          formValueName={`artifacts[${row.index}].datingRow`}
          datingStringName={`artifacts[${row.index}].dating`}
          defaultDating={row.original.datingRow}
          defaultDatingString={row.original.dating}
          className="w-full max-w-md border-[1px] rounded-md border-border flex-1"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">датировка (string)</p>
        <FormInput
          name={`artifacts[${row.index}].dating`}
          defaultValue={row.original.dating}
          className="border-border w-full max-w-lg bg-transparent"
          placeholder="__"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Типология</p>
        <FormInput
          name={`artifacts[${row.index}].typology`}
          defaultValue={row.original.typology}
          className="border-border w-full max-w-lg bg-transparent"
          placeholder="__"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Химический состав</p>
        <FormInput
          name={`artifacts[${row.index}].chemicalComposition`}
          defaultValue={row.original.chemicalComposition}
          className="border-border w-full max-w-lg bg-transparent"
          placeholder="__"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Материалы</p>
        <Materials
          defaultMaterials={row.original.mediums}
          formValueName={`artifacts[${row.index}].mediums`}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Техники</p>
        <Techniques
          defaultTechniques={row.original.techniques}
          formValueName={`artifacts[${row.index}].techniques`}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Размеры</p>
        <SizesSelect
          formValueName={`artifacts[${row.index}].sizes`}
          defaultValues={row.original.sizes}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Вес</p>
        <FormInput
          name={`artifacts[${row.index}].weight`}
          defaultValue={row.original.weight}
          className="border-border w-full max-w-lg bg-transparent"
          placeholder="__"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Дата приема в фонд</p>
        <DateSelect
          name={`artifacts[${row.index}].admissionDate`}
          placeholder="Выберите дату"
          defaultValue={row.original.admissionDate}
          className="w-full max-w-lg"
          side="bottom"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Авторы работ</p>
        <Persons
          formValueName={`artifacts[${row.index}].authors`}
          defaultPersons={row.original.authors}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Публикации</p>
        <Publications
          formValueName={`artifacts[${row.index}].publications`}
          defaultPublications={row.original.publications}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>

      <div>
        <p className="mb-2 font-medium">Проекты</p>
        <Projects
          formValueName={`artifacts[${row.index}].projects`}
          defaultProjects={row.original.projects}
          className="w-full max-w-md border-[1px] rounded-md border-border"
        />
      </div>
    </div>
  );
}
