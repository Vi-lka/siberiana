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
      const name = row.original.displayName
      return (
        <FormTextArea name={`artifacts[${row.index}].displayName`} value={name}/>
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
      const text = row.original.description
      return (
        text.length > 0 
          ? (<FormTextArea name={`artifacts[${row.index}].description`} value={text}/>) 
          : "__"
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
    accessorKey: "location.displayName",
    header: () => <div className="text-xs">Место находки</div>,
    cell: ({ row }) => {
      const location = row.original.location
      return (
        (!!location) 
          ? (
            <div className="min-w-[10rem]">
              {location.country 
                ? (<p><span className="font-medium">Страна:</span> {location.country.displayName}</p>) 
                : null
              }
              {location.region 
                ? (<p><span className="font-medium">Регион:</span> {location.region.displayName}</p>) 
                : null
              }
              {location.district 
                ? (<p><span className="font-medium">Район:</span> {location.district.displayName}</p>) 
                : null
              }
              {location.settlement 
                ? (<p><span className="font-medium">Нас. пункт:</span> {location.settlement.displayName}</p>) 
                : null
              }
              {location.displayName.length > 0 
                ? (<p><span className="font-medium">Локация:</span> {location.displayName}</p>) 
                : null
              }
            </div>
          ) 
          : "__"
      )
    },
  },
  {
    accessorKey: "typology",
    header: () => <div className="text-xs">Типология</div>,
    cell: ({ row }) => {
      const name = row.original.typology
      return (
        <FormTextArea name={`artifacts[${row.index}].typology`} value={name}/>
      )
    },
  },
  {
    accessorKey: "chemicalComposition",
    header: () => <div className="text-xs">Химический состав</div>,
    cell: ({ row }) => {
      const name = row.original.chemicalComposition
      return (
        <FormTextArea name={`artifacts[${row.index}].chemicalComposition`} value={name}/>
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
      const text = row.original.admissionDate
      return (
        (!!text && text.length > 0) ? text : "__"
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
