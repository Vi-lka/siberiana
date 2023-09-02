import { ArtifactById } from "@siberiana/schemas";
import { notFound } from "next/navigation";


//.........................ARTIFACT.........................//
export const getArtifactById = async (id: string): Promise<ArtifactById> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
    query ArtifactById {
        artifacts(where: { id: "${id}" }) {
            totalCount
            edges {
                node {
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
                        displayName
                        country {
                            displayName
                        }
                        region {
                            displayName
                        }
                        district {
                            displayName
                        }
                        settlement {
                            displayName
                        }
                    }
                    holders {
                        organization {
                            displayName
                        }
                        person {
                            displayName
                        }
                    }
                    mediums {
                        displayName
                    }
                    authors {
                        displayName
                    }
                    projects {
                        displayName
                    }
                    publications {
                        displayName
                    }
                    techniques {
                        displayName
                    }
                    license {
                        displayName  
                    }
                    culturalAffiliation {
                        displayName
                    }
                    period {
                        displayName
                    }
                    set {
                        displayName
                    }
                    monument {
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
      next: { revalidate: 3600 },
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error(`Failed to fetch data 'Artifact ${id}'`);
    }
  
    const json = await res.json() as { 
        data: { 
            artifacts: { 
                totalCount: number,
                edges: { 
                    node: ArtifactById 
                }[] 
            }
        } 
    };
  
    if ((json.data.artifacts.totalCount === 0) || (json.data.artifacts.edges.length === 0)) {
      notFound()
    }
  
    const artifact = ArtifactById.parse(json.data?.artifacts.edges[0].node);
  
    return artifact;
  };