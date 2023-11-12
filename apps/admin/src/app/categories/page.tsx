import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import { getCategories } from '~/lib/queries/collections'
import UpdateCategory from './UpdateCategory'
import AddCategory from './AddCategory'
import type { CategoryForm } from '@siberiana/schemas'

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

    const dataForUpdate = result.value.edges.map((data) => {
      const node = data.node
      const {
        primaryImageURL,
        ...rest // assigns remaining
      } = node;
      
      return {
        primaryImage: {
          file: null,
          url: primaryImageURL
        },
        ...rest
      } as CategoryForm
    })
      
    return (
        <div key={Math.random()} className='font-OpenSans px-2 py-10 md:ml-[14rem]'>
            <AddCategory className='mr-6 ml-auto' />
            <div className='flex flex-wrap justify-center gap-10 mt-6'>
                {dataForUpdate.map(item => (
                    <div key={item.id} className=''>
                        <UpdateCategory {...item} />
                    </div>
                ))}
            </div>
        </div>
    )
}
