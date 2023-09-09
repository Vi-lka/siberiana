import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from '~/components/ui/filters/Select';
import { getLicensesFilter } from '~/lib/queries/api-filters-books';
import { filterBooks } from '~/lib/utils/filters';
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
  const countryIds = searchParams['countryBooks'] as string | undefined
  const regionIds = searchParams['regionBooks'] as string | undefined
  const districtIds = searchParams['districtBooks'] as string | undefined
  const settlementIds = searchParams['settlementBooks'] as string | undefined
  const bookGenreIds = searchParams['bookGenre'] as string | undefined

  const [ result ] = await Promise.allSettled([ 
    getLicensesFilter({ 
      search, 
      categories, 
      collections, 
      countryIds,
      regionIds, 
      districtIds,
      settlementIds,
      bookGenreIds,
    }) 
  ])

  if (result.status === 'rejected') {
    return (
        <ErrorHandler
          error={result.reason as unknown} 
          place="Books Licenses Filter"
          notFound={false} 
        />
    )
  }

  const resultsFiltered = filterBooks(result.value, searchParams)

  return (
    <div className="flex flex-col gap-1">
      <h1 className='font-medium'>{dictResult.objects.filters.license}</h1>
      <Select 
        isMulti
        badges
        side='right'
        values={resultsFiltered} 
        param="licenseBooks"
        placeholder="Выберите лицензии"
        className="max-w-none w-full"
      />
    </div>
  )
}
