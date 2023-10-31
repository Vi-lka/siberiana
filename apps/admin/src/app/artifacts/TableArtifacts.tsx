import { Loader2 } from 'lucide-react'
import { getServerSession } from 'next-auth'
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import { ClientHydration } from '~/components/providers/ClientHydration'
import { getArtifacts } from '~/lib/queries/artifacts'
import { authOptions } from '../api/auth/[...nextauth]/route'
import DataTable from './DataTable'
import { columns } from './columns'

export default async function TableArtifacts({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {
    
  const session = await getServerSession(authOptions);

  const roles = session?.user.roles

  const search = searchParams['search'] as string | undefined

  const category = searchParams['category'] as string | undefined
  const collection = searchParams['collection'] as string | undefined
    
  const sort = searchParams['sort'] as string | undefined
    
  const [ dataResult ] = await Promise.allSettled([ 
    getArtifacts({ 
      first: null, 
      search, 
      sort,
      category, 
      collection,
    }) 
  ])
  if (dataResult.status === 'rejected') return (
    <>
      <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="Artifacts" 
        notFound 
        goBack
      />
    </>
  )
  
  const dataForTable = dataResult.value.edges.map((data) => {
    return data.node
  })

  return (
    <div className="w-full mx-auto pt-3">
      <ClientHydration fallback={<Loader2 className='animate-spin w-12 h-12 mx-auto' />}>
        <DataTable columns={columns} data={dataForTable} userRoles={roles} />
      </ClientHydration>
    </div>
  )
}
