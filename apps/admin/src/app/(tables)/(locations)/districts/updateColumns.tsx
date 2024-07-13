"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import type { DistrictsForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import LargeTextCell from "~/components/forms/cells/LargeTextCell";
import TextCell from "~/components/forms/cells/TextCell";
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import ObjectCell from "~/components/forms/cells/ObjectCell";

export const updateColumns: ColumnDef<DistrictsForTable>[] = [
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
        <TextCell
          name={`districts[${row.index}].displayName`}
          defaultValue={row.original.displayName}
          className="mx-auto w-max max-w-md text-sm"
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
          name={`districts[${row.index}].description`}
          defaultValue={row.original.description}
        />
      );
    },
  },
  {
    accessorKey: "region",
    header: () => <div className="text-center">Регион</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`districts[${row.index}].region`}
          defaultValue={row.original.region}
        />
      );
    },
  },
  {
    accessorKey: "artifacts",
    header: () => <div className="text-center">Артефактов</div>,
    cell: ({ row }) => {
      const count = row.original.artifacts;
      return <div className="text-center">{count}</div>;
    },
  },
  {
    accessorKey: "books",
    header: () => <div className="text-center">Книг</div>,
    cell: ({ row }) => {
      const count = row.original.books;
      return <div className="text-center">{count}</div>;
    },
  },
  {
    accessorKey: "settlements",
    header: () => <div className="text-center">Населенных пунктов</div>,
    cell: ({ row }) => {
      const count = row.original.settlements;
      return <div className="text-center">{count}</div>;
    },
  },
  {
    accessorKey: "locations",
    header: () => <div className="text-center">Локаций</div>,
    cell: ({ row }) => {
      const count = row.original.locations;
      return <div className="text-center">{count}</div>;
    },
  },
  {
    accessorKey: "externalLink",
    header: () => <div className="text-center">Внешняя ссылка</div>,
    cell: ({ row }) => {
      return (
        <TextCell
          name={`districts[${row.index}].externalLink`}
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
