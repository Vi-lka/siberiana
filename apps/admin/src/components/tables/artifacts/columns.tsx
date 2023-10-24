"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { ArtifactById } from '@siberiana/schemas'

export const columns: ColumnDef<ArtifactById>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">ID</div>,
    cell: ({ row }) => {
      const id = parseFloat(row.getValue("id"))
      return <div className="text-right font-light text-[9px] w-[2rem] break-words">{id}</div>
    },
  },
  {
    accessorKey: "displayName",
    header: "Название",
  },
  {
    accessorKey: "description",
    header: "Описание",
  },
]
