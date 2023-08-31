import "server-only";

import { artifacts } from "./api-filters-artifacts";
import getMultiFilter from "../utils/getMultiFilter";
import { ArtiFilters } from "@siberiana/schemas";
import { notFound } from "next/navigation";

type Entitys = "countries" | "regions"

function LocationQuery({ 
    entity,
    search,
    categories,
    collections,
    countryIds,
    regionIds,
    cultureIds,
    monumentIds,
    techniqueIds,
  }: { 
    entity: Entitys,
    search?: string,
    categories?: string,
    collections?: string,
    countryIds?: string,
    regionIds?: string,
    cultureIds?: string,
    monumentIds?: string,
    techniqueIds?: string,
  }) {
    const queryString = /* GraphGL */ `
      query {
        ${entity}(
          orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
          where: {
            hasLocationsWith: [{
              hasCountryWith: [ ${!!countryIds ? `{idIn: [${getMultiFilter(countryIds)}]}` : ''} ],
              hasRegionWith: [ ${!!regionIds ? `{idIn: [${getMultiFilter(regionIds)}]}` : ''} ],
              hasArtifactsWith: [{
                hasCollectionWith: [
                  ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
                  ${!!categories ? `{
                    hasCategoryWith: [ {slugIn: [${getMultiFilter(categories)}]} ]
                  },` : ''}
                ],
                hasCulturalAffiliationWith: [ ${!!cultureIds ? `{idIn: [${getMultiFilter(cultureIds)}]}` : ''} ],
                hasMonumentWith: [ ${!!monumentIds ? `{idIn: [${getMultiFilter(monumentIds)}]}` : ''} ],
                hasTechniquesWith : [ ${!!techniqueIds ? `{idIn: [${getMultiFilter(techniqueIds)}]}` : ''} ],
                or: [ 
                  {displayNameContainsFold: "${search}"}, 
                  {hasCollectionWith: [
                    {or: [
                      {displayNameContainsFold: "${search}"},
                      {hasCategoryWith: [
                        {displayNameContainsFold: "${search}"}
                      ]}
                    ]}
                  ]}, 
                ]
              }]
            }]
          }
        ) {
          totalCount
          edges {
            node {
              __typename
              id
              displayName
              locations {
                id
                ${artifacts}
              }
            }
          }
        }
      }
    `;
    return queryString
}

//.........................COUNTRIES.........................//
export const getArtiCountriesFilter = async ({
  search = "",
  categories,
  collections,
  regionIds,
  cultureIds,
  monumentIds,
  techniqueIds,
}: {
  search?: string,
  categories?: string,
  collections?: string,
  regionIds?: string,
  cultureIds?: string,
  monumentIds?: string,
  techniqueIds?: string,
}): Promise<ArtiFilters> => {
  
    const headers = { "Content-Type": "application/json" };
    
    const query = LocationQuery({ 
      entity: "countries",
      search,
      categories,
      collections,
      regionIds,
      cultureIds,
      monumentIds,
      techniqueIds,
    })
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      next: { revalidate: 3600 },
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error("Failed to fetch data 'Countries Filter'");
    }
    
    const json = await res.json() as { data: { countries: ArtiFilters } };
    
    if (json.data.countries.totalCount === 0) {
      notFound()
    }
    
    const countries = ArtiFilters.parse(json.data.countries);
    
    return countries;
};
  
//.........................REGION.........................//
export const getArtiRegionsFilter = async ({
  search = "",
  categories,
  collections,
  countryIds,
  cultureIds,
  monumentIds,
  techniqueIds,
}: {
  search?: string,
  categories?: string,
  collections?: string,
  countryIds?: string,
  cultureIds?: string,
  monumentIds?: string,
  techniqueIds?: string,
}): Promise<ArtiFilters> => {

    const headers = { "Content-Type": "application/json" };
  
    const query = LocationQuery({ 
      entity: "regions",
      search,
      categories,
      collections,
      countryIds,
      cultureIds,
      monumentIds,
      techniqueIds,
    })
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`, {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      next: { revalidate: 3600 },
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error("Failed to fetch data 'Regions Filter'");
    }
    
    const json = await res.json() as { data: { regions: ArtiFilters } };
    
    if (json.data.regions.totalCount === 0) {
      notFound()
    }
    
    const regions = ArtiFilters.parse(json.data.regions);
    
    return regions;
};