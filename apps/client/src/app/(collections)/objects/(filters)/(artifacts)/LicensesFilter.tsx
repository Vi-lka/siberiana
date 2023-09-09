import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from '~/components/ui/filters/Select';
import { getLicensesFilter } from '~/lib/queries/api-filters-artifacts';
import { filterArtifacts } from '~/lib/utils/filters';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function LicensesFilter({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const search = searchParams['search'] as string | undefined

  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  
  const countryIds = searchParams['countryArtifacts'] as string | undefined
  const regionIds = searchParams['regionArtifacts'] as string | undefined
  const districtIds = searchParams['districtArtifacts'] as string | undefined
  const settlementIds = searchParams['settlementArtifacts'] as string | undefined
  
  const cultureIds = searchParams['culture'] as string | undefined
  const setIds = searchParams['set'] as string | undefined
  const monumentIds = searchParams['monument'] as string | undefined
  const techniqueIds = searchParams['technique'] as string | undefined

  const [ result ] = await Promise.allSettled([ 
    getLicensesFilter({ 
      search, 
      categories, 
      collections, 
      countryIds,
      regionIds, 
      districtIds,
      settlementIds,
      cultureIds,
      setIds,
      monumentIds,
      techniqueIds
    }) 
  ])

  if (result.status === 'rejected') {
    return (
        <ErrorHandler
          error={result.reason as unknown} 
          place="Artifacts Licenses Filter"
          notFound={false} 
        />
    )
  }

  const resultsFiltered = filterArtifacts(result.value, searchParams)

  return (
    <div className="flex flex-col gap-1">
      <h1 className='font-medium'>{dictResult.objects.filters.license}</h1>
      <Select 
        isMulti
        badges
        side='right'
        values={resultsFiltered} 
        param="licenseArtifacts"
        placeholder="Выберите лицензии"
        className="max-w-none w-full"
      />
    </div>
  )
}
