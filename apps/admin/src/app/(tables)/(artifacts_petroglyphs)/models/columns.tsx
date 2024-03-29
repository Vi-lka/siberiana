"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { ModelForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import Status from "~/components/tables/global-fields/Status";
import InputDropzone from "~/components/tables/inputs/dropzone/InputDropzone";
import FormTextArea from "~/components/tables/inputs/FormTextArea";

export const columns: ColumnDef<ModelForTable>[] = [
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
          name={`models[${row.index}].displayName`}
          defaultValue={row.original.displayName}
        />
      );
    },
  },
  {
    accessorKey: "file",
    header: () => <div className="text-center">Файл</div>,
    cell: ({ row }) => {
      return (
        <InputDropzone
          formValueName={`models[${row.index}].file`}
          defaultValue={row.original.file}
          file
          accept={{ "model/gltf-binary": [".glb"] }}
          maxSize={1024 * 1024 * 1024} // 1Gb
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
          name={`models[${row.index}].description`}
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
          name={`models[${row.index}].externalLink`}
          defaultValue={row.original.externalLink}
        />
      );
    },
  },
];

export const moderatorsColumns: ColumnDef<ModelForTable>[] = [
  ...columns,
  {
    accessorKey: "status",
    header: () => <div className="text-center">Статус</div>,
    cell: ({ row }) => {
      return (
        <Status
          defaultStatus={row.original.status}
          formValueName={`models[${row.index}].status`}
        />
      );
    },
  },
];
