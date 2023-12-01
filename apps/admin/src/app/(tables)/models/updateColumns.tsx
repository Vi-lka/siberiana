"use client";

import Image from "next/image";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import type { ModelForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import LargeTextCell from "~/components/forms/cells/LargeTextCell";
import ObjectCell from "~/components/forms/cells/ObjectCell";
import TextCell from "~/components/forms/cells/TextCell";
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";

export const updateColumns: ColumnDef<ModelForTable>[] = [
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
          name={`models[${row.index}].displayName`}
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
          name={`models[${row.index}].description`}
          defaultValue={row.original.description}
        />
      );
    },
  },
  {
    accessorKey: "artifacts",
    header: () => <div className="text-center">Артефакты</div>,
    cell: ({ row }) => {
      const array = row.original.artifacts;
      return (
        <div className="flex min-w-[15rem] flex-col items-center gap-4">
          {array.map((item, i) => {
            const imageURL =
              item.primaryImageURL.length > 0
                ? item.primaryImageURL
                : "/images/image-placeholder.png";
            return (
              <div key={i} className="flex items-center gap-1">
                <Image
                  src={imageURL}
                  alt={item.displayName}
                  width={60}
                  height={60}
                />
                <div>
                  <p className="mb-1 text-[10px]">id: {item.id}</p>
                  <p>{item.displayName}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "petroglyphs",
    header: () => <div className="text-center">Петроглифы</div>,
    cell: ({ row }) => {
      const array = row.original.petroglyphs;
      return (
        <div className="flex min-w-[15rem] flex-col items-center gap-4">
          {array.map((item, i) => {
            const imageURL =
              item.primaryImageURL.length > 0
                ? item.primaryImageURL
                : "/images/image-placeholder.png";
            return (
              <div key={i} className="flex items-center gap-1">
                <Image
                  src={imageURL}
                  alt={item.displayName}
                  width={60}
                  height={60}
                />
                <div>
                  <p className="mb-1 text-[10px]">id: {item.id}</p>
                  <p>{item.displayName}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "externalLink",
    header: () => <div className="text-center">Внешняя ссылка</div>,
    cell: ({ row }) => {
      return (
        <TextCell
          name={`models[${row.index}].externalLink`}
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

export const moderatorsUpdateColumns: ColumnDef<ModelForTable>[] = [
  ...updateColumns,
  {
    accessorKey: "status",
    header: () => <div className="text-center">Статус</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`models[${row.index}].status`}
          defaultValue={row.original.status}
        />
      );
    },
  },
];
