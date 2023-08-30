import React from 'react'
import { ClientHydration } from '~/components/providers/ClientHydration'
import MasonrySkeleton from '~/components/skeletons/MasonrySkeleton'
import ObjectsGrid from '~/components/objects/ObjectsGrid'
import PaginationControls from '~/components/ui/PaginationControls'
import { getDictionary } from '~/lib/utils/getDictionary'
import { Dictionary } from '@siberiana/schemas'
import { getArtifacts } from '~/lib/queries/api-collections'
import ErrorHandler from '~/components/errors/ErrorHandler'
import ObjectsCounter from '~/components/providers/ObjectsCounter'

export default async function Artifacts({
  searchParams,
  defaultPageSize,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
  defaultPageSize: number
}) {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  const cultureIds = searchParams['culture'] as string | undefined
  const monumentIds = searchParams['monument'] as string | undefined
  const techniqueIds = searchParams['technique'] as string | undefined

  const sort = searchParams['sort'] as string | undefined
  const page = searchParams['page_artifacts'] ?? '1'
  const per = searchParams['per_artifacts'] ?? defaultPageSize

  const first = Number(per)
  const offset = (Number(page) - 1) * (Number(per))

  const [ dataResult ] = await Promise.allSettled([ 
    getArtifacts({ 
      first, 
      offset,
      search, 
      sort,
      categories, 
      collections,  
      cultureIds,
      monumentIds,
      techniqueIds
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
            pageParam={"page_artifacts"}
            perParam={"per_artifacts"}
          />
        </div>
      </ClientHydration>
    
      <ObjectsCounter artifactsCount={dataResult.value.totalCount} />
    </div>
  )
}