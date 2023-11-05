import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import { getCategories } from '~/lib/queries/collections'
import UpdateCategory from './UpdateCategory'
import AddCategory from './AddCategory'

export const dynamic = 'force-dynamic'

export default async function CategoriesPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const search = searchParams['search'] as string | undefined

    const [ result ] = await Promise.allSettled([ 
        getCategories({ 
          first: null,
          search,
        }) 
    ])
    if (result.status === 'rejected') {
        return (
          <ErrorHandler
            error={result.reason as unknown}
            place="Categories Page"
            notFound 
            goBack
          />
        )
    }
      
    return (
        <div key={Math.random()} className='font-OpenSans px-2 py-10 md:ml-[14rem]'>
            <AddCategory className='mr-6 ml-auto' />
            <div className='flex flex-wrap justify-center gap-10 mt-6'>
                {result.value.edges.map(edge => (
                    <div key={edge.node.id} className=''>
                        <UpdateCategory {...edge.node} />
                    </div>
                ))}
            </div>
        </div>
    )
}
