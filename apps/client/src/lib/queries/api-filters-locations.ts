import "server-only";

import { artifacts } from "./api-filters-artifacts";
import getMultiFilter from "../utils/getMultiFilter";
import { ArtiFilters } from "@siberiana/schemas";
import { notFound } from "next/navigation";

type Entitys = "countries" | "regions" | "districts" | "settlements"


type LocationArtiQueryType = {
  entity?: Entitys,
  search?: string,
  categories?: string,
  collections?: string,
  countryIds?: string,
  regionIds?: string,
  districtIds?: string,
  settlementIds?: string,
  cultureIds?: string,
  setIds?: string,
  monumentIds?: string,
  techniqueIds?: string,
}

function LocationArtiQuery({ 
  entity,
  search = "",
  categories,
  collections,
  countryIds,
  regionIds,
  districtIds,
  settlementIds,
  cultureIds,
  setIds,
  monumentIds,
  techniqueIds,
}: LocationArtiQueryType) {
  const queryString = /* GraphGL */ `
    query {
      ${entity}(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        where: {
          hasLocationsWith: [{
            hasCountryWith: [ ${!!countryIds ? `{idIn: [${getMultiFilter(countryIds)}]}` : ''} ],
            hasRegionWith: [ ${!!regionIds ? `{idIn: [${getMultiFilter(regionIds)}]}` : ''} ],
            hasDistrictWith: [ ${!!districtIds ? `{idIn: [${getMultiFilter(districtIds)}]}` : ''} ],
            hasSettlementWith: [ ${!!settlementIds ? `{idIn: [${getMultiFilter(settlementIds)}]}` : ''} ],
            hasArtifactsWith: [{
              hasCollectionWith: [
                ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
                ${!!categories ? `{
                  hasCategoryWith: [ {slugIn: [${getMultiFilter(categories)}]} ]
                },` : ''}
              ],
              hasCulturalAffiliationWith: [ ${!!cultureIds ? `{idIn: [${getMultiFilter(cultureIds)}]}` : ''} ],
              hasSetWith: [ ${!!setIds ? `{idIn: [${getMultiFilter(setIds)}]}` : ''} ],
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
export const getArtiCountriesFilter = async (args: LocationArtiQueryType): Promise<ArtiFilters> => {
  
  const headers = { "Content-Type": "application/json" };
    
  const query = LocationArtiQuery({ 
    entity: "countries",
    ...args
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
export const getArtiRegionsFilter = async (args: LocationArtiQueryType): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };
  
  const query = LocationArtiQuery({ 
    entity: "regions",
    ...args
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

//.........................DISTRICT.........................//
export const getArtiDistrictsFilter = async (args: LocationArtiQueryType): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };
  
  const query = LocationArtiQuery({ 
    entity: "districts",
    ...args
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
    throw new Error("Failed to fetch data 'Districts Filter'");
  }
    
  const json = await res.json() as { data: { districts: ArtiFilters } };
    
  if (json.data.districts.totalCount === 0) {
    notFound()
  }
    
  const districts = ArtiFilters.parse(json.data.districts);
    
  return districts;
};

//.........................SETTLEMENTS.........................//
export const getArtiSettlementsFilter = async (args: LocationArtiQueryType): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };
  
  const query = LocationArtiQuery({ 
    entity: "settlements",
    ...args
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
    throw new Error("Failed to fetch data 'Settlements Filter'");
  }
    
  const json = await res.json() as { data: { settlements: ArtiFilters } };
    
  if (json.data.settlements.totalCount === 0) {
    notFound()
  }
    
  const settlements = ArtiFilters.parse(json.data.settlements);
    
  return settlements;
};