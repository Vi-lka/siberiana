"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import type { PersonsForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import LargeTextCell from "~/components/forms/cells/LargeTextCell";
import TextCell from "~/components/forms/cells/TextCell";
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import ObjectCell from "~/components/forms/cells/ObjectCell";

export const updateColumns: ColumnDef<PersonsForTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onClick={(e) => e.stopPropagation()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="h-5 w-5 rounded-[6px]"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        onClick={(e) => e.stopPropagation()}
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
    accessorKey: "gender",
    header: () => <div className="text-center">Пол</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`persons[${row.index}].gender`}
          defaultValue={row.original.gender}
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
        <TextCell
          name={`persons[${row.index}].displayName`}
          defaultValue={row.original.displayName}
          className="mx-auto w-max max-w-md text-sm"
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
        <TextCell
          name={`persons[${row.index}].givenName`}
          defaultValue={row.original.givenName}
          className="mx-auto w-max max-w-md text-sm"
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
        <TextCell
          name={`persons[${row.index}].familyName`}
          defaultValue={row.original.familyName}
          className="mx-auto w-max max-w-md text-sm"
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
        <TextCell
          name={`persons[${row.index}].patronymicName`}
          defaultValue={row.original.patronymicName}
          className="mx-auto w-max max-w-md text-sm"
        />
      );
    },
  },
  {
    accessorKey: "occupation",
    header: () => <div className="text-center">Должность</div>,
    cell: ({ row }) => {
      return (
        <TextCell
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
        <TextCell
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
        <LargeTextCell
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
        <TextCell
          name={`persons[${row.index}].externalLink`}
          defaultValue={row.original.externalLink}
        />
      );
    },
  },
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
