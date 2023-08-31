import type { ArtiFilters } from '@siberiana/schemas';
import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { Select } from '~/components/ui/filters/Select';
import { getCulturesFilter, getMonumentsFilter, getTechniquesFilter } from '~/lib/queries/api-filters';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function ArtifactsFilters({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  const cultureIds = searchParams['culture'] as string | undefined
  const monumentIds = searchParams['monument'] as string | undefined
  const techniqueIds = searchParams['technique'] as string | undefined
  
  const results = await Promise.allSettled([ 
    getCulturesFilter({ search, categories, collections, monumentIds, techniqueIds }),
    getMonumentsFilter({ search, categories, collections, cultureIds, techniqueIds }),
    getTechniquesFilter({ search, categories, collections, cultureIds, monumentIds })
  ])

  const rejected = results.find(elem => elem.status === "rejected") as PromiseRejectedResult;

  if (!!rejected) {
    return (
      <ErrorHandler
        error={rejected.reason as unknown} 
        place="Artifacts Filters"
        notFound={false} 
      />
    )
  }

  const resultsFulfilled = results as PromiseFulfilledResult<ArtiFilters>[]

  function isParamInString(param: string | undefined, str: string) {
    if (!!param) return param.split("_").includes(str)
    else return true
  }

  function isParamInArray(param: string | undefined, array: { id: string }[]) {
    if (!!param) {
      const paramArray = param.split("_")
      const isInParam = paramArray.some(id => 
        array.some(el => el.id === id)
      )
      return isInParam
    }
    else return true
  }

  const resultsFiltered = resultsFulfilled.map(result => {

    const filtered = result.value.edges.map(elem => {

      const byName = elem.node.artifacts.filter(artifact => artifact.displayName.toLowerCase().includes(search ?? ""))

      const byCategories = byName.filter(artifact => isParamInString(categories, artifact.collection.category.slug))

      const byCollections = byCategories.filter(artifact => isParamInString(collections, artifact.collection.slug))

      const byCultures = elem.node.__typename === "Culture"
        ? byCollections
        : byCollections.filter(artifact => isParamInString(cultureIds, artifact.culturalAffiliation.id))

      const byMonuments = elem.node.__typename === "Monument"
        ? byCultures
        : byCultures.filter(artifact => isParamInString(monumentIds, artifact.monument.id))

      const byTechniques = elem.node.__typename === "Technique"
        ? byMonuments
        : byMonuments.filter(artifact => isParamInArray(techniqueIds, artifact.techniques))

      const filteredEnd = byTechniques

      return {
        value: elem.node.id,
        label: elem.node.displayName,
        count: filteredEnd.length
      }

    })

    return filtered

  })

  return (
    <div className='mt-3'>
      {/* CULTURE */}
      <div className="flex flex-col gap-1">
        <h1 className='font-medium'>{dictResult.objects.filters.cultures}</h1>
        <Select 
            isMulti
            badges
            side='right'
            values={resultsFiltered[0]} 
            param="culture"
            placeholder="Выберите культуры"
            className="max-w-none w-full"
        />
      </div>
      {/* MONUMENT */}
      <div className="flex flex-col gap-1">
        <h1 className='font-medium'>{dictResult.objects.filters.monuments}</h1>
        <Select 
            isMulti
            badges
            side='right'
            values={resultsFiltered[1]} 
            param="monument"
            placeholder="Выберите памятники"
            className="max-w-none w-full"
        />
      </div>
      {/* TECHNIQUE */}
      <div className="flex flex-col gap-1">
        <h1 className='font-medium'>{dictResult.objects.filters.techniques}</h1>
        <Select 
            isMulti
            badges
            side='right'
            values={resultsFiltered[2]} 
            param="technique"
            placeholder="Выберите техники"
            className="max-w-none w-full"
        />
      </div>
    </div>
  )
}
