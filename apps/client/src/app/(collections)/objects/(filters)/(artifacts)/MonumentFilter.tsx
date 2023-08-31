import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from '~/components/ui/filters/Select';
import { getMonumentsFilter } from '~/lib/queries/api-filters-artifacts';
import { filterArtifacts } from '~/lib/utils/filters';

export default async function MonumentFilter({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const search = searchParams['search'] as string | undefined
    const categories = searchParams['category'] as string | undefined
    const collections = searchParams['collection'] as string | undefined
    const countryIds = searchParams['country'] as string | undefined
    const regionIds = searchParams['region'] as string | undefined
    const cultureIds = searchParams['culture'] as string | undefined
    const techniqueIds = searchParams['technique'] as string | undefined

    const [ result ] = await Promise.allSettled([ 
        getMonumentsFilter({ 
            search, 
            categories, 
            collections, 
            countryIds, 
            regionIds, 
            cultureIds, 
            techniqueIds 
        }) 
    ])

    if (result.status === 'rejected') {
        return (
            <>
                <ErrorHandler
                    error={result.reason as unknown} 
                    place="Artifacts Region Filters"
                    notFound={false} 
                />
                <Select 
                    isMulti
                    badges
                    side='right'
                    values={null} 
                    param="monument"
                    placeholder="Не найдено"
                    className="max-w-none w-full"
                />
            </>
        )
    }

    const resultsFiltered = filterArtifacts(result.value, searchParams)

    return (
        <Select 
            isMulti
            badges
            side='right'
            values={resultsFiltered} 
            param="monument"
            placeholder="Выберите памятники"
            className="max-w-none w-full"
        />
    )
}
