import React from 'react'
import { ClientHydration } from '~/components/providers/ClientHydration'
import MasonrySkeleton from '~/components/skeletons/MasonrySkeleton'
import ObjectsGrid from '~/components/objects/ObjectsGrid'
import PaginationControls from '~/components/ui/PaginationControls'
import { getDictionary } from '~/lib/utils/getDictionary'
import { DictionarySchema } from '@siberiana/schemas'
import { getBooks } from '~/lib/queries/api-collections'
import ErrorHandler from '~/components/errors/ErrorHandler'
import ObjectsCounter from '~/components/providers/ObjectsCounter'

export default async function Books({
  searchParams,
  defaultPageSize,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
  defaultPageSize: number
}) {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  const sort = searchParams['sort'] as string | undefined
  const page = searchParams['page_books'] ?? '1'
  const per = searchParams['per_books'] ?? defaultPageSize

  const first = Number(per)
  const offset = (Number(page) - 1) * (Number(per))

  const [ dataResult ] = await Promise.allSettled([ 
      getBooks({ 
        search, 
        categories, 
        collections, 
        sort, 
        first, 
        offset
      }) 
  ])
  if  (dataResult.status === 'rejected') return (
      <>
          <ErrorHandler 
            error={dataResult.reason as unknown} 
            place="Books" 
            notFound 
            goBack={false}
          />
          <ObjectsCounter booksCount={0} />
      </>
  )

  return (
    <div className='w-full'>
      <ClientHydration fallback={
        <MasonrySkeleton />
      }>
        <ObjectsGrid data={dataResult.value} />
        
        <div className="mb-24 mt-6">
          <PaginationControls
            dict={dictResult.pagination}
            length={dataResult.value.totalCount}
            defaultPageSize={defaultPageSize}
            classNameMore='xl:left-[38%]'
            pageParam={"page_books"}
            perParam={"per_books"}
          />
        </div>
      </ClientHydration>
      
      <ObjectsCounter booksCount={dataResult.value.totalCount} />
    </div>
  )
}
