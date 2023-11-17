"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import type { BookForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import License from "~/components/tables/global-fields/License";
import Locations from "~/components/tables/global-fields/Locations";
import Persons from "~/components/tables/global-fields/Persons";
import Status from "~/components/tables/global-fields/Status";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import PopoverDropzone from "~/components/tables/inputs/dropzone/PopoverDropzone";

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
        <PopoverDropzone
          formValueName={`books[${row.index}].primaryImage`}
          className="px-6 py-6"
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
        />
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center">Место находки</div>,
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

export const updateColumns: ColumnDef<BookForTable>[] = [
  ...columns,
  {
    accessorKey: "createdBy",
    header: () => <div className="text-center">Создано by</div>,
    cell: ({ row }) => {
      return (
        <div className="break-words text-center">{row.original.createdBy}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="min-w-[6rem] text-center">Создано at</div>,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
        ? format(new Date(row.original.createdAt), "PPpp", { locale: ru })
        : "";
      return <div className="break-words text-center">{createdAt}</div>;
    },
  },
  {
    accessorKey: "updatedBy",
    header: () => <div className="text-center">Обновлено by</div>,
    cell: ({ row }) => {
      return (
        <div className="break-words text-center">{row.original.updatedBy}</div>
      );
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="min-w-[6rem] text-center">Обновлено at</div>,
    cell: ({ row }) => {
      const updatedAt =
        row.original.updatedAt && row.original.updatedBy
          ? format(new Date(row.original.updatedAt), "PPpp", { locale: ru })
          : "";
      return <div className="break-words text-center">{updatedAt}</div>;
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

export const moderatorsUpdateColumns: ColumnDef<BookForTable>[] = [
  ...updateColumns,
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
