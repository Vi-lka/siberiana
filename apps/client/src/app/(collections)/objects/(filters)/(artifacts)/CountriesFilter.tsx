import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from '~/components/ui/filters/Select';
import { getArtiCountriesFilter } from '~/lib/queries/api-filters-locations';
import { filterArtifacts } from '~/lib/utils/filters';

export default async function CountriesFilter({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  const regionIds = searchParams['region'] as string | undefined
  const cultureIds = searchParams['culture'] as string | undefined
  const monumentIds = searchParams['monument'] as string | undefined
  const techniqueIds = searchParams['technique'] as string | undefined

  const [ result ] = await Promise.allSettled([ 
    getArtiCountriesFilter({ 
      search, 
      categories, 
      collections, 
      regionIds, 
      cultureIds, 
      monumentIds, 
      techniqueIds 
    }) 
  ])

  if (result.status === 'rejected') {
    return (
        <>
            <ErrorHandler
              error={result.reason as unknown} 
              place="Artifacts Region Filters"
              notFound={false} 
            />
            <Select 
              isMulti
              badges
              side='right'
              values={null} 
              param="country"
              placeholder="Не найдено"
              className="max-w-none w-full"
            />
        </>
    )
}

  const resultsFiltered = filterArtifacts(result.value, searchParams)

  return (
    <Select 
      isMulti
      badges
      side='right'
      values={resultsFiltered} 
      param="country"
      placeholder="Выберите страны"
      className="max-w-none w-full"
    />
  )
}
