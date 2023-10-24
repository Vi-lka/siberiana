import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from './Select';
import { getCollections } from '~/lib/queries/collections';

export default async function CollectionFilter({
    searchParams,
    hasArtifacts,
    hasBooks,
    hasPAP
}: {
    searchParams: { [key: string]: string | string[] | undefined },
    hasArtifacts?: boolean,
    hasBooks?: boolean,
    hasPAP?: boolean
}) {

    const categories = searchParams['category'] as string | undefined

    const [ result ] = await Promise.allSettled([ 
        getCollections({ 
            first: null, 
            categories, 
            hasArtifacts, 
            hasBooks, 
            hasPAP 
        }) 
    ])
    
    if (result.status === 'rejected') {
      return (
        <ErrorHandler
          error={result.reason as unknown} 
          place="Collection Filter"
          notFound 
          goBack
        />
      )
    }

    const resultsFiltered = result.value.edges.map(el => {
        const value = el.node.slug;
        const label = el.node.displayName;
        return { value, label };
    })

    return (
        <div className="flex flex-col gap-1">
            <h1 className='font-medium'>Коллекции</h1>
            <Select 
                isMulti
                badges
                side='bottom'
                values={resultsFiltered} 
                param="collection"
                placeholder="Выберите коллекции" 
                className="max-w-none w-full"
            />
        </div>
    )
}
