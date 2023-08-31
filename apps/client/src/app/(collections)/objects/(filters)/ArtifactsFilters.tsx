import { Separator, Skeleton } from '@siberiana/ui';
import React, { Suspense } from 'react'
import CountriesFilter from './(artifacts)/CountriesFilter';
import RegionFilter from './(artifacts)/RegionFilter';
import CultureFilter from './(artifacts)/CultureFilter';
import MonumentFilter from './(artifacts)/MonumentFilter';
import TechniqueFilter from './(artifacts)/TechniqueFilter';
import { getDictionary } from '~/lib/utils/getDictionary';
import { Dictionary } from '@siberiana/schemas';

export default async function ArtifactsFilters({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const type = searchParams['type'] as string | undefined

  const render = type === "artifacts" 

  return (
    <div className='mt-3'>
      <div className="flex flex-col gap-1">
        <h1 className='font-medium'>{dictResult.objects.filters.countries}</h1>
        <Suspense fallback={ 
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        }>
          {render
            ? <CountriesFilter searchParams={searchParams}/>
            : <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
          }
        </Suspense> 
      </div>

      <div className="flex flex-col gap-1">
        <h1 className='font-medium'>{dictResult.objects.filters.regions}</h1>
        <Suspense fallback={ 
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        }>
          {render
            ? <RegionFilter searchParams={searchParams}/>
            : <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
          }
        </Suspense> 
      </div>

      <Separator className='h-[2px] mt-1 mb-3' decorative />

      <div className="flex flex-col gap-1">
        <h1 className='font-medium'>{dictResult.objects.filters.cultures}</h1>
        <Suspense fallback={ 
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        }>
          {render
            ? <CultureFilter searchParams={searchParams}/>
            : <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
          }
        </Suspense> 
      </div>
      
      <div className="flex flex-col gap-1">
        <h1 className='font-medium'>{dictResult.objects.filters.monuments}</h1>
        <Suspense fallback={ 
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        }>
          {render
            ? <MonumentFilter searchParams={searchParams}/>
            : <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
          }
        </Suspense> 
      </div>

      <div className="flex flex-col gap-1">
        <h1 className='font-medium'>{dictResult.objects.filters.techniques}</h1>
        <Suspense fallback={ 
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        }>
          {render
            ? <TechniqueFilter searchParams={searchParams}/>
            : <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
          }
        </Suspense> 
      </div>
    </div>
  )
}
