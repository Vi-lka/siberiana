import { notFound } from "next/navigation";

import { ArtById, ArtifactById, BookById, PAPById } from "@siberiana/schemas";

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
                    admissionDate
                    chemicalComposition
                    typology
                    weight
                    width
                    height
                    length
                    depth
                    diameter
                    datingStart
                    datingEnd
                    dating
                    dimensions
                    inventoryNumber
                    kpNumber
                    goskatalogNumber
                    externalLink
                    collection {
                        id
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
                    donor {
                        id
                        displayName
                    }
                    license {
                        id
                        displayName
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
                    set {
                        id
                        displayName
                    }
                    monument {
                        id
                        displayName
                    }
                    organization {
                      id
                      displayName
                    }
                    model {
                        id
                        displayName
                        fileURL
                    }
                }
            }
        }
    }
    `;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error(`Failed to fetch data 'Artifact ${id}'`);
  }

  const json = (await res.json()) as {
    data: {
      artifacts: {
        totalCount: number;
        edges: {
          node: ArtifactById;
        }[];
      };
    };
  };

  if (
    json.data.artifacts.totalCount === 0 ||
    json.data.artifacts.edges.length === 0
  ) {
    notFound();
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
                    files
                    collection {
                      id
                      slug
                      displayName
                      category {
                        slug
                        displayName
                      }
                    }
                    bookGenres {
                      id
                      displayName
                    }
                    authors {
                      id
                      displayName
                    }
                    periodical {
                      id
                      displayName
                    }
                    publisher {
                      id
                      displayName
                    }
                    license {
                      id
                      displayName
                    }
                    library {
                      id
                      displayName
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
            }
        }
    }
    `;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error(`Failed to fetch data 'Book ${id}'`);
  }

  const json = (await res.json()) as {
    data: {
      books: {
        totalCount: number;
        edges: {
          node: BookById;
        }[];
      };
    };
  };

  if (json.data.books.totalCount === 0 || json.data.books.edges.length === 0) {
    notFound();
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
                    geometry
                    protectedArea {
                        id
                        displayName
                        description
                        area
                        establishmentDate
                        protectedAreaCategory {
                            displayName
                        }
                    }
                    collection {
                        id
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
                    license {
                        displayName  
                    }
                }
            }
        }
    }
    `;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error(`Failed to fetch data 'Protected Area Picture ${id}'`);
  }

  const json = (await res.json()) as {
    data: {
      protectedAreaPictures: {
        totalCount: number;
        edges: {
          node: PAPById;
        }[];
      };
    };
  };

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  if (
    json.data.protectedAreaPictures.totalCount === 0 ||
    json.data.protectedAreaPictures.edges.length === 0
  ) {
    notFound();
  }

  const protectedAreaPicture = PAPById.parse(
    json.data?.protectedAreaPictures.edges[0].node,
  );

  return protectedAreaPicture;
};

//.........................ART.........................//
export const getArtById = async (id: string): Promise<ArtById> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query ArtById {
        arts(where: { id: "${id}", status: listed }) {
            totalCount
            edges {
                node {
                  id
                  displayName
                  description
                  primaryImageURL
                  additionalImagesUrls
                  collection {
                    id
                    slug
                    displayName
                    category {
                        slug
                        displayName
                    }
                  }
                  number
                  dating
                  dimensions
                  artGenre {
                    displayName
                  }
                  artStyle {
                    displayName
                  }
                  techniques {
                    displayName
                  }
                  author {
                    displayName
                  }
                }
            }
        }
    }
    `;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error(`Failed to fetch data 'Art ${id}'`);
  }

  const json = (await res.json()) as {
    data: {
      arts: {
        totalCount: number;
        edges: {
          node: ArtById;
        }[];
      };
    };
  };

  if (json.data.arts.totalCount === 0 || json.data.arts.edges.length === 0) {
    notFound();
  }

  const art = ArtById.parse(json.data?.arts.edges[0].node);

  return art;
};
