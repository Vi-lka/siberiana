import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from './Select';
import { getCategories } from '~/lib/queries/collections';

export default async function CategoryFilter({
  hasArtifacts,
  hasBooks,
  hasPAP
}: {
  hasArtifacts?: boolean,
  hasBooks?: boolean,
  hasPAP?: boolean
}) {

    const [ result ] = await Promise.allSettled([ 
      getCategories({ 
        first: null,
        hasArtifacts, 
        hasBooks, 
        hasPAP  
      }) 
    ])
    
    if (result.status === 'rejected') {
      return (
        <ErrorHandler
          error={result.reason as unknown} 
          place="Category Filter"
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
        <div className="flex flex-col gap-1 mb-3">
            <h1 className='font-medium'>Категории</h1>
            <Select 
                isMulti={false}
                side="bottom"
                values={resultsFiltered} 
                param="category"
                deleteParam='collection'
                placeholder="Выберите категорию" 
                className="max-w-none w-full"
            />
        </div>
    )
}
