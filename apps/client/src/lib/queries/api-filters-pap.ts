import "server-only";

import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";
import { PAPFilters } from "@siberiana/schemas";

type Entitys = "protectedAreas" | "protectedAreaCategories" | "licenses"

type PAPQueryType = {
  entity?: Entitys,
  search?: string,
  categories?: string,
  collections?: string,
  countryIds?: string,
  regionIds?: string,
  districtIds?: string,
  settlementIds?: string,
  protectedAreaIds?: string,
  protectedAreaCategoryIds?: string,
  licenseIds?: string,
}

export const protectedAreaPictures = `
    protectedAreaPictures {
        displayName
        collection {
            slug
            category {
                slug
            }
        }
        protectedArea {
            id
            protectedAreaCategory {
                id
            }
        }
        license {
            id
        }
        location {
            country {
                id
            }
            region {
                id
            }
            district {
                id
            }
            settlement {
                id
            }
        }
  }
`

function PAPQuery({ 
  entity,
  search = "",
  categories,
  collections,
  countryIds,
  regionIds,
  districtIds,
  settlementIds,
  protectedAreaIds,
  protectedAreaCategoryIds,
  licenseIds
}: PAPQueryType) {
  const queryString = /* GraphGL */ `
    query {
      ${entity}(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        where: {
          hasProtectedAreaPicturesWith: [{
            hasCollectionWith: [
              ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
              ${!!categories ? `{
                hasCategoryWith: [
                  {slugIn: [${getMultiFilter(categories)}]}
                ]
              },` : ''}
            ],
            hasLocationWith: [
              ${!!countryIds ? `{hasCountryWith: [ {idIn: [${getMultiFilter(countryIds)}]} ]}` : ''}
              ${!!regionIds ? `{hasRegionWith: [ {idIn: [${getMultiFilter(regionIds)}]} ]}` : ''}
              ${!!districtIds ? `{hasDistrictWith: [ {idIn: [${getMultiFilter(districtIds)}]} ]}` : ''}
              ${!!settlementIds ? `{hasSettlementWith: [ {idIn: [${getMultiFilter(settlementIds)}]} ]}` : ''}
            ],
            hasLicenseWith: [ ${!!licenseIds ? `{idIn: [${getMultiFilter(licenseIds)}]}` : ''} ],
            hasProtectedAreaWith: [ 
              ${!!protectedAreaIds ? `{idIn: [${getMultiFilter(protectedAreaIds)}]},` : ''} 
              ${!!protectedAreaCategoryIds ? `{
                hasProtectedAreaCategoryWith: [
                  {idIn: [${getMultiFilter(protectedAreaCategoryIds)}]}
                ]
              },` : ''}
            ],
            or: [ 
              {displayNameContainsFold: "${search}"}
            ]
          }]
        }
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            ${protectedAreaPictures}
          }
        }
      }
    }
  `;
  return queryString
}

//.........................LICENSES.........................//
export const getLicensesFilter = async (args: PAPQueryType): Promise<PAPFilters> => {

    const headers = { "Content-Type": "application/json" };
  
    const query = PAPQuery({
      entity: "licenses",
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
      throw new Error("Failed to fetch data 'Licenses PAP Filter'");
    }
    
    const json = await res.json() as { data: { licenses: PAPFilters } };
    
    if (json.data.licenses.totalCount === 0) {
      notFound()
    }
    
    const licenses = PAPFilters.parse(json.data.licenses);
    
    return licenses;
};

//.........................PROTECTED AREAS.........................//
export const getProtectedAreasFilter = async (args: PAPQueryType): Promise<PAPFilters> => {

    const headers = { "Content-Type": "application/json" };
  
    const query = PAPQuery({
      entity: "protectedAreas",
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
      throw new Error("Failed to fetch data 'Protected Areas Filter'");
    }
    
    const json = await res.json() as { data: { protectedAreas: PAPFilters } };
    
    if (json.data.protectedAreas.totalCount === 0) {
      notFound()
    }
    
    const protectedAreas = PAPFilters.parse(json.data.protectedAreas);
    
    return protectedAreas;
};

//.........................PROTECTED AREA CATEGORY.........................//
export const getProtectedAreaCategorysFilter = async ({ 
  search = "",
  categories,
  collections,
  countryIds,
  regionIds,
  districtIds,
  settlementIds,
  protectedAreaIds,
  protectedAreaCategoryIds,
  licenseIds
}: PAPQueryType): Promise<PAPFilters> => {

  const headers = { "Content-Type": "application/json" };

  const query = /* GraphGL */ `  
    query {
      protectedAreaCategories(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        where: {
          hasProtectedAreasWith: [{ 
            hasProtectedAreaPicturesWith: [{
              hasCollectionWith: [
                ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
                ${!!categories ? `{
                  hasCategoryWith: [
                    {slugIn: [${getMultiFilter(categories)}]}
                  ]
                },` : ''}
              ],
              hasLocationWith: [
                ${!!countryIds ? `{hasCountryWith: [ {idIn: [${getMultiFilter(countryIds)}]} ]}` : ''}
                ${!!regionIds ? `{hasRegionWith: [ {idIn: [${getMultiFilter(regionIds)}]} ]}` : ''}
                ${!!districtIds ? `{hasDistrictWith: [ {idIn: [${getMultiFilter(districtIds)}]} ]}` : ''}
                ${!!settlementIds ? `{hasSettlementWith: [ {idIn: [${getMultiFilter(settlementIds)}]} ]}` : ''}
              ],
              hasLicenseWith: [ ${!!licenseIds ? `{idIn: [${getMultiFilter(licenseIds)}]}` : ''} ],
              hasProtectedAreaWith: [ 
                ${!!protectedAreaIds ? `{idIn: [${getMultiFilter(protectedAreaIds)}]},` : ''} 
                ${!!protectedAreaCategoryIds ? `{
                  hasProtectedAreaCategoryWith: [
                    {idIn: [${getMultiFilter(protectedAreaCategoryIds)}]}
                  ]
                },` : ''}
              ],
              or: [ 
                {displayNameContainsFold: "${search}"}
              ]
            }]
          }],
        }
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            protectedAreas {
              ${protectedAreaPictures}
            }
          }
        }
      }
    }
  `;

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
    throw new Error("Failed to fetch data 'Protected Area Categorys Filter'");
  }
  
  const json = await res.json() as { data: { protectedAreaCategories: PAPFilters } };
  
  if (json.data.protectedAreaCategories.totalCount === 0) {
    notFound()
  }
  
  const protectedAreaCategories = PAPFilters.parse(json.data.protectedAreaCategories);
  
  return protectedAreaCategories;
};