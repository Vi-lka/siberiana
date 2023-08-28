import type { SortDataType } from '@siberiana/schemas';
import { DictionarySchema } from '@siberiana/schemas';
import { Filter } from 'lucide-react';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import ObjectsGrid from '~/components/objects/ObjectsGrid';
import { ClientHydration } from '~/components/providers/ClientHydration';
import ObjectsCounter from '~/components/providers/ObjectsCounter';
import MasonrySkeleton from '~/components/skeletons/MasonrySkeleton';
import PaginationControls from '~/components/ui/PaginationControls';
import Sort from '~/components/ui/filters/Sort';
import { getProtectedAreaPictures } from '~/lib/queries/api-collections';
import { getDictionary } from '~/lib/utils/getDictionary';
import ObjectsFilters from '../ObjectsFilters';

export default async function ProtectedAreaPictures({
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
  const page = searchParams['page_pap'] ?? '1'
  const per = searchParams['per_pap'] ?? defaultPageSize
  
  const first = Number(per)
  const offset = (Number(page) - 1) * (Number(per))
  
  const [ dataResult ] = await Promise.allSettled([ 
    getProtectedAreaPictures({ 
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
        place="Protected Area Pictures" 
        notFound 
        goBack={false}
      />
      <ObjectsCounter PAPCount={0} />
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
                pageParam={"page_pap"}
                perParam={"per_pap"}
              />
            </div>
          </ClientHydration>
        
          <ObjectsCounter PAPCount={dataResult.value.totalCount} />
        </div>
      </div>
    </div>
  )
}
