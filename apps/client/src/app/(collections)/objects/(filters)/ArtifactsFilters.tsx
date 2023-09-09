import { Separator, Skeleton } from '@siberiana/ui';
import React, { Suspense } from 'react'
import CountriesFilter from './(artifacts)/CountriesFilter';
import RegionsFilter from './(artifacts)/RegionsFilter';
import CultureFilter from './(artifacts)/CultureFilter';
import MonumentFilter from './(artifacts)/MonumentFilter';
import TechniqueFilter from './(artifacts)/TechniqueFilter';
import DistrictsFilter from './(artifacts)/DistrictsFilter';
import SettlementsFilter from './(artifacts)/SettlementsFilter';
import SetFilter from './(artifacts)/SetFilter';
import LicensesFilter from './(artifacts)/LicensesFilter';
import { getDictionary } from '~/lib/utils/getDictionary';
import { Dictionary } from '@siberiana/schemas';

export default async function ArtifactsFilters({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  return (
    <div className='mt-3' key={Math.random()}>
      
      {/* Countries */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.countries}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <CountriesFilter searchParams={searchParams}/>
      </Suspense> 

      {/* Regions */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.regions}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <RegionsFilter searchParams={searchParams}/>
      </Suspense>

      {/* Districts */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.districts}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <DistrictsFilter searchParams={searchParams}/>
      </Suspense> 

      {/* Settlements */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.settlements}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <SettlementsFilter searchParams={searchParams}/>
      </Suspense> 
      
      <Separator className='h-[2px] mt-1 mb-3' decorative />

      {/* License */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.license}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <LicensesFilter searchParams={searchParams}/>
      </Suspense> 

      <Separator className='h-[2px] mt-1 mb-3' decorative />
    
      {/* Culture */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.cultures}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <CultureFilter searchParams={searchParams}/>
      </Suspense> 

      {/* Set */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.sets}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <SetFilter searchParams={searchParams}/>
      </Suspense> 
      
      {/* Monument */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.monuments}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <MonumentFilter searchParams={searchParams}/>
      </Suspense> 

      {/* Technique */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.techniques}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <TechniqueFilter searchParams={searchParams}/>
      </Suspense> 
    </div>
  )
}
