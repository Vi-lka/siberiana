import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

export function getCategoriesQuery() {
  const query = `
      query Categories() {
        categories(
          orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        ) {
          totalCount
          edges {
            node {
              id
              displayName
              slug
            }
          }
        }
      }
    `;
  return query;
}

export function getCollectionsQuery({
  hasCategory = null,
  categoryId,
}: {
  hasCategory?: boolean | null;
  categoryId?: string;
}) {
  const query = `
      query Collections() {
        collections(
          orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
          where: {
            or: [
              ${
                !!categoryId
                  ? `{
                  hasCategoryWith: [
                    {
                      id: "${categoryId}"
                    }
                  ]
                },`
                  : ""
              }
              ${hasCategory !== null ? `{ hasCategory: ${hasCategory} },` : ""}
            ]
          }
        ) {
          totalCount
          edges {
            node {
              id
              displayName
              slug
              type
            }
          }
        }
      }
    `;
  return query;
}

type Edges = {
  totalCount: number;
  edges: {
    node: {
      id: string;
      displayName: string;
    };
  }[];
};
export function useLocationsQuery() {
  const queryString = `
    query Locations() {
      locations(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {node {
          id
          displayName
        }}
      }
      countries(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {node {
          id
          displayName
        }}
      }
      regions(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {node {
          id
          displayName
        }}
      }
      districts(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {node {
          id
          displayName
        }}
      }
      settlements(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {node {
          id
          displayName
        }}
      }
    }
  `;
  const query = useQuery<
    {
      locations: Edges;
      countries: Edges;
      regions: Edges;
      districts: Edges;
      settlements: Edges;
    },
    Error
  >({
    queryKey: ["locations", queryString],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        queryString,
      ),
    refetchOnWindowFocus: true,
  });

  return query;
}

export function getCountriesQuery() {
  const query = `
    query Countries() {
      countries(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  `;
  return query;
}

export function getRegionsQuery() {
  const query = `
    query Regions() {
      regions(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  `;
  return query;
}

export function  getDistrictsQuery() {
  const query = `
    query Districts() {
      districts(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  `;
  return query;
}

export function  getSettlementsQuery() {
  const query = `
    query Settlements() {
      settlements(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  `;
  return query;
}


export function getLicensesQuery() {
  const query = `
    query Licenses() {
      licenses(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  `;
  return query;
}

export function getPersonsQuery() {
  const query = `
    query Persons() {
      persons(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  `;
  return query;
}

export function getPublicationsQuery() {
  const query = `
    query Publications() {
      publications(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  `;
  return query;
}

export function getProjectsQuery() {
  const query = `
    query Projects() {
      projects(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
      ) {
        totalCount
        edges {
          node {
            id
            displayName
          }
        }
      }
    }
  `;
  return query;
}

export function getOrganizationsQuery() {
  const query = `
      query Organizations() {
        organizations(
          orderBy: {field: DISPLAY_NAME, direction: ASC},
        ) {
          totalCount
          edges {
            node {
              id
              displayName
            }
          }
        }
      }
    `;
  return query;
}
