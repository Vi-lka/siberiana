import { Separator, Skeleton } from '@siberiana/ui';
import React, { Suspense } from 'react'
import CountriesFilter from './(artifacts)/CountriesFilter';
import RegionsFilter from './(artifacts)/RegionsFilter';
import CultureFilter from './(artifacts)/CultureFilter';
import MonumentFilter from './(artifacts)/MonumentFilter';
import TechniqueFilter from './(artifacts)/TechniqueFilter';
import DistrictsFilter from './(artifacts)/DistrictsFilter';
import SettlementsFilter from './(artifacts)/SettlementsFilter';
import { getDictionary } from '~/lib/utils/getDictionary';
import { Dictionary } from '@siberiana/schemas';
import SetFilter from './(artifacts)/SetFilter';

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
      
      {/* Countries */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.countries}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        {render
          ? <CountriesFilter searchParams={searchParams}/>
          : (
            <div className="flex flex-col gap-1">
              <h1 className='font-medium'>{dictResult.objects.filters.countries}</h1>
              <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
            </div>
          )
        }
      </Suspense> 

      {/* Regions */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.regions}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        {render
          ? <RegionsFilter searchParams={searchParams}/>
          : (
            <div className="flex flex-col gap-1">
              <h1 className='font-medium'>{dictResult.objects.filters.regions}</h1>
              <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
            </div>
          )
        }
      </Suspense>

      {/* Districts */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.districts}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        {render
          ? <DistrictsFilter searchParams={searchParams}/>
          : (
            <div className="flex flex-col gap-1">
              <h1 className='font-medium'>{dictResult.objects.filters.districts}</h1>
              <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
            </div>
          )
        }
      </Suspense> 

      {/* Settlements */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.settlements}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        {render
          ? <SettlementsFilter searchParams={searchParams}/>
          : (
            <div className="flex flex-col gap-1">
              <h1 className='font-medium'>{dictResult.objects.filters.settlements}</h1>
              <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
            </div>
          )
        }
      </Suspense> 
      
      <Separator className='h-[2px] mt-1 mb-3' decorative />
    
      {/* Culture */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.cultures}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        {render
          ? <CultureFilter searchParams={searchParams}/>
          : (
            <div className="flex flex-col gap-1">
              <h1 className='font-medium'>{dictResult.objects.filters.cultures}</h1>
              <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
            </div>
          )
        }
      </Suspense> 

      {/* Set */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.sets}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        {render
          ? <SetFilter searchParams={searchParams}/>
          : (
            <div className="flex flex-col gap-1">
              <h1 className='font-medium'>{dictResult.objects.filters.sets}</h1>
              <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
            </div>
          )
        }
      </Suspense> 
      
      {/* Monument */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.monuments}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        {render
          ? <MonumentFilter searchParams={searchParams}/>
          : (
            <div className="flex flex-col gap-1">
              <h1 className='font-medium'>{dictResult.objects.filters.monuments}</h1>
              <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
            </div>
          )
        }
      </Suspense> 

      {/* Technique */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.techniques}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        {render
          ? <TechniqueFilter searchParams={searchParams}/>
          : (
            <div className="flex flex-col gap-1">
              <h1 className='font-medium'>{dictResult.objects.filters.techniques}</h1>
              <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
            </div>
          )
        }
      </Suspense> 
    </div>
  )
}
