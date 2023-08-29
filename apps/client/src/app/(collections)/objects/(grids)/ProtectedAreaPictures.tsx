import { DictionarySchema } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import ObjectsGrid from '~/components/objects/ObjectsGrid';
import { ClientHydration } from '~/components/providers/ClientHydration';
import ObjectsCounter from '~/components/providers/ObjectsCounter';
import MasonrySkeleton from '~/components/skeletons/MasonrySkeleton';
import PaginationControls from '~/components/ui/PaginationControls';
import { getProtectedAreaPictures } from '~/lib/queries/api-collections';
import { getDictionary } from '~/lib/utils/getDictionary';

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
  
  return (
    <div className="w-full">
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
  )
}
