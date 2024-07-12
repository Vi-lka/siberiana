"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { PersonsForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import Region from "~/components/tables/global-fields/Region";
import District from "~/components/tables/global-fields/District";
import Gender from "~/components/tables/global-fields/Gender";

export const columns: ColumnDef<PersonsForTable>[] = [
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
    accessorKey: "status",
    header: () => <div className="text-center">Пол</div>,
    cell: ({ row }) => {
      return (
        <Gender
          defaultGender={row.original.gender}
          formValueName={`persons[${row.index}].gender`}
        />
      );
    },
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="ФИО"
          className="ml-2"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`persons[${row.index}].displayName`}
          defaultValue={row.original.displayName}
        />
      );
    },
  },
  {
    accessorKey: "givenName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Имя"
          className="ml-2"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`persons[${row.index}].givenName`}
          defaultValue={row.original.givenName}
        />
      );
    },
  },
  {
    accessorKey: "familyName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Фамилия"
          className="ml-2"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`persons[${row.index}].familyName`}
          defaultValue={row.original.familyName}
        />
      );
    },
  },
  {
    accessorKey: "patronymicName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Отчество"
          className="ml-2"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`persons[${row.index}].patronymicName`}
          defaultValue={row.original.patronymicName}
        />
      );
    },
  },
  {
    accessorKey: "occupation",
    header: () => <div className="text-center">Должность</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`persons[${row.index}].occupation`}
          defaultValue={row.original.occupation}
        />
      );
    },
  },
  {
    accessorKey: "address",
    header: () => <div className="text-center">Адрес</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`persons[${row.index}].address`}
          defaultValue={row.original.address}
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
          name={`persons[${row.index}].description`}
          defaultValue={row.original.description}
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
          name={`persons[${row.index}].externalLink`}
          defaultValue={row.original.externalLink}
        />
      );
    },
  },
];
