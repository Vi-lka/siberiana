import { ArtifactsArray } from "@siberiana/schemas";
import { notFound } from "next/navigation";

export const getArtifacts = async ({
    first,
    offset = 0,
    search = "",
    sort = "CREATED_AT:DESC",
    category,
    collection,
}: {
    first: number | null,
    offset?: number | null,
    search?: string,
    sort?: string,
    category?: string,
    collection?: string,
}): Promise<ArtifactsArray> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
    query GetArtifacts {
        artifacts(
            first: ${first}, 
            offset: ${offset}, 
            orderBy: [{
              field: ${sort.split(':')[0]},
              direction: ${sort.split(':')[1]}
            }],
            where: {
              hasCollectionWith: [
                ${!!collection ? `{slug: "${collection}"},` : ''}
                ${!!category ? `{
                  hasCategoryWith: [
                    {slug: "${category}"}
                  ]
                },` : ''}
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
          ) {
            totalCount
            edges {
                node {
                    id
                    status
                    displayName
                    description
                    primaryImageURL
                    additionalImagesUrls
                    dating
                    admissionDate
                    chemicalComposition
                    typology
                    dimensions
                    weight
                    collection {
                        slug
                        displayName
                        category {
                            slug
                            displayName
                        }
                    }
                    location {
                      id
                      displayName
                      country {
                        id  
                        displayName
                      }
                      region {
                        id  
                        displayName
                      }
                      district {
                        id  
                        displayName
                      }
                      settlement {
                        id  
                        displayName
                      }
                    }
                    mediums {
                      id
                      displayName
                    }
                    authors {
                      id
                      displayName
                    }
                    projects {
                      id
                      displayName
                    }
                    publications {
                      id
                      displayName
                    }
                    techniques {
                      id
                      displayName
                    }
                    license {
                        displayName  
                    }
                    culturalAffiliation {
                      id
                      displayName
                    }
                    period {
                        displayName
                    }
                    set {
                      id
                      displayName
                    }
                    monument {
                      id
                      displayName
                    }
                    model {
                        displayName
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
      next: { revalidate: 10 },
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error(`Failed to fetch data 'Artifacts'`);
    }
  
    const json = await res.json() as { data: { artifacts: ArtifactsArray } };

    if (json.data.artifacts.totalCount === 0) {
      notFound()
    }

    const artifacts = ArtifactsArray.parse(json.data.artifacts);
  
    return artifacts;
};