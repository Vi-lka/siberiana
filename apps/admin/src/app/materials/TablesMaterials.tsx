import { Loader2 } from 'lucide-react'
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import { ClientHydration } from '~/components/providers/ClientHydration'
import { getMaterials } from '~/lib/queries/artifacts'
import UpdateTable from './UpdateTable'
import CreateTable from './CreateTable'
import type { MaterialForTable } from '@siberiana/schemas'
import { columns, updateColumns } from './columns'

export default async function TablesMaterials({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

  const mode = searchParams['mode'] as string | undefined
    
  const [ dataResult ] = await Promise.allSettled([ 
    getMaterials({ 
      first: null,
    }),
  ])

  const dataForCreate = [
    {
      id: "random" + Math.random().toString(),
      displayName: "",
      description: "",
      externalLink: ""
    }
  ] as MaterialForTable[]

  if (dataResult.status === "rejected") {
    if ((dataResult.reason as Error).message === 'NEXT_NOT_FOUND') {
      return (
        <div className="w-full mx-auto pt-3">
          <h1 className='flex-grow text-center text-2xl font-Inter font-semibold lg:mb-1 mb-6'>
            Добавление
          </h1> 
          <ClientHydration fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto mt-12' />}>
            <CreateTable columns={columns} data={dataForCreate} />
          </ClientHydration>
        </div>
      ) 
    } else return (
      <ErrorHandler
        error={dataResult.reason as unknown} 
        place="Materials"
        notFound 
        goBack
      />
    )
  }
  
  const dataForUpdate = dataResult.value.edges.map((data) => {
    const node = data.node
    const {
      artifacts,
      ...rest // assigns remaining
    } = node;

    const artifactsForTable = artifacts.length

    return { 
      artifacts: artifactsForTable,
      ...rest
    } as MaterialForTable
  })

  if (mode === 'add') return (
    <div className="w-full mx-auto pt-3">
      <h1 className='flex-grow text-center text-2xl font-Inter font-semibold lg:mb-1 mb-4'>
        Добавление
      </h1> 
      <ClientHydration fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto mt-12' />}>
        <CreateTable columns={columns} data={dataForCreate} hasObjectsToUpdate />
      </ClientHydration>
    </div>
  )

  return (
    <div className="w-full mx-auto pt-3">
      <h1 className='flex-grow text-center text-2xl font-Inter font-semibold lg:mb-1 mb-4'>
        Редактирование
      </h1> 
      <ClientHydration fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto mt-12' />}>
        <UpdateTable columns={updateColumns} data={dataForUpdate} />
      </ClientHydration>
    </div>
  )
}
