"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { BookForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import BookGenres from "~/components/tables/books/BookGenres";
import Periodical from "~/components/tables/books/Periodical";
import Publisher from "~/components/tables/books/Publisher";
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import License from "~/components/tables/global-fields/License";
import Locations from "~/components/tables/global-fields/Locations";
import Organization from "~/components/tables/global-fields/Organization";
import Persons from "~/components/tables/global-fields/Persons";
import Status from "~/components/tables/global-fields/Status";
import InputDropzone from "~/components/tables/inputs/dropzone/InputDropzone";
import InputMultiDropzone from "~/components/tables/inputs/dropzone/InputMultiDropzone";
import FormInput from "~/components/tables/inputs/FormInput";
import FormTextArea from "~/components/tables/inputs/FormTextArea";

export const columns: ColumnDef<BookForTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="h-5 w-5 rounded-[6px]"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="h-5 w-5 rounded-[6px]"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => {
      const id = row.original.id.includes("random")
        ? row.index
        : parseFloat(row.original.id);
      return (
        <div className="w-[1.5rem] break-words text-right text-[8px] font-light">
          {id}
        </div>
      );
    },
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Название"
          className="ml-2"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`books[${row.index}].displayName`}
          defaultValue={row.original.displayName}
        />
      );
    },
  },
  {
    accessorKey: "primaryImage",
    header: () => <div className="min-w-[80px] text-center">Фото</div>,
    cell: ({ row }) => {
      return (
        <InputDropzone
          formValueName={`books[${row.index}].primaryImage`}
          defaultValue={row.original.primaryImage}
          className="min-w-[20rem]"
          file={false}
        />
      );
    },
  },
  {
    accessorKey: "additionalImages",
    header: () => <div className="min-w-[80px] text-center">Доп. Фото</div>,
    cell: ({ row }) => {
      return (
        <InputMultiDropzone
          formValueName={`books[${row.index}].additionalImages`}
          defaultValues={row.original.additionalImages}
          files={false}
          accept={{ "image/*": [".jpeg", ".jpg", ".png", ".webp"] }}
          maxSize={1024 * 1024 * 100} // 100Mb
          className="min-w-[11rem]"
        />
      );
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Описание</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`books[${row.index}].description`}
          defaultValue={row.original.description}
          className="min-w-[20rem]"
        />
      );
    },
  },
  {
    accessorKey: "files",
    header: () => <div className="min-w-[80px] text-center">Файлы (PDF)</div>,
    cell: ({ row }) => {
      return (
        <InputMultiDropzone
          formValueName={`books[${row.index}].files`}
          defaultValues={row.original.files}
          files
          accept={{ "application/pdf": [".pdf"] }}
          maxSize={1024 * 1024 * 1024} // 1Gb
          className="min-w-[11rem]"
        />
      );
    },
  },
  {
    accessorKey: "year",
    header: () => <div className="text-center">Год</div>,
    cell: ({ row }) => {
      return (
        <FormInput
          name={`books[${row.index}].year`}
          defaultValue={row.original.year}
          type="number"
          className="text-center"
          placeholder="__"
        />
      );
    },
  },
  {
    accessorKey: "bookGenres",
    header: () => <div className="text-center">Разделы/Жанры</div>,
    cell: ({ row }) => {
      return (
        <BookGenres
          formValueName={`books[${row.index}].bookGenres`}
          defaultBookGenres={row.original.bookGenres}
        />
      );
    },
  },
  {
    accessorKey: "authors",
    header: () => <div className="text-center">Авторы</div>,
    cell: ({ row }) => {
      return (
        <Persons
          formValueName={`books[${row.index}].authors`}
          defaultPersons={row.original.authors}
        />
      );
    },
  },
  {
    accessorKey: "periodical",
    header: () => <div className="text-center">Издание</div>,
    cell: ({ row }) => {
      return (
        <Periodical
          formValueName={`books[${row.index}].periodical`}
          defaultPeriodical={row.original.periodical}
        />
      );
    },
  },
  {
    accessorKey: "publisher",
    header: () => <div className="text-center">Издатель</div>,
    cell: ({ row }) => {
      return (
        <Publisher
          formValueName={`books[${row.index}].publisher`}
          defaultPublisher={row.original.publisher}
        />
      );
    },
  },
  {
    accessorKey: "library",
    header: () => (
      <div className="min-w-[12rem] text-center">Библиотека/Организация</div>
    ),
    cell: ({ row }) => {
      return (
        <Organization
          formValueName={`books[${row.index}].library`}
          defaultOrganization={row.original.library}
        />
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center">Расположение</div>,
    cell: ({ row }) => {
      return (
        <Locations
          defaultLocation={row.original.location}
          formValueName={`books[${row.index}].location`}
        />
      );
    },
  },
  {
    accessorKey: "license",
    header: () => <div className="text-center">Лицензия</div>,
    cell: ({ row }) => {
      return (
        <License
          formValueName={`books[${row.index}].license`}
          defaultLicense={row.original.license}
        />
      );
    },
  },
  {
    accessorKey: "externalLink",
    header: () => <div className="text-center">Внешняя ссылка</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`books[${row.index}].externalLink`}
          defaultValue={row.original.externalLink}
        />
      );
    },
  },
];

export const moderatorsColumns: ColumnDef<BookForTable>[] = [
  ...columns,
  {
    accessorKey: "status",
    header: () => <div className="text-center">Статус</div>,
    cell: ({ row }) => {
      return (
        <Status
          defaultStatus={row.original.status}
          formValueName={`books[${row.index}].status`}
        />
      );
    },
  },
];
