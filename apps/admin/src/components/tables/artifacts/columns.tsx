"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { ArtifactById } from '@siberiana/schemas'
import { DataTableColumnHeader } from "../DataTableColumnHeader"
import Image from "next/image"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@siberiana/ui"
import FormInputText from "../FormInputText"

export const columns: ColumnDef<ArtifactById>[] = [
  // {
  //   accessorKey: "id",
  //   header: () => <div className="text-center">ID</div>,
  //   cell: ({ row }) => {
  //     const id = parseFloat(row.getValue("id"))
  //     return <div className="text-right font-light text-[9px] w-[2rem] break-words">{id}</div>
  //   },
  // },
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
        <FormInputText name={`artifacts[${row.index}].displayName`} value={name} />
      )
    },
  },
  {
    accessorKey: "primaryImageURL",
    header: () => <div className="text-center">Фото</div>,
    cell: ({ row }) => {
      const image = row.original.primaryImageURL
      return (
        <HoverCard openDelay={200} closeDelay={150}>
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
          ? (<p className="min-w-[18rem] max-w-[25rem]">{text}</p>) 
          : "__"
      )
    },
  },
  {
    accessorKey: "culturalAffiliation.displayName",
    header: () => <div className="text-xs">Культура</div>,
    cell: ({ row }) => {
      const text = row.original.culturalAffiliation?.displayName
      return (
        (!!text && text.length > 0) ? text : "__"
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
    accessorKey: "holders",
    header: () => <div className="text-xs">Музей/Держатель</div>,
    cell: ({ row }) => {
      const holders = row.original.holders
      return (
        (holders.length > 0) 
          ? (
            <div>
              {
                holders.map((holder, index) => (
                  <div key={index} className="min-w-[10rem]">
                  {!!holder.organization ? <p className="mb-2">{holder.organization.displayName}</p> : null}
                  {!!holder.person ? <p className="">{holder.person.displayName}</p> : null}
                  </div>
                ))
              }
            </div>
          ) 
          : "__"
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
