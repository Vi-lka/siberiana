import "server-only";

import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";
import { PAPFilters } from "@siberiana/schemas";

type Entitys = "protectedAreas" | "licenses"

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
            hasProtectedAreaWith: [ 
              ${!!protectedAreaIds ? `{idIn: [${getMultiFilter(protectedAreaIds)}]},` : ''} 
              ${!!protectedAreaCategoryIds ? `{
                hasProtectedAreaCategoryWith: [
                  {idIn: [${getMultiFilter(protectedAreaCategoryIds)}]}
                ]
              },` : ''}
            ],
            hasLicenseWith: [ ${!!licenseIds ? `{idIn: [${getMultiFilter(licenseIds)}]}` : ''} ],
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