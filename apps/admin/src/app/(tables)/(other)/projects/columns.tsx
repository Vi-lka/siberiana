"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { ProjectsForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import Persons from "~/components/tables/global-fields/Persons";

export const columns: ColumnDef<ProjectsForTable>[] = [
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
          name={`projects[${row.index}].displayName`}
          defaultValue={row.original.displayName}
        />
      );
    },
  },
  {
    accessorKey: "team",
    header: () => <div className="text-center">Команда</div>,
    cell: ({ row }) => {
      return (
        <Persons
          formValueName={`projects[${row.index}].team`}
          defaultPersons={row.original.team}
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
          name={`projects[${row.index}].description`}
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
          name={`projects[${row.index}].externalLink`}
          defaultValue={row.original.externalLink}
        />
      );
    },
  },
];
