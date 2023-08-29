import { DictionarySchema } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import FilterTab from '~/components/objects/FilterTab';
import { Select } from '~/components/ui/filters/Select';
import { getCategories, getCollections } from '~/lib/queries/api-collections'
import getColor from '~/lib/utils/getColor';
import { getDictionary } from '~/lib/utils/getDictionary';
import ArtifactsFilters from './ArtifactsFilters';
import BooksFilters from './BooksFilters';
import PAPFilters from './PAPFilters';
import { Separator } from '@siberiana/ui';

export default async function Filters({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const dict = await getDictionary();
    const dictResult = DictionarySchema.parse(dict);

    const categories = searchParams['category'] as string | undefined
    // const collections = searchParams['collection'] as string | undefined

    const [ categoriesResult, collectionsResult ] = await Promise.allSettled([ 
        getCategories({ first: null }),
        getCollections({ first: null, categories })
    ])
    if (categoriesResult.status === 'rejected') return (
        <ErrorHandler 
            error={categoriesResult.reason as unknown} 
            place="Categories Filter in Objects"
            notFound 
            goBack
        />
    )
    if (collectionsResult.status === 'rejected') return (
        <ErrorHandler 
            error={collectionsResult.reason as unknown} 
            place="Collections Filter in Objects" 
            notFound 
            goBack
        />
    )

    // Filters data
    const categoryFilters = categoriesResult.value.edges.map(el => {
        const value = el.node.slug;
        const label = el.node.displayName;
        return { value, label };
    })

    const collectionFilters = collectionsResult.value.edges.map((el, index) => {
        const value = el.node.slug;
        const label = el.node.displayName;
        const color = getColor(index);
        return { value, label, color };
    })

  return (
    <div className='w-full p-3 rounded-md'>
        <h1 className='font-OpenSans font-bold text-lg uppercase mb-6'>
            {dictResult.objects.filters.title}
        </h1>

        {/* CATEGORIES */}
        <div className="flex flex-col gap-1">
            <h1>{dictResult.objects.filters.categories}</h1>
            <Select 
                isMulti={false}
                values={categoryFilters} 
                param="category"
                placeholder="Выберите категорию" 
                className="max-w-none w-full"
                deleteParams='collection'
            />
        </div>

         {/* COLLECTIONS */}
         <div className="flex flex-col gap-1 mt-3">
            <h1>{dictResult.objects.filters.collections}</h1>
            <Select 
                isMulti
                badges
                values={collectionFilters} 
                param="collection"
                placeholder="Выберите коллекции" 
                className="max-w-none w-full"
            />
        </div>

        <Separator className='h-[2px] mt-1' decorative />

        <FilterTab value='artifacts' className='mt-3'>
            <ArtifactsFilters searchParams={searchParams} />
        </FilterTab> 

        <FilterTab value='books' className='mt-3'>
            <BooksFilters searchParams={searchParams} />
        </FilterTab> 

        <FilterTab value='protected_area_pictures' className='mt-3'>
            <PAPFilters searchParams={searchParams} />
        </FilterTab> 
    </div>
  )
}
