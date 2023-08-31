import type { ArtiFilters, LocationsArtiNode } from "@siberiana/schemas";
import { ArtiNode } from "@siberiana/schemas";
import "server-only";


export function isParamInString(param: string | undefined, str: string | undefined): boolean {
    if (!!str) {

      if (!!param) {
        return param.split("_").includes(str)
      } else return true
    
    } else return true
}

export function isParamInArray(param: string | undefined, array: { id: string }[]) {
    if (!!param) {
      const paramArray = param.split("_")
      const isInParam = paramArray.some(id => 
        array.some(el => el.id === id)
      )
      return isInParam
    }
    else return true
}

export function filterArtifacts(result: ArtiFilters, searchParams: { [key: string]: string | string[] | undefined }) {
    const search = searchParams['search'] as string | undefined
    const categories = searchParams['category'] as string | undefined
    const collections = searchParams['collection'] as string | undefined
    const countryIds = searchParams['country'] as string | undefined
    const regionIds = searchParams['region'] as string | undefined
    const cultureIds = searchParams['culture'] as string | undefined
    const monumentIds = searchParams['monument'] as string | undefined
    const techniqueIds = searchParams['technique'] as string | undefined

    const filtered = result.edges.map(elem => {
  
      if (ArtiNode.safeParse(elem.node).success) {
        const artifactsNode = elem.node as ArtiNode;
  
        const byName = artifactsNode.artifacts.filter(artifact => artifact.displayName.toLowerCase().includes(search ?? ""))
  
        const byCategories_Collections = byName.filter(artifact => isParamInString(categories, artifact.collection.category.slug) && isParamInString(collections, artifact.collection.slug))
  
        const byCountry = byCategories_Collections.filter(artifact => isParamInString(countryIds, artifact.location?.country?.id))
  
        const byRegion = byCountry.filter(artifact => isParamInString(regionIds, artifact.location?.region?.id))
  
        const byCultures = artifactsNode.__typename === "Culture"
          ? byRegion
          : byRegion.filter(artifact => isParamInString(cultureIds, artifact.culturalAffiliation?.id))
  
        const byMonuments = artifactsNode.__typename === "Monument"
          ? byCultures
          : byCultures.filter(artifact => isParamInString(monumentIds, artifact.monument?.id))
  
        const byTechniques = artifactsNode.__typename === "Technique"
          ? byMonuments
          : byMonuments.filter(artifact => isParamInArray(techniqueIds, artifact.techniques))
  
        const filteredEnd = byTechniques
  
        return {
          value: artifactsNode.id,
          label: artifactsNode.displayName,
          count: filteredEnd.length
        }
      } else {
        const locationsArtiNode = elem.node as LocationsArtiNode;
  
        const byName = locationsArtiNode.locations.map(location => {
          return location.artifacts.filter(artifact => artifact.displayName.toLowerCase().includes(search ?? ""))
        })
  
        const byCategories_Collections = byName.map(artifacts => {
          return artifacts.filter(artifact => isParamInString(categories, artifact.collection.category.slug) && isParamInString(collections, artifact.collection.slug))
        })
  
        const byCountry = locationsArtiNode.__typename === 'Country'
          ? byCategories_Collections
          : byCategories_Collections.map(artifacts => {
            return artifacts.filter(artifact => isParamInString(countryIds, artifact.location?.country?.id))
          })
  
        const byRegion = locationsArtiNode.__typename === 'Region'
          ? byCountry
          : byCountry.map(artifacts => {
            return artifacts.filter(artifact => isParamInString(regionIds, artifact.location?.region?.id))
          })
  
        const byCultures = byRegion.map(artifacts => {
          return artifacts.filter(artifact => isParamInString(cultureIds, artifact.culturalAffiliation?.id))
        })
  
        const byMonuments = byCultures.map(artifacts => {
          return artifacts.filter(artifact => isParamInString(monumentIds, artifact.monument?.id))
        })
  
        const byTechniques = byMonuments.map(artifacts => {
          return artifacts.filter(artifact => isParamInArray(techniqueIds, artifact.techniques))
        })
  
        const filteredEnd = byTechniques.map(artifacts => artifacts.length)
  
        const filteredCount = filteredEnd.reduce((a, b) => {
          return a + b;
        })
  
        return {
          value: locationsArtiNode.id,
          label: locationsArtiNode.displayName,
          count: filteredCount
        } 
      }
  
    })

    return filtered
  }