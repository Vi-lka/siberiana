import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import { columns } from '~/components/tables/artifacts/columns'
import DataTable from '~/components/tables/artifacts/data-table'
import { getArtifacts } from '~/lib/queries/artifacts'

export default async function TableArtifacts({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {
    
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
        <DataTable columns={columns} data={dataForTable} />
      </div>
    )
}
