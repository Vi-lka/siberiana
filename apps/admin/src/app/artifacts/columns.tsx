"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { ArtifactForTable } from '@siberiana/schemas';
import { Checkbox } from "@siberiana/ui"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader"
import FormTextArea from "~/components/tables/inputs/FormTextArea"
import Authors from "~/components/tables/artifacts/Authors"
import Cultures from "~/components/tables/artifacts/Cultures"
import Materials from "~/components/tables/artifacts/Materials"
import Monuments from "~/components/tables/artifacts/Monuments"
import Publications from "~/components/tables/artifacts/Publications"
import Sets from "~/components/tables/artifacts/Sets"
import Techniques from "~/components/tables/artifacts/Techniques"
import Projects from "~/components/tables/artifacts/Projects";
import Locations from "~/components/tables/global-fields/Locations"
import DateSelect from "~/components/tables/inputs/DateSelect"
import Status from "~/components/tables/global-fields/Status";
import PopoverDropzone from "~/components/tables/inputs/PopoverDropzone";

export const columns: ColumnDef<ArtifactForTable>[] = [
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
      return <div className="text-right font-light text-[9px] w-[2rem] break-words">{id}</div>
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
        <FormTextArea name={`artifacts[${row.index}].displayName`} defaultValue={row.original.displayName}/>
      )
    },
  },
  {
    accessorKey: "primaryImageURL",
    header: () => <div className="text-center min-w-[80px]">Фото</div>,
    cell: ({ row }) => {
      return (
        <PopoverDropzone formValueName={`artifacts[${row.index}].primaryImageURL`} bucket="default" className="px-6 py-6" /> // change later on "artifacts"
      )
    },
  },
  {
    accessorKey: "description",
    header: () => <div className="text-center">Описание</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea name={`artifacts[${row.index}].description`} defaultValue={row.original.description}/>
      )
    },
  },
  {
    accessorKey: "culturalAffiliation",
    header: () => <div className="text-center">Культура</div>,
    cell: ({ row }) => {
      return (
        <Cultures defaultCulture={row.original.culturalAffiliation} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "set",
    header: () => <div className="text-center">Комплекс</div>,
    cell: ({ row }) => {
      return (
        <Sets defaultSet={row.original.set} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "monument",
    header: () => <div className="text-center">Памятник</div>,
    cell: ({ row }) => {
      return (
        <Monuments defaultMonument={row.original.monument} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="text-center">Место находки</div>,
    cell: ({ row }) => {
      return (
        <Locations defaultLocation={row.original.location} formValueName={`artifacts[${row.index}].location`} />
      )
    },
  },
  {
    accessorKey: "typology",
    header: () => <div className="text-center">Типология</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea name={`artifacts[${row.index}].typology`} defaultValue={row.original.typology}/>
      )
    },
  },
  {
    accessorKey: "chemicalComposition",
    header: () => <div className="text-center">Химический состав</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea name={`artifacts[${row.index}].chemicalComposition`} defaultValue={row.original.chemicalComposition}/>
      )
    },
  },
  {
    accessorKey: "mediums",
    header: () => <div className="text-center">Материалы</div>,
    cell: ({ row }) => {
      return (
        <Materials defaultMaterials={row.original.mediums} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "techniques",
    header: () => <div className="text-center">Техники</div>,
    cell: ({ row }) => {
      return (
        <Techniques defaultTechniques={row.original.techniques} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "admissionDate",
    header: () => <div className="text-center">Дата приема в фонд</div>,
    cell: ({ row }) => {
      return (
        <DateSelect name={`artifacts[${row.index}].admissionDate`} placeholder="Выберите дату" defaultValue={row.original.admissionDate} />
      )
    },
  },
  {
    accessorKey: "authors",
    header: () => <div className="text-center">Авторы работ</div>,
    cell: ({ row }) => {
      return (
        <Authors defaultAuthors={row.original.authors} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "publications",
    header: () => <div className="text-center">Публикации</div>,
    cell: ({ row }) => {
      return (
        <Publications defaultPublications={row.original.publications} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "projects",
    header: () => <div className="text-center">Проекты</div>,
    cell: ({ row }) => {
      return (
        <Projects defaultProjects={row.original.projects} rowIndex={row.index} />
      )
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
    header: () => <div className="text-center">Создано at</div>,
    cell: ({ row }) => {
      const createdAt = row.original.createdAt
        ? format(row.original.createdAt, "PPP", {locale: ru})
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
    header: () => <div className="text-center">Обновлено at</div>,
    cell: ({ row }) => {
      const updatedAt = (row.original.updatedAt && row.original.updatedBy)
        ? format(row.original.updatedAt, "PPP", {locale: ru})
        : ""
      return <div className="text-center break-words">{updatedAt}</div>
    },
  },
]

export const moderatorsColumns: ColumnDef<ArtifactForTable>[] = [
  ...columns,
  {
    accessorKey: "status",
    header: () => <div className="text-center">Статус</div>,
    cell: ({ row }) => {
      return <Status defaultStatus={row.original.status} formValueName={`artifacts[${row.index}].status`} />
    },
  },
]