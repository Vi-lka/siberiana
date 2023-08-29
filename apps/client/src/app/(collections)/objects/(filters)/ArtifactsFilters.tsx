import { DictionarySchema } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from '~/components/ui/filters/Select';
import { getCulturesFilter } from '~/lib/queries/api-filters';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function ArtifactsFilters({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  
  
  const [ culturesResult ] = await Promise.allSettled([ getCulturesFilter({ search, categories, collections }) ])
  if  (culturesResult.status === 'rejected') return (
    <ErrorHandler 
      error={culturesResult.reason as unknown} 
      place="Cultures Filter"
      notFound={false}
    />
  )

   // Filters data
   const cultureFilters = culturesResult.value.edges.map(el => {
    const value = el.node.id;
    const label = `${el.node.displayName} (${el.node.artifacts?.length})`;
    return { value, label };
  })

  return (
    <div className=''>
      {/* CULTURE */}
      <div className="flex flex-col gap-1 mt-3">
        <h1 className='font-semibold'>{dictResult.objects.filters.cultures}</h1>
        <Select 
            isMulti
            badges
            values={cultureFilters} 
            param="culture"
            placeholder="Выберите культуры"
            className="max-w-none w-full"
        />
      </div>
    </div>
  )
}
