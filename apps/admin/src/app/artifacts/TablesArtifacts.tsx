import { Loader2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import { ClientHydration } from '~/components/providers/ClientHydration'
import { getArtifacts } from '~/lib/queries/artifacts'
import { authOptions } from '../api/auth/[...nextauth]/route'
import DataTable from './DataTable'
import { columns, moderatorsColumns } from './columns'
import CreateTable from './CreateTable'
import getStatusName from '~/lib/utils/getStatusName'
import { getCollections } from '~/lib/queries/collections'
import type { ArtifactForTable } from '@siberiana/schemas'

export default async function TablesArtifacts({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {
    
  const session = await getServerSession(authOptions);

  const roles = session?.user.roles

  const isModerator = roles?.includes("moderator")

  const mode = searchParams['mode'] as string | undefined
  const category = searchParams['category'] as string | undefined
  const collection = searchParams['collection'] as string | undefined
    
  const results = await Promise.allSettled([ 
    getArtifacts({ 
      first: null,
      category, 
      collection,
    }),
    getCollections({ 
      first: null, 
      slug: collection,
    }) 
  ])

  // Error or no collection found
  if (results[1].status === "rejected") return (
    <ErrorHandler
      error={results[1].reason as unknown} 
      place="Artifacts"
      notFound 
      goBack
    />
  )

  const collectionFulfilled = results[1]

  const statusForModerator = {
    id: "listed",
    displayName: getStatusName("listed")
  }
  const statusForAdmin = {
    id: "draft",
    displayName: getStatusName("draft")
  }
  const dataForCreate = [
    {
      id: "random" + Math.random().toString(),
      status: isModerator ? statusForModerator : statusForAdmin,
      displayName: "",
      description: "",
      primaryImageURL: "",
      chemicalComposition: "",
      typology: "",
      weight: "",
      culturalAffiliation: null,
      set: null,
      monument: null,
      location: null,
      mediums: [],
      techniques: [
        {id: "150323855362", displayName: "скалывание"},
        {id: "150323855361", displayName: "лепка"}
      ],
      authors: [],
      publications: [],
      projects: [],
      collection: {
        id: collectionFulfilled.value.edges[0].node.id,
        displayName: collectionFulfilled.value.edges[0].node.displayName,
      },
    }
  ] as ArtifactForTable[]

  if (results[0].status === "rejected") {
    if ((results[0].reason as Error).message === 'NEXT_NOT_FOUND') {
      return (
        <div className="w-full mx-auto pt-3">
          <h1 className='flex-grow text-center text-2xl font-Inter font-semibold lg:mb-1 mb-6'>
            Добавление
          </h1> 
          <ClientHydration fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto mt-12' />}>
            <CreateTable columns={columns} moderatorsColumns={moderatorsColumns} data={dataForCreate} userRoles={roles} />
          </ClientHydration>
        </div>
      ) 
    } else return (
      <ErrorHandler
        error={results[0].reason as unknown} 
        place="Artifacts"
        notFound 
        goBack
      />
    )
  }
  
  const dataForUpdate = results[0].value.edges.map((data) => {
    const node = data.node
    const {
      status,
      collection,
      ...rest // assigns remaining
    } = node;
    const statusForTable = {
      id: status,
      displayName: getStatusName(status)
    }
    const collectionForTable = {
      id: collection.id,
      displayName: collection.displayName
    }

    return { 
      status: statusForTable,
      collection: collectionForTable,
      ...rest
    }
  })

  if (mode === 'add') return (
    <div className="w-full mx-auto pt-3">
      <h1 className='flex-grow text-center text-2xl font-Inter font-semibold lg:mb-1 mb-4'>
        Добавление
      </h1> 
      <ClientHydration fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto mt-12' />}>
        <CreateTable columns={columns} moderatorsColumns={moderatorsColumns} data={dataForCreate} userRoles={roles} hasObjectsToUpdate />
      </ClientHydration>
    </div>
  )

  return (
    <div className="w-full mx-auto pt-3">
      <h1 className='flex-grow text-center text-2xl font-Inter font-semibold lg:mb-1 mb-4'>
        Редактирование
      </h1> 
      <ClientHydration fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto mt-12' />}>
        <DataTable columns={columns} moderatorsColumns={moderatorsColumns} data={dataForUpdate} userRoles={roles} />
      </ClientHydration>
    </div>
  )
}
