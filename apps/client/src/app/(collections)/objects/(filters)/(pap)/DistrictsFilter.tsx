import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from '~/components/ui/filters/Select';
import { getPAPDistrictsFilter } from '~/lib/queries/api-filters-locations';
import { filterProtectedAreaPictures } from '~/lib/utils/filters';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function DistrictsFilter({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);

    const search = searchParams['search'] as string | undefined
    const categories = searchParams['category'] as string | undefined
    const collections = searchParams['collection'] as string | undefined
    const countryIds = searchParams['countryPAP'] as string | undefined
    const regionIds = searchParams['regionPAP'] as string | undefined
    const settlementIds = searchParams['settlementPAP'] as string | undefined
    const licenseIds = searchParams['licensePAP'] as string | undefined
    const protectedAreaIds = searchParams['protectedArea'] as string | undefined
    const protectedAreaCategoryIds = searchParams['protectedAreaCategory'] as string | undefined

    const [ result ] = await Promise.allSettled([ 
        getPAPDistrictsFilter({ 
            search, 
            categories, 
            collections, 
            countryIds, 
            regionIds,
            settlementIds,
            protectedAreaIds, 
            protectedAreaCategoryIds,
            licenseIds
        }) 
    ])

    if (result.status === 'rejected') {
        return (
            <ErrorHandler
              error={result.reason as unknown} 
              place="PAP Districts Filter"
              notFound={false} 
            />
        )
    }

    const resultsFiltered = filterProtectedAreaPictures(result.value, searchParams)

    return (
        <div className="flex flex-col gap-1">
            <h1 className='font-medium'>{dictResult.objects.filters.districts}</h1>
            <Select 
                isMulti
                badges
                side='right'
                values={resultsFiltered} 
                param="districtPAP"
                placeholder="Выберите регионы"
                className="max-w-none w-full"
            />
        </div>
    )
}
