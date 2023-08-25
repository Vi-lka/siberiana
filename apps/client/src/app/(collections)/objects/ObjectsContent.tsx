import { DictionarySchema } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { getObjects } from '~/lib/queries/api-collections';
import { getDictionary } from '~/lib/utils/getDictionary';
import ObjectsGrid from './ObjectsGrid';
import ObjectTypeTabs from './ObjectTypeTabs';
import PaginationControls from '~/components/ui/PaginationControls';

export default async function ObjectsContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);
    
  const defaultPageSize = 5

  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  const sort = searchParams['sort'] as string | undefined

  const page = searchParams['page'] ?? '1'
  const per = searchParams['per'] ?? defaultPageSize

  const pageArtifacts = searchParams['page_artifacts'] ?? '1'
  const perArtifacts = searchParams['per_artifacts'] ?? defaultPageSize

  const pageBooks = searchParams['page_books'] ?? '1'
  const perBooks = searchParams['per_books'] ?? defaultPageSize

  const pagePAP = searchParams['page_protected_area_pictures'] ?? '1'
  const perPAP = searchParams['per_protected_area_pictures'] ?? defaultPageSize
    
  const first = Number(per)
  const offset = (Number(page) - 1) * (Number(per))

  const firstArtifacts = Number(perArtifacts)
  const offsetArtifacts = (Number(pageArtifacts) - 1) * (Number(perArtifacts))

  const firstBooks = Number(perBooks)
  const offsetBooks = (Number(pageBooks) - 1) * (Number(perBooks))

  const firstPAP = Number(perPAP)
  const offsetPAP = (Number(pagePAP) - 1) * (Number(perPAP))
  
  const [ dataResult ] = await Promise.allSettled([ 
    getObjects({ 
      search, 
      categories, 
      collections, 
      sort, 
      first, 
      offset,
      firstArtifacts,
      offsetArtifacts,
      firstBooks,
      offsetBooks,
      firstPAP,
      offsetPAP
    }) 
  ])
  if  (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Objects" 
      notFound 
      goBack={false}
    />
  )

  const artifacts = dataResult.value.artifacts
  const books = dataResult.value.books
  const protectedAreaPictures = dataResult.value.protectedAreaPictures

  function isSingleType() {
    const allTotalCount = artifacts.totalCount + books.totalCount + protectedAreaPictures.totalCount
    
    switch (allTotalCount) {
      case artifacts.totalCount:
        return artifacts

      case books.totalCount:
        return books

      case protectedAreaPictures.totalCount:
        return protectedAreaPictures
    
      default:
        return false
    }
  } 
  const singleType = isSingleType()

  if (!!singleType) return (
    <div className='w-full'>
      <ObjectsGrid data={singleType} />

      <div className="mb-24">
        <PaginationControls
          dict={dict.pagination}
          length={singleType.totalCount}
          defaultPageSize={defaultPageSize}
          classNameMore='xl:left-[38%]'
        />
      </div>
    </div>
  )

  return (
    <ObjectTypeTabs
      artifacts={artifacts}
      books={books}
      protectedAreaPictures={protectedAreaPictures}
      dict={dictResult}
      defaultPageSize={defaultPageSize}
    />
  )
}
