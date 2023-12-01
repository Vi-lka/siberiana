import React from "react";
import type { Row } from "@tanstack/react-table";
import { useSession } from "next-auth/react";

import type {BookForTable} from "@siberiana/schemas";

import Locations from "~/components/tables/global-fields/Locations";
import Persons from "~/components/tables/global-fields/Persons";
import InputDropzone from "~/components/tables/inputs/dropzone/InputDropzone";
import InputMultiDropzone from "~/components/tables/inputs/dropzone/InputMultiDropzone";
import FormInput from "~/components/tables/inputs/FormInput";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import License from "../tables/global-fields/License";
import Status from "../tables/global-fields/Status";
import BookGenres from "../tables/books/BookGenres";
import Periodical from "../tables/books/Periodical";
import Publisher from "../tables/books/Publisher";
import Organization from "../tables/global-fields/Organization";

export default function Books({ row }: { row: Row<BookForTable> }) {
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
              formValueName={`books[${row.index}].status`}
              className="border-border w-full max-w-none rounded-md border-[1px]"
            />
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Название</p>
          <FormTextArea
            name={`books[${row.index}].displayName`}
            defaultValue={row.original.displayName}
            className="border-border w-full min-w-[15rem] max-w-xl bg-transparent text-center text-base"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Описание</p>
          <FormTextArea
            name={`books[${row.index}].description`}
            defaultValue={row.original.description}
            className="border-border w-full max-w-xl bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Фото</p>
          <InputDropzone
            formValueName={`books[${row.index}].primaryImage`}
            defaultValue={row.original.primaryImage}
            file={false}
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Доп. Фото</p>
          <InputMultiDropzone
            formValueName={`books[${row.index}].additionalImages`}
            defaultValues={row.original.additionalImages}
            files={false}
            accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
            maxSize={1024 * 1024 * 100} // 100Mb
            className="min-w-[11rem] lg:p-12"
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-center font-medium">Файлы (PDF)</p>
        <InputMultiDropzone
          formValueName={`books[${row.index}].files`}
          defaultValues={row.original.files}
          files
          accept={{ "application/pdf": [".pdf"] }}
          maxSize={1024 * 1024 * 1024} // 1Gb
          className="min-w-[11rem] lg:p-12"
        />
      </div>

      <div className="w-full">
        <p className="mb-2 text-center font-medium">Год</p>
        <FormInput
          name={`books[${row.index}].year`}
          defaultValue={row.original.year}
          type="number"
          className="border-border w-full max-w-none bg-transparent text-center text-base"
          placeholder="__"
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Разделы/Жанры</p>
          <BookGenres
            formValueName={`books[${row.index}].bookGenres`}
            defaultBookGenres={row.original.bookGenres}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Авторы</p>
          <Persons
            formValueName={`books[${row.index}].authors`}
            defaultPersons={row.original.authors}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Издание</p>
          <Periodical
            formValueName={`books[${row.index}].periodical`}
            defaultPeriodical={row.original.periodical}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Издатель</p>
          <Publisher
            formValueName={`books[${row.index}].publisher`}
            defaultPublisher={row.original.publisher}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Библиотека/Организация</p>
          <Organization
            formValueName={`books[${row.index}].library`}
            defaultOrganization={row.original.library}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[15rem]">
          <p className="mb-2 text-center font-medium">Расположение</p>
          <Locations
            formValueName={`books[${row.index}].location`}
            defaultLocation={row.original.location}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Лицензия</p>
          <License
            formValueName={`books[${row.index}].license`}
            defaultLicense={row.original.license}
            className="border-border w-full max-w-xl rounded-md border-[1px]"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Внешняя ссылка</p>
          <FormTextArea
            name={`books[${row.index}].externalLink`}
            defaultValue={row.original.externalLink}
            className="border-border w-full max-w-xl bg-transparent text-center"
          />
        </div>
      </div>
    </div>
  );
}
