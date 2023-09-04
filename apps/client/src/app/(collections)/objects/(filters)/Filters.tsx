import { Dictionary } from '@siberiana/schemas';
import React, { Suspense } from 'react'
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
  const dictResult = Dictionary.parse(dict);

  const type = searchParams['type'] as string | undefined

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
            <Suspense fallback={ 
              "..."
            }>
                {type === "books" 
                    ? <BooksFilters />
                    : "..." 
                }
            </Suspense> 
        </FilterTab> 

        <FilterTab value='protected_area_pictures' className='mt-3'>
            <Suspense fallback={ 
              "..."
            }>
                {type === "protected_area_pictures" 
                    ? <PAPFilters />
                    : "..." 
                }
            </Suspense> 
        </FilterTab> 
    </div>
  )
}
