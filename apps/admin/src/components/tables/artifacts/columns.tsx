"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { ArtifactById } from '@siberiana/schemas'
import { DataTableColumnHeader } from "../DataTableColumnHeader"
import Image from "next/image"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@siberiana/ui"
import FormTextArea from "../inputs/FormTextArea"
import Cultures from "./Cultures"

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
    accessorKey: "culturalAffiliation.displayName",
    header: () => <div className="text-xs">Культура</div>,
    cell: ({ row }) => {
      const value = row.original.culturalAffiliation ? row.original.culturalAffiliation.id : ""
      const label = row.original.culturalAffiliation ? row.original.culturalAffiliation.displayName : "__"
      return (
        <Cultures defaultCulture={{ value, label }} rowIndex={row.index} />
      )
    },
  },
  {
    accessorKey: "set.displayName",
    header: () => <div className="text-xs">Комплекс</div>,
    cell: ({ row }) => {
      const text = row.original.set?.displayName
      return (
        (!!text && text.length > 0) ? text : "__"
      )
    },
  },
  {
    accessorKey: "monument.displayName",
    header: () => <div className="text-xs">Памятник</div>,
    cell: ({ row }) => {
      const text = row.original.monument?.displayName
      return (
        (!!text && text.length > 0) ? text : "__"
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
      const text = row.original.typology
      return (
        text.length > 0 ? text : "__"
      )
    },
  },
  {
    accessorKey: "chemicalComposition",
    header: () => <div className="text-xs">Химический состав</div>,
    cell: ({ row }) => {
      const text = row.original.chemicalComposition
      return (
        text.length > 0 ? text : "__"
      )
    },
  },
  {
    accessorKey: "mediums",
    header: () => <div className="text-xs">Материал</div>,
    cell: ({ row }) => {
      const mediums = row.original.mediums
      return (
        (mediums.length > 0) 
        ? (
            mediums.map((medium, index) => (
              <p key={index} className="min-w-[5rem]">{medium.displayName}</p>
            ))
        ) 
        : "__"
      )
    },
  },
  {
    accessorKey: "techniques",
    header: () => <div className="text-xs">Техники</div>,
    cell: ({ row }) => {
      const techniques = row.original.techniques
      return (
        (techniques.length > 0) 
        ? (
            techniques.map((technique, index) => (
              <p key={index} className="min-w-[5rem]">{technique.displayName}</p>
            ))
        ) 
        : "__"
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
      const authors = row.original.authors
      return (
        (authors.length > 0) 
        ? (
          authors.map((author, index) => (
              <p key={index} className="min-w-[8rem]">{author.displayName}</p>
            ))
        ) 
        : "__"
      )
    },
  },
  {
    accessorKey: "publications",
    header: () => <div className="text-xs">Публикации</div>,
    cell: ({ row }) => {
      const publications = row.original.publications
      return (
        (publications.length > 0) 
        ? (
          publications.map((publication, index) => (
              <p key={index} className="min-w-[10rem]">{publication.displayName}</p>
            ))
        ) 
        : "__"
      )
    },
  },
  {
    accessorKey: "projects",
    header: () => <div className="text-xs">Проекты</div>,
    cell: ({ row }) => {
      const projects = row.original.projects
      return (
        (projects.length > 0) 
        ? (
          projects.map((project, index) => (
              <p key={index} className="min-w-[10rem]">{project.displayName}</p>
            ))
        ) 
        : "__"
      )
    },
  },
]
