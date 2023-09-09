import { Dictionary } from '@siberiana/schemas';
import { Separator, Skeleton } from '@siberiana/ui';
import React, { Suspense } from 'react'
import { getDictionary } from '~/lib/utils/getDictionary';
import CountriesFilter from './(books)/CountriesFilter';
import RegionsFilter from './(books)/RegionsFilter';
import DistrictsFilter from './(books)/DistrictsFilter';
import SettlementsFilter from './(books)/SettlementsFilter';
import LicensesFilter from './(books)/LicensesFilter';
import BookGenreFilter from './(books)/BookGenreFilter';

export default async function BooksFilters({
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
      

      {/* Book Genre */}
      <Suspense fallback={ 
        <div className="flex flex-col gap-1">
          <h1 className='font-medium'>{dictResult.objects.filters.bookGenre}</h1>
          <Skeleton className='w-full h-10 py-2 px-4 mb-3' />
        </div>
      }>
        <BookGenreFilter searchParams={searchParams}/>
      </Suspense> 
    </div>
  )
}
