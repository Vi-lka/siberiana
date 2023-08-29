import { DictionarySchema } from '@siberiana/schemas';
import React from 'react'
import FilterTab from '~/components/objects/FilterTab';
import { getDictionary } from '~/lib/utils/getDictionary';
import ArtifactsFilters from './ArtifactsFilters';
import BooksFilters from './BooksFilters';
import PAPFilters from './PAPFilters';
import { Separator } from '@siberiana/ui';
import GlobalFilters from './GlobalFilters';

export default async function Filters({
    searchParams,
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const dict = await getDictionary();
    const dictResult = DictionarySchema.parse(dict);

  return (
    <div className='w-full py-3 rounded-md'>
        <h1 className='font-OpenSans font-bold text-xl uppercase mb-6'>
            {dictResult.objects.filters.title}
        </h1>

        <GlobalFilters searchParams={searchParams} />

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
