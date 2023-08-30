import type { Categories, Collections } from '@siberiana/schemas';
import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from '~/components/ui/filters/Select';
import { getCategories, getCollections } from '~/lib/queries/api-collections';
import getColor from '~/lib/utils/getColor';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function GlobalFilters({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);

    const categories = searchParams['category'] as string | undefined

    const results = await Promise.allSettled([ 
        getCategories({ first: null }),
        getCollections({ first: null, categories })
    ])
    
    const rejected = results.find(elem => elem.status === "rejected") as PromiseRejectedResult;
    
    if (rejected) {
      return (
        <ErrorHandler
          error={rejected.reason as unknown} 
          place="Titles in Objects"
          notFound 
          goBack
        />
      )
    }
    
    const categoriesFulfilled = results[0] as PromiseFulfilledResult<Categories>
    const collectionsFulfilled = results[1] as PromiseFulfilledResult<Collections>

    // Filters data
    const categoryFilters = categoriesFulfilled.value.edges.map(el => {
        const value = el.node.slug;
        const label = el.node.displayName;
        return { value, label };
    })

    const collectionFilters = collectionsFulfilled.value.edges.map((el, index) => {
        const value = el.node.slug;
        const label = el.node.displayName;
        const color = getColor(index);
        return { value, label, color };
    })

  return (
    <>
        {/* CATEGORIES */}
        <div className="flex flex-col gap-1">
            <h1 className='font-medium'>{dictResult.objects.filters.categories}</h1>
            <Select 
                isMulti={false}
                side='right'
                values={categoryFilters} 
                param="category"
                placeholder="Выберите категорию" 
                className="max-w-none w-full"
                deleteParams='collection'
            />
        </div>
        {/* COLLECTIONS */}
        <div className="flex flex-col gap-1 mt-3">
            <h1 className='font-medium'>{dictResult.objects.filters.collections}</h1>
            <Select 
                isMulti
                badges
                side='right'
                values={collectionFilters} 
                param="collection"
                placeholder="Выберите коллекции" 
                className="max-w-none w-full"
            />
        </div>
    </>
  )
}
