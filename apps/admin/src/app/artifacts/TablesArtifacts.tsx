import { Loader2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import { ClientHydration } from '~/components/providers/ClientHydration'
import { getArtifacts } from '~/lib/queries/artifacts'
import { authOptions } from '../api/auth/[...nextauth]/route'
import UpdateTable from './UpdateTable'
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
      primaryImage: {
        file: undefined,
        url: ""
      },
      chemicalComposition: "",
      inventoryNumber: "",
      kpNumber: "",
      goskatalogNumber: "",
      externalLink: "",
      typology: "",
      weight: "",
      admissionDate: undefined,
      sizes: {
        width: 0,
        height: 0,
        length: 0,
        depth: 0,
        diameter: 0,
      },
      datingRow: {
        datingStart: 0,
        datingEnd: 0,
      },
      donor: null,
      model: null,
      license: null,
      culturalAffiliation: null,
      set: null,
      monument: null,
      location: null,
      mediums: [],
      techniques: [],
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
      primaryImageURL,
      collection,
      location,
      country,
      region,
      district,
      settlement,
      width,
      height,
      length,
      depth,
      diameter,
      datingStart,
      datingEnd,
      ...rest // assigns remaining
    } = node;

    const locationForTabel = location
      ? { ...location, type: "location" }
      : settlement 
        ? { ...settlement, type: "settlement" }
        : district
          ? { ...district, type: "district" }
          : region
            ? { ...region, type: "region" }
            : country
              ? { ...country, type: "country" }
              : null

    return { 
      status: {
        id: status,
        displayName: getStatusName(status)
      },
      primaryImage: {
        file: null,
        url: primaryImageURL
      },
      collection: {
        id: collection.id,
        displayName: collection.displayName
      },
      location: locationForTabel,
      sizes: {
        width,
        height,
        length,
        depth,
        diameter,
      },
      datingRow: {
        datingStart,
        datingEnd
      },
      ...rest
    } as ArtifactForTable
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
        <UpdateTable columns={columns} moderatorsColumns={moderatorsColumns} data={dataForUpdate} userRoles={roles} />
      </ClientHydration>
    </div>
  )
}
