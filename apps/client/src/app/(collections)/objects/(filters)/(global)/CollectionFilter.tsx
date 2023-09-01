import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from '~/components/ui/filters/Select';
import { getCollections } from '~/lib/queries/api-collections';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function CollectionFilter({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);

    const categories = searchParams['category'] as string | undefined

    const [ result ] = await Promise.allSettled([ getCollections({ first: null, categories }) ])
    
    if (result.status === 'rejected') {
      return (
        <ErrorHandler
          error={result.reason as unknown} 
          place="Collection Filter"
          notFound 
          goBack
        />
      )
    }

    const resultsFiltered = result.value.edges.map(el => {
        const value = el.node.slug;
        const label = el.node.displayName;
        return { value, label };
    })

    return (
        <div className="flex flex-col gap-1">
            <h1 className='font-medium'>{dictResult.objects.filters.collections}</h1>
            <Select 
                isMulti
                badges
                side='right'
                values={resultsFiltered} 
                param="collection"
                placeholder="Выберите коллекции" 
                className="max-w-none w-full"
            />
        </div>
    )
}
