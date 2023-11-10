"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { ArtifactForTable } from '@siberiana/schemas';
import { Checkbox } from "@siberiana/ui"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader"
import FormTextArea from "~/components/tables/inputs/FormTextArea"
import Culture from "~/components/tables/artifacts/Culture"
import Materials from "~/components/tables/artifacts/Materials"
import Monument from "~/components/tables/artifacts/Monument"
import Set from "~/components/tables/artifacts/Set"
import Techniques from "~/components/tables/artifacts/Techniques"
import Projects from "~/components/tables/global-fields/Projects";
import Locations from "~/components/tables/global-fields/Locations"
import DateSelect from "~/components/tables/inputs/DateSelect"
import Status from "~/components/tables/global-fields/Status";
import PopoverDropzone from "~/components/tables/inputs/PopoverDropzone";
import FormInputText from "~/components/tables/inputs/FormInputText";
import SizesSelect from "~/components/tables/global-fields/SizesSelect";
import DatingSelect from "~/components/tables/global-fields/dating/DatingSelect";
import Persons from "~/components/tables/global-fields/Persons";
import PersonSingle from "~/components/tables/global-fields/PersonSingle";
import License from "~/components/tables/global-fields/License";
import Publications from "~/components/tables/global-fields/Publications";
import Model from "~/components/tables/artifacts/Model";

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
      return <div className="text-right font-light text-[8px] w-[1.5rem] break-words">{id}</div>
    },
  },
  {
    accessorKey: "inventoryNumber",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Инвентарный номер" className="ml-2" />
      )
    },
    cell: ({ row }) => {
      return (
        <FormInputText 
          name={`artifacts[${row.index}].inventoryNumber`} 
          defaultValue={row.original.inventoryNumber}
          className="text-center bg-transparent border-background" 
          placeholder="__"/>
      )
    },
  },
  {
    accessorKey: "kpNumber",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="КП номер" className="ml-2" />
      )
    },
    cell: ({ row }) => {
      return (
        <FormInputText 
          name={`artifacts[${row.index}].kpNumber`} 
          defaultValue={row.original.kpNumber}
          className="text-center bg-transparent border-background" 
          placeholder="__"/>
      )
    },
  },
  {
    accessorKey: "goskatalogNumber",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Госкаталог номер" className="ml-2" />
      )
    },
    cell: ({ row }) => {
      return (
        <FormInputText 
          name={`artifacts[${row.index}].goskatalogNumber`} 
          defaultValue={row.original.goskatalogNumber}
          className="text-center bg-transparent border-background" 
          placeholder="__"/>
      )
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
        <Culture defaultCulture={row.original.culturalAffiliation} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "set",
    header: () => <div className="text-center">Комплекс</div>,
    cell: ({ row }) => {
      return (
        <Set defaultSet={row.original.set} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "monument",
    header: () => <div className="text-center">Памятник</div>,
    cell: ({ row }) => {
      return (
        <Monument defaultMonument={row.original.monument} rowIndex={row.index} />
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
    accessorKey: "datingRow",
    header: () => <div className="text-center">Датировка</div>,
    cell: ({ row }) => {
      return (
        <DatingSelect 
          formValueName={`artifacts[${row.index}].datingRow`} 
          datingStringName={`artifacts[${row.index}].dating`}
          defaultDating={row.original.datingRow}
          defaultDatingString={row.original.dating}
        />
      )
    },
  },
  {
    accessorKey: "dating",
    header: () => <div className="text-center">датировка (string)</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea name={`artifacts[${row.index}].dating`} defaultValue={row.original.dating}/>
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
    accessorKey: "sizes",
    header: () => <div className="text-center">Размеры</div>,
    cell: ({ row }) => {
      return (
        <SizesSelect formValueName={`artifacts[${row.index}].sizes`} defaultValues={row.original.sizes}/>
      )
    },
  },
  {
    accessorKey: "weight",
    header: () => <div className="text-center">Вес</div>,
    cell: ({ row }) => {
      return (
        <FormInputText 
          name={`artifacts[${row.index}].weight`} 
          defaultValue={row.original.weight}
          className="text-center bg-transparent border-background" 
          placeholder="__"/>
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
        <Persons formValueName={`artifacts[${row.index}].authors`} defaultPersons={row.original.authors} />
      )
    },
  },
  {
    accessorKey: "publications",
    header: () => <div className="text-center">Публикации</div>,
    cell: ({ row }) => {
      return (
        <Publications formValueName={`artifacts[${row.index}].publications`} defaultPublications={row.original.publications} />
      )
    },
  },
  {
    accessorKey: "projects",
    header: () => <div className="text-center">Проекты</div>,
    cell: ({ row }) => {
      return (
        <Projects formValueName={`artifacts[${row.index}].projects`} defaultProjects={row.original.projects} />
      )
    },
  },
  {
    accessorKey: "donor",
    header: () => <div className="text-center">Донор</div>,
    cell: ({ row }) => {
      return (
        <PersonSingle formValueName={`artifacts[${row.index}].donor`} defaultPerson={row.original.donor} />
      )
    },
  },
  {
    accessorKey: "license",
    header: () => <div className="text-center">Лицензия</div>,
    cell: ({ row }) => {
      return (
        <License formValueName={`artifacts[${row.index}].license`} defaultLicense={row.original.license} />
      )
    },
  },
  {
    accessorKey: "model",
    header: () => <div className="text-center">3D Модель</div>,
    cell: ({ row }) => {
      return (
        <Model formValueName={`artifacts[${row.index}].model`} defaultModel={row.original.model} />
      )
    },
  },
  {
    accessorKey: "externalLink",
    header: () => <div className="text-center">Внешняя ссылка</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea name={`artifacts[${row.index}].externalLink`} defaultValue={row.original.externalLink}/>
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