"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { ArtifactById } from '@siberiana/schemas'
import { DataTableColumnHeader } from "../DataTableColumnHeader"
import Image from "next/image"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@siberiana/ui"
import FormTextArea from "../inputs/FormTextArea"
import Cultures from "./fields/Cultures"
import Sets from "./fields/Sets"
import Monuments from "./fields/Monuments"
import Materials from "./fields/Materials"
import Techniques from "./fields/Techniques"
import Authors from "./fields/Authors"
import Publications from "./fields/Publications"
import Projects from "./fields/Projects"
import DateSelect from "../inputs/DateSelect"
import Locations from "../global-fields/Locations"

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
    header: ({ column }) => {
      return (
        <DataTableColumnHeader column={column} title="Название" className="ml-2" />
      )
    },
    cell: ({ row }) => {
      return (
        <FormTextArea name={`artifacts[${row.index}].displayName`}/>
      )
    },
  },
  {
    accessorKey: "primaryImageURL",
    header: () => <div className="text-center">Фото</div>,
    cell: ({ row }) => {
      const image = row.original.primaryImageURL
      return (
        <HoverCard openDelay={100} closeDelay={100}>
          <HoverCardTrigger>
            <Image 
              src={image} 
              alt={image} 
              width={30}
              height={30}
            />
          </HoverCardTrigger>
          <HoverCardContent side="right">
            <Image 
              src={image} 
              alt={image} 
              width={180}
              height={180}
              className="object-contain mx-auto"
            />
          </HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: "description",
    header: "Описание",
    cell: ({ row }) => {
      return (
        <FormTextArea name={`artifacts[${row.index}].description`}/>
      )
    },
  },
  {
    accessorKey: "culturalAffiliation",
    header: () => <div className="text-xs">Культура</div>,
    cell: ({ row }) => {
      return (
        <Cultures defaultCulture={row.original.culturalAffiliation} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "set",
    header: () => <div className="text-xs">Комплекс</div>,
    cell: ({ row }) => {
      return (
        <Sets defaultSet={row.original.set} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "monument",
    header: () => <div className="text-xs">Памятник</div>,
    cell: ({ row }) => {
      return (
        <Monuments defaultMonument={row.original.monument} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "location",
    header: () => <div className="text-xs">Место находки</div>,
    cell: ({ row }) => {
      return (
        <Locations defaultLocation={row.original.location} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "typology",
    header: () => <div className="text-xs">Типология</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea name={`artifacts[${row.index}].typology`}/>
      )
    },
  },
  {
    accessorKey: "chemicalComposition",
    header: () => <div className="text-xs">Химический состав</div>,
    cell: ({ row }) => {
      return (
        <FormTextArea name={`artifacts[${row.index}].chemicalComposition`}/>
      )
    },
  },
  {
    accessorKey: "mediums",
    header: () => <div className="text-xs">Материал</div>,
    cell: ({ row }) => {
      return (
        <Materials defaultMaterials={row.original.mediums} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "techniques",
    header: () => <div className="text-xs">Техники</div>,
    cell: ({ row }) => {
      return (
        <Techniques defaultTechniques={row.original.techniques} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "admissionDate",
    header: () => <div className="text-xs">Дата приема в фонд</div>,
    cell: ({ row }) => {
      return (
        <DateSelect name={`artifacts[${row.index}].admissionDate`} placeholder="Выберите дату" />
      )
    },
  },
  {
    accessorKey: "authors",
    header: () => <div className="text-xs">Авторы работ</div>,
    cell: ({ row }) => {
      return (
        <Authors defaultAuthors={row.original.authors} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "publications",
    header: () => <div className="text-xs">Публикации</div>,
    cell: ({ row }) => {
      return (
        <Publications defaultPublications={row.original.publications} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "projects",
    header: () => <div className="text-xs">Проекты</div>,
    cell: ({ row }) => {
      return (
        <Projects defaultProjects={row.original.projects} rowIndex={row.index} />
      )
    },
  },
]
