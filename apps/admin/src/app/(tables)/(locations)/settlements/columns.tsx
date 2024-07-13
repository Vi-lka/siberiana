"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { SettlementsForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import Region from "~/components/tables/global-fields/Region";
import District from "~/components/tables/global-fields/District";

export const columns: ColumnDef<SettlementsForTable>[] = [
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
          name={`settlements[${row.index}].displayName`}
          defaultValue={row.original.displayName}
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
          name={`settlements[${row.index}].description`}
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
        <Region
          defaultRegion={row.original.region}
          formValueName={`settlements[${row.index}].region`}
        />
      );
    },
  },
  {
    accessorKey: "district",
    header: () => <div className="text-center">Район</div>,
    cell: ({ row }) => {
      return (
        <District
          defaultDistrict={row.original.district}
          formValueName={`settlements[${row.index}].district`}
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
          name={`settlements[${row.index}].externalLink`}
          defaultValue={row.original.externalLink}
        />
      );
    },
  },
];
