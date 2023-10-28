import { ArtifactById, BookById, PAPById } from "@siberiana/schemas";
import { notFound } from "next/navigation";


//.........................ARTIFACT.........................//
export const getArtifactById = async (id: string): Promise<ArtifactById> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
    query ArtifactById {
        artifacts(where: { id: "${id}", status: listed }) {
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
                    mediums {
                        id
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
      next: { revalidate: 60 },
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

//.........................BOOK.........................//
export const getBookById = async (id: string): Promise<BookById> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
    query BookById {
        books(where: { id: "${id}", status: listed }) {
            totalCount
            edges {
                node {
                    id
                    status
                    displayName
                    description
                    primaryImageURL
                    additionalImagesUrls
                    year
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
                    bookGenres {
                        displayName
                    }
                    authors {
                        displayName
                    }
                    license {
                        displayName  
                    }
                    publisher {
                        displayName
                    }
                    files
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
      next: { revalidate: 60 },
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error(`Failed to fetch data 'Book ${id}'`);
    }
  
    const json = await res.json() as { 
        data: { 
            books: { 
                totalCount: number,
                edges: { 
                    node: BookById 
                }[] 
            }
        } 
    };
  
    if ((json.data.books.totalCount === 0) || (json.data.books.edges.length === 0)) {
      notFound()
    }
  
    const book = BookById.parse(json.data?.books.edges[0].node);
  
    return book;
};

//.........................PAP (protectedAreaPictures).........................//
export const getPAPById = async (id: string): Promise<PAPById> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
    query PAPById {
        protectedAreaPictures(where: { id: "${id}", status: listed }) {
            totalCount
            edges {
                node {
                    id
                    status
                    displayName
                    description
                    primaryImageURL
                    additionalImagesUrls
                    shootingDate
                    protectedArea {
                        displayName
                        description
                        area
                        establishmentDate
                        protectedAreaCategory {
                            displayName
                        }
                    }
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
                    license {
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
      next: { revalidate: 60 },
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error(`Failed to fetch data 'Protected Area Picture ${id}'`);
    }
  
    const json = await res.json() as { 
        data: { 
            protectedAreaPictures: { 
                totalCount: number,
                edges: { 
                    node: PAPById 
                }[] 
            }
        } 
    };

    // await new Promise((resolve) => setTimeout(resolve, 1000));
  
    if ((json.data.protectedAreaPictures.totalCount === 0) || (json.data.protectedAreaPictures.edges.length === 0)) {
      notFound()
    }
  
    const protectedAreaPicture = PAPById.parse(json.data?.protectedAreaPictures.edges[0].node);
  
    return protectedAreaPicture;
};