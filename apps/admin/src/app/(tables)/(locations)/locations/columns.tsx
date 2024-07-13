"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { LocationsForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import Country from "~/components/tables/global-fields/Country";
import Region from "~/components/tables/global-fields/Region";
import District from "~/components/tables/global-fields/District";
import Settlement from "~/components/tables/global-fields/Settlement";

export const columns: ColumnDef<LocationsForTable>[] = [
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
          name={`locations[${row.index}].displayName`}
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
          name={`locations[${row.index}].description`}
          defaultValue={row.original.description}
        />
      );
    },
  },
  {
    accessorKey: "country",
    header: () => <div className="text-center">Страна</div>,
    cell: ({ row }) => {
      return (
        <Country
          defaultCountry={row.original.country}
          formValueName={`locations[${row.index}].country`}
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
          formValueName={`locations[${row.index}].region`}
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
          formValueName={`locations[${row.index}].district`}
        />
      );
    },
  },
  {
    accessorKey: "settlement",
    header: () => <div className="text-center">Населенный пункт</div>,
    cell: ({ row }) => {
      return (
        <Settlement
          defaultSettlement={row.original.settlement}
          formValueName={`locations[${row.index}].settlement`}
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
          name={`locations[${row.index}].externalLink`}
          defaultValue={row.original.externalLink}
        />
      );
    },
  },
];
