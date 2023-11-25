"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import type { ArtifactForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";

import DatingCell from "~/components/forms/cells/DatingCell";
import FileCell from "~/components/forms/cells/FileCell";
import LargeTextCell from "~/components/forms/cells/LargeTextCell";
import ListCell from "~/components/forms/cells/ListCell";
import MultiFilesCell from "~/components/forms/cells/MultiFilesCell";
import ObjectCell from "~/components/forms/cells/ObjectCell";
import SizesCell from "~/components/forms/cells/SizesCell";
import TextCell from "~/components/forms/cells/TextCell";
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";

export const updateColumns: ColumnDef<ArtifactForTable>[] = [
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
    accessorKey: "inventoryNumber",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Инвентарный номер"
          className="ml-2"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <TextCell
          name={`artifacts[${row.index}].inventoryNumber`}
          defaultValue={row.original.inventoryNumber}
        />
      );
    },
  },
  {
    accessorKey: "kpNumber",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="КП номер"
          className="ml-2"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <TextCell
          name={`artifacts[${row.index}].kpNumber`}
          defaultValue={row.original.kpNumber}
        />
      );
    },
  },
  {
    accessorKey: "goskatalogNumber",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title="Госкаталог номер"
          className="ml-2"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <TextCell
          name={`artifacts[${row.index}].goskatalogNumber`}
          defaultValue={row.original.goskatalogNumber}
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
        <TextCell
          name={`artifacts[${row.index}].displayName`}
          defaultValue={row.original.displayName}
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
          name={`artifacts[${row.index}].primaryImage`}
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
          name={`artifacts[${row.index}].additionalImages`}
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
          name={`artifacts[${row.index}].description`}
          defaultValue={row.original.description}
        />
      );
    },
  },
  {
    accessorKey: "culturalAffiliation",
    header: () => <div className="text-center">Культура</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`artifacts[${row.index}].culturalAffiliation`}
          defaultValue={row.original.culturalAffiliation}
        />
      );
    },
  },
  {
    accessorKey: "set",
    header: () => <div className="text-center">Комплекс</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`artifacts[${row.index}].set`}
          defaultValue={row.original.set}
        />
      );
    },
  },
  {
    accessorKey: "monument",
    header: () => <div className="text-center">Памятник</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`artifacts[${row.index}].monument`}
          defaultValue={row.original.monument}
        />
      );
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center">Место находки</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`artifacts[${row.index}].location`}
          defaultValue={row.original.location}
        />
      );
    },
  },
  {
    accessorKey: "datingRow",
    header: () => <div className="text-center">Датировка</div>,
    cell: ({ row }) => {
      return (
        <DatingCell
          name={`artifacts[${row.index}].datingRow`}
          defaultValue={row.original.datingRow}
        />
      );
    },
  },
  {
    accessorKey: "dating",
    header: () => <div className="text-center">датировка (string)</div>,
    cell: ({ row }) => {
      return (
        <TextCell
          name={`artifacts[${row.index}].dating`}
          defaultValue={row.original.dating}
        />
      );
    },
  },
  {
    accessorKey: "typology",
    header: () => <div className="text-center">Типология</div>,
    cell: ({ row }) => {
      return (
        <TextCell
          name={`artifacts[${row.index}].typology`}
          defaultValue={row.original.typology}
        />
      );
    },
  },
  {
    accessorKey: "chemicalComposition",
    header: () => <div className="text-center">Химический состав</div>,
    cell: ({ row }) => {
      return (
        <TextCell
          name={`artifacts[${row.index}].chemicalComposition`}
          defaultValue={row.original.chemicalComposition}
        />
      );
    },
  },
  {
    accessorKey: "mediums",
    header: () => <div className="text-center">Материалы</div>,
    cell: ({ row }) => {
      return (
        <ListCell
          name={`artifacts[${row.index}].mediums`}
          defaultValues={row.original.mediums}
        />
      );
    },
  },
  {
    accessorKey: "techniques",
    header: () => <div className="text-center">Техники</div>,
    cell: ({ row }) => {
      return (
        <ListCell
          name={`artifacts[${row.index}].techniques`}
          defaultValues={row.original.techniques}
        />
      );
    },
  },
  {
    accessorKey: "sizes",
    header: () => <div className="min-w-[6rem] text-center">Размеры</div>,
    cell: ({ row }) => {
      return (
        <SizesCell
          name={`artifacts[${row.index}].sizes`}
          defaultValue={row.original.sizes}
        />
      );
    },
  },
  {
    accessorKey: "weight",
    header: () => <div className="text-center">Вес</div>,
    cell: ({ row }) => {
      return (
        <TextCell
          name={`artifacts[${row.index}].weight`}
          defaultValue={row.original.weight}
        />
      );
    },
  },
  {
    accessorKey: "admissionDate",
    header: () => <div className="text-center">Дата приема в фонд</div>,
    cell: ({ row }) => {
      const admissionDate = row.original.admissionDate
        ? format(new Date(row.original.admissionDate), "PPpp", { locale: ru })
        : "";
      return <div className="break-words text-center">{admissionDate}</div>;
    },
  },
  {
    accessorKey: "authors",
    header: () => <div className="text-center">Авторы работ</div>,
    cell: ({ row }) => {
      return (
        <ListCell
          name={`artifacts[${row.index}].authors`}
          defaultValues={row.original.authors}
        />
      );
    },
  },
  {
    accessorKey: "publications",
    header: () => <div className="text-center">Публикации</div>,
    cell: ({ row }) => {
      return (
        <ListCell
          name={`artifacts[${row.index}].publications`}
          defaultValues={row.original.publications}
        />
      );
    },
  },
  {
    accessorKey: "projects",
    header: () => <div className="text-center">Проекты</div>,
    cell: ({ row }) => {
      return (
        <ListCell
          name={`artifacts[${row.index}].projects`}
          defaultValues={row.original.projects}
        />
      );
    },
  },
  {
    accessorKey: "donor",
    header: () => <div className="text-center">Донор</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`artifacts[${row.index}].donor`}
          defaultValue={row.original.donor}
        />
      );
    },
  },
  {
    accessorKey: "organization",
    header: () => <div className="text-center">Организация</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`artifacts[${row.index}].organization`}
          defaultValue={row.original.organization}
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
          name={`artifacts[${row.index}].license`}
          defaultValue={row.original.license}
        />
      );
    },
  },
  {
    accessorKey: "model",
    header: () => <div className="text-center">3D Модель</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`artifacts[${row.index}].model`}
          defaultValue={row.original.model}
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
          name={`artifacts[${row.index}].externalLink`}
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

export const moderatorsUpdateColumns: ColumnDef<ArtifactForTable>[] = [
  ...updateColumns,
  {
    accessorKey: "status",
    header: () => <div className="text-center">Статус</div>,
    cell: ({ row }) => {
      return (
        <ObjectCell
          name={`artifacts[${row.index}].status`}
          defaultValue={row.original.status}
        />
      );
    },
  },
];
