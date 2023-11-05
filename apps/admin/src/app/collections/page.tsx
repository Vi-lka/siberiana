import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import { getCollections } from '~/lib/queries/collections'
import AddCollection from './AddCollection'
import UpdateCollection from './UpdateCollection'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const search = searchParams['search'] as string | undefined

    const [ result ] = await Promise.allSettled([ 
        getCollections({ 
          first: null,
          search,
        }) 
    ])
    if (result.status === 'rejected') {
        return (
          <ErrorHandler
            error={result.reason as unknown}
            place="Collections Page"
            notFound 
            goBack
          />
        )
    }
      
    return (
        <div key={Math.random()} className='font-OpenSans px-2 py-10 md:ml-[14rem]'>
            <AddCollection className='mr-6 ml-auto' />
            <div className='flex flex-wrap justify-center gap-10 mt-6'>
                {result.value.edges.map(edge => (
                    <div key={edge.node.id} className=''>
                        <UpdateCollection {...edge.node} />
                    </div>
                ))}
            </div>
        </div>
    )
}
