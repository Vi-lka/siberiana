"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { SetForTable } from '@siberiana/schemas';
import { Checkbox } from "@siberiana/ui"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader"
import FormTextArea from "~/components/tables/inputs/FormTextArea"
import Monuments from "~/components/tables/artifacts/Monuments";

export const columns: ColumnDef<SetForTable>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        className="rounded-[6px] w-5 h-5"
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        className="rounded-[6px] w-5 h-5"
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
      const id = row.original.id.includes("random") ? row.index : parseFloat(row.original.id)
      return <div className="text-right font-light text-[8px] w-[1.5rem] break-words">{id}</div>
    },
  },
  {
    accessorKey: "displayName",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Название" className="ml-2" />
      )
    },
    cell: ({ row }) => {
      return (
        <FormTextArea name={`sets[${row.index}].displayName`} defaultValue={row.original.displayName}/>
      )
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Описание</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea name={`sets[${row.index}].description`} defaultValue={row.original.description}/>
      )
    },
  },
  {
    accessorKey: "monuments",
    header: () => <div className="text-center">Памятники</div>,
    cell: ({ row }) => {
      return (
        <Monuments formValueName={`sets[${row.index}].monuments`} defaultMonuments={row.original.monuments} />
      )
    },
  },
  {
    accessorKey: "externalLink",
    header: () => <div className="text-center">Внешняя ссылка</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea name={`sets[${row.index}].externalLink`} defaultValue={row.original.externalLink}/>
      )
    },
  }
]

export const updateColumns: ColumnDef<SetForTable>[] = [
  ...columns,
  {
    accessorKey: "artifacts",
    header: () => <div className="text-center">Артефактов</div>,
    cell: ({ row }) => {
      const count = row.original.artifacts
      return <div className="text-center">{count}</div>
    },
  },
  {
    accessorKey: "createdBy",
    header: () => <div className="text-center">Создано by</div>,
    cell: ({ row }) => {
      return <div className="text-center break-words">{row.original.createdBy}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center min-w-[6rem]">Создано at</div>,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
        ? format(row.original.createdAt, "PPpp", {locale: ru})
        : ""
      return <div className="text-center break-words">{createdAt}</div>
    },
  },
  {
    accessorKey: "updatedBy",
    header: () => <div className="text-center">Обновлено by</div>,
    cell: ({ row }) => {
      return <div className="text-center break-words">{row.original.updatedBy}</div>
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-center min-w-[6rem]">Обновлено at</div>,
    cell: ({ row }) => {
      const updatedAt = (row.original.updatedAt && row.original.updatedBy)
        ? format(row.original.updatedAt, "PPpp", {locale: ru})
        : ""
      return <div className="text-center break-words">{updatedAt}</div>
    },
  },
]