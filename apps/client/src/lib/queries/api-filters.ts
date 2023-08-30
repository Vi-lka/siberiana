import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";
import { ArtiFilters } from "@siberiana/schemas";

//.........................COUNTRIES.........................//
export const getCountriessFilter = async ({
  search = "",
  categories,
  collections,
  monumentIds,
  techniqueIds,
}: {
  search?: string,
  categories?: string,
  collections?: string,
  monumentIds?: string,
  techniqueIds?: string,
}): Promise<ArtiFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetCountriessFilter {
      countries(
        orderBy: [{
          field: DISPLAY_NAME,
          direction: ASC
        }],
        where: {
          hasArtifactsWith: [
            {
              hasCollectionWith: [
                ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
                ${!!categories ? `{
                  hasCategoryWith: [
                    {slugIn: [${getMultiFilter(categories)}]}
                  ]
                },` : ''}
              ],
              hasMonumentWith: [
                ${!!monumentIds ? `{idIn: [${getMultiFilter(monumentIds)}]}` : ''}
              ],
              hasTechniquesWith : [
                ${!!techniqueIds ? `{idIn: [${getMultiFilter(techniqueIds)}]}` : ''}
              ],
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
            }
          ]
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
              }
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
    throw new Error("Failed to fetch data 'Cultures Filter'");
  }
  
  const json = await res.json() as { data: { cultures: ArtiFilters } };
  
  if (json.data.cultures.totalCount === 0) {
    notFound()
  }
  
  const cultures = ArtiFilters.parse(json.data.cultures);
  
  return cultures;
};

//.........................//.........................ARTIFACTS.........................//.........................//

//.........................CULTURES.........................//
export const getCulturesFilter = async ({
  search = "",
  categories,
  collections,
  monumentIds,
  techniqueIds,
}: {
  search?: string,
  categories?: string,
  collections?: string,
  monumentIds?: string,
  techniqueIds?: string,
}): Promise<ArtiFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetCulturesFilter {
      cultures(
        orderBy: [{
          field: DISPLAY_NAME,
          direction: ASC
        }],
        where: {
          hasArtifactsWith: [
            {
              hasCollectionWith: [
                ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
                ${!!categories ? `{
                  hasCategoryWith: [
                    {slugIn: [${getMultiFilter(categories)}]}
                  ]
                },` : ''}
              ],
              hasMonumentWith: [
                ${!!monumentIds ? `{idIn: [${getMultiFilter(monumentIds)}]}` : ''}
              ],
              hasTechniquesWith : [
                ${!!techniqueIds ? `{idIn: [${getMultiFilter(techniqueIds)}]}` : ''}
              ],
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
            }
          ]
        }
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
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
    throw new Error("Failed to fetch data 'Cultures Filter'");
  }
  
  const json = await res.json() as { data: { cultures: ArtiFilters } };
  
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
  cultureIds,
  techniqueIds
}: {
  search?: string,
  categories?: string,
  collections?: string,
  cultureIds?: string,
  techniqueIds?: string,
}): Promise<ArtiFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetMonumentsFilter {
      monuments(
        orderBy: [{
          field: DISPLAY_NAME,
          direction: ASC
        }],
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
            hasCulturalAffiliationWith: [
              ${!!cultureIds ? `{idIn: [${getMultiFilter(cultureIds)}]}` : ''}
            ],
            hasTechniquesWith : [
              ${!!techniqueIds ? `{idIn: [${getMultiFilter(techniqueIds)}]}` : ''}
            ],
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
  cultureIds,
  monumentIds,
}: {
  search?: string,
  categories?: string,
  collections?: string,
  cultureIds?: string,
  monumentIds?: string,
}): Promise<ArtiFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetTechniquesFilter {
      techniques(
        orderBy: [{
          field: DISPLAY_NAME,
          direction: ASC
        }],
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
            hasCulturalAffiliationWith: [
              ${!!cultureIds ? `{idIn: [${getMultiFilter(cultureIds)}]}` : ''}
            ],
            hasMonumentWith: [
              ${!!monumentIds ? `{idIn: [${getMultiFilter(monumentIds)}]}` : ''}
            ],
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
    throw new Error("Failed to fetch data 'Techniques Filter'");
  }
  
  const json = await res.json() as { data: { techniques: ArtiFilters } };
  
  if (json.data.techniques.totalCount === 0) {
    notFound()
  }
  
  const techniques = ArtiFilters.parse(json.data.techniques);
  
  return techniques;
};
  