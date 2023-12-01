"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { Checkbox } from "@siberiana/ui";

import FileCell from "~/components/forms/cells/FileCell";
import LargeTextCell from "~/components/forms/cells/LargeTextCell";
import ListCell from "~/components/forms/cells/ListCell";
import MultiFilesCell from "~/components/forms/cells/MultiFilesCell";
import ObjectCell from "~/components/forms/cells/ObjectCell";
import TextCell from "~/components/forms/cells/TextCell";
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import type { BookForTable } from "@siberiana/schemas";

export const updateColumns: ColumnDef<BookForTable>[] = [
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
          name={`books[${row.index}].displayName`}
          defaultValue={row.original.displayName}
          className="mx-auto w-max max-w-md text-sm"
        />
      );
    },
  },
  {
    accessorKey: "primaryImage",
    header: () => <div className="min-w-[80px] text-center">Фото</div>,
    cell: ({ row }) => {
      return (
        <FileCell
          name={`books[${row.index}].primaryImage`}
          defaultValue={row.original.primaryImage}
        />
      );
    },
  },
  {
    accessorKey: "additionalImages",
    header: () => <div className="min-w-[80px] text-center">Доп. Фото</div>,
    cell: ({ row }) => {
      return (
        <MultiFilesCell
          name={`books[${row.index}].additionalImages`}
          defaultValues={row.original.additionalImages}
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
          name={`books[${row.index}].description`}
          defaultValue={row.original.description}
        />
      );
    },
  },
  {
    accessorKey: "files",
    header: () => <div className="min-w-[80px] text-center">Файлы (PDF)</div>,
    cell: ({ row }) => {
      return (
        <MultiFilesCell
          name={`books[${row.index}].files`}
          defaultValues={row.original.files}
          file
        />
      );
    },
  },
  {
    accessorKey: "year",
    header: () => <div className="text-center">Год</div>,
    cell: ({ row }) => {
      return (
        <TextCell
          name={`books[${row.index}].year`}
          defaultValue={row.original.year}
          className="mx-auto w-max max-w-md text-sm"
        />
      );
    },
  },
  {
    accessorKey: "bookGenres",
    header: () => <div className="text-center">Разделы/Жанры</div>,
    cell: ({ row }) => {
      return (
        <ListCell
          name={`books[${row.index}].bookGenres`}
          defaultValues={row.original.bookGenres}
        />
      );
    },
  },
  {
    accessorKey: "authors",
    header: () => <div className="text-center">Авторы</div>,
    cell: ({ row }) => {
      return (
        <ListCell
          name={`books[${row.index}].authors`}
          defaultValues={row.original.authors}
        />
      );
    },
  },
  {
    accessorKey: "periodical",
    header: () => <div className="text-center">Издание</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`books[${row.index}].periodical`}
          defaultValue={row.original.periodical}
        />
      );
    },
  },
  {
    accessorKey: "publisher",
    header: () => <div className="text-center">Издатель</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`books[${row.index}].publisher`}
          defaultValue={row.original.publisher}
        />
      );
    },
  },
  {
    accessorKey: "library",
    header: () => <div className="text-center">Библиотека/Организация</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`books[${row.index}].library`}
          defaultValue={row.original.library}
        />
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center">Расположение</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`books[${row.index}].location`}
          defaultValue={row.original.location}
        />
      );
    },
  },
  {
    accessorKey: "license",
    header: () => <div className="text-center">Лицензия</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`books[${row.index}].license`}
          defaultValue={row.original.license}
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
          name={`books[${row.index}].externalLink`}
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

export const moderatorsUpdateColumns: ColumnDef<BookForTable>[] = [
  ...updateColumns,
  {
    accessorKey: "status",
    header: () => <div className="text-center">Статус</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`books[${row.index}].status`}
          defaultValue={row.original.status}
        />
      );
    },
  },
];
