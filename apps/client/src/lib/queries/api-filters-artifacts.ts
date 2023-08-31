import "server-only";

import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";
import { ArtiFilters } from "@siberiana/schemas";

type Entitys = "cultures" | "monuments" | "techniques"

export const artifacts = `
  artifacts {
    displayName
    collection {
      slug
      category {
        slug
      }
    }
    culturalAffiliation {
      id
    }
    monument {
      id
    }
    techniques {
      id
    }
    location {
      country {
        id
      }
      region {
        id
      }
    }
  }
`

function ArtiQuery({ 
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
          hasArtifactsWith: [{
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
        }
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            ${artifacts}
          }
        }
      }
    }
  `;
  return queryString
}

//.........................CULTURES.........................//
export const getCulturesFilter = async ({
  search = "",
  categories,
  collections,
  countryIds,
  regionIds,
  monumentIds,
  techniqueIds,
}: {
  search?: string,
  categories?: string,
  collections?: string,
  countryIds?: string,
  regionIds?: string,
  monumentIds?: string,
  techniqueIds?: string,
}): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };

  const query = ArtiQuery({
    entity: "cultures",
    search,
    categories,
    collections,
    countryIds,
    regionIds,
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
    throw new Error("Failed to fetch data 'Cultures Filter'");
  }
  
  const json = await res.json() as { data: { cultures: ArtiFilters } };

  // await new Promise((resolve) => setTimeout(resolve, 3000));
  
  if (json.data.cultures.totalCount === 0) {
    notFound()
  }
  
  const cultures = ArtiFilters.parse(json.data.cultures);
  
  return cultures;
};

//.........................MONUMENTS.........................//
export const getMonumentsFilter = async ({
  search = "",
  categories,
  collections,
  countryIds,
  regionIds,
  cultureIds,
  techniqueIds
}: {
  search?: string,
  categories?: string,
  collections?: string,
  countryIds?: string,
  regionIds?: string,
  cultureIds?: string,
  techniqueIds?: string,
}): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };

  const query = ArtiQuery({
    entity: "monuments",
    search,
    categories,
    collections,
    countryIds,
    regionIds,
    cultureIds,
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
    throw new Error("Failed to fetch data 'Monuments Filter'");
  }
  
  const json = await res.json() as { data: { monuments: ArtiFilters } };
  
  if (json.data.monuments.totalCount === 0) {
    notFound()
  }
  
  const monuments = ArtiFilters.parse(json.data.monuments);
  
  return monuments;
};
  
//.........................TECHNIQUES.........................//
export const getTechniquesFilter = async ({
  search = "",
  categories,
  collections,
  countryIds,
  regionIds,
  cultureIds,
  monumentIds,
}: {
  search?: string,
  categories?: string,
  collections?: string,
  countryIds?: string,
  regionIds?: string,
  cultureIds?: string,
  monumentIds?: string,
}): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };

  const query = ArtiQuery({
    entity: "techniques",
    search,
    categories,
    collections,
    countryIds,
    regionIds,
    cultureIds,
    monumentIds,
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
    throw new Error("Failed to fetch data 'Techniques Filter'");
  }
  
  const json = await res.json() as { data: { techniques: ArtiFilters } };
  
  if (json.data.techniques.totalCount === 0) {
    notFound()
  }
  
  const techniques = ArtiFilters.parse(json.data.techniques);
  
  return techniques;
};
  