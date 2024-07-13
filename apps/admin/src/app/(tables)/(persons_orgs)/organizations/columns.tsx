"use client";

import type { ColumnDef } from "@tanstack/react-table";

import type { OrganizationsForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import OrganizationType from "~/components/tables/global-fields/OrganizationType";
import { FormSelect } from "~/components/tables/inputs/FormSelect";

export const columns: ColumnDef<OrganizationsForTable>[] = [
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
    accessorKey: "type",
    header: () => <div className="text-center">Тип</div>,
    cell: ({ row }) => {
      return (
        <OrganizationType
          defaultType={row.original.type}
          formValueName={`organizations[${row.index}].type`}
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
          title="Название"
          className="ml-2"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`organizations[${row.index}].displayName`}
          defaultValue={row.original.displayName}
        />
      );
    },
  },
  {
    accessorKey: "isInAConsortium",
    header: () => <div className="text-center">Входит в Консорциум?</div>,
    cell: ({ row }) => {
      return (
        // TODO: Create toggle form field!!!
          <div className="h-full w-full">
            <FormSelect
              defaultValue={row.original.isInAConsortium}
              itemsData={[
                { id: "yes", displayName: "Да" },
                { id: "no", displayName: "Нет" },
              ]}
              formValueName={`organizations[${row.index}].isInAConsortium`}
              haveDelete={false}
              variant="nopadding"
            />
          </div>
        // TODO: Create toggle form field!!!
      );
    },
  },
  {
    accessorKey: "address",
    header: () => <div className="text-center">Адрес</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea
          name={`organizations[${row.index}].address`}
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
        <FormTextArea
          name={`organizations[${row.index}].description`}
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
          name={`organizations[${row.index}].externalLink`}
          defaultValue={row.original.externalLink}
        />
      );
    },
  },
];
