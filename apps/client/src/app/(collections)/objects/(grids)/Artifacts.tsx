import React from 'react'
import { ClientHydration } from '~/components/providers/ClientHydration'
import MasonrySkeleton from '~/components/skeletons/MasonrySkeleton'
import ObjectsGrid from '~/components/objects/ObjectsGrid'
import PaginationControls from '~/components/ui/PaginationControls'
import { getDictionary } from '~/lib/utils/getDictionary'
import type { SortDataType } from '@siberiana/schemas';
import { DictionarySchema } from '@siberiana/schemas'
import { getArtifacts } from '~/lib/queries/api-collections'
import ErrorHandler from '~/components/errors/ErrorHandler'
import ObjectsCounter from '~/components/providers/ObjectsCounter'
import ObjectsFilters from '../ObjectsFilters'
import { Filter } from 'lucide-react'
import Sort from '~/components/ui/filters/Sort'

export default async function Artifacts({
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
  const page = searchParams['page_artifacts'] ?? '1'
  const per = searchParams['per_artifacts'] ?? defaultPageSize

  const first = Number(per)
  const offset = (Number(page) - 1) * (Number(per))

  const [ dataResult ] = await Promise.allSettled([ 
    getArtifacts({ 
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
        place="Artifacts" 
        notFound 
        goBack={false}
      />
      <ObjectsCounter artifactsCount={0} />
    </>
  )

  const sortData = [
    { val: 'DISPLAY_NAME:ASC', text: `${dictResult.sort.byName}: ${dictResult.sort.ascText}` },
    { val: 'DISPLAY_NAME:DESC', text: `${dictResult.sort.byName}: ${dictResult.sort.descText}` },
  ] as SortDataType[]

  return (
    <div className="w-full relative">
      <div className="md:absolute right-0 top-0 flex gap-6 items-center md:justify-end justify-between md:mt-2 mt-4">
        <Filter className="md:hidden block" />
        <Sort 
          dict={dictResult.sort}
          data={sortData}
        />
      </div>

      <div className="flex gap-6 w-full justify-between md:mt-6 mb-12">
        <div className="w-1/4 bg-red-700 md:block hidden">
          <ObjectsFilters />
        </div>

        <div className='md:w-3/4 w-full md:mt-2'>
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
                pageParam={"page_artifacts"}
                perParam={"per_artifacts"}
              />
            </div>
          </ClientHydration>
        
          <ObjectsCounter artifactsCount={dataResult.value.totalCount} />
        </div>
      </div>
    </div>
  )
}
