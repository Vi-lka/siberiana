export function getCollectionsQuery() {
    const query = `
      query Collections() {
        collections(
          orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
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
    `
    return query
}

export function getLocationsQuery() {
    const query = `
      query Locations() {
        locations(
          orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        ) {
          totalCount
          edges {
            node {
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
          }
        }
      }
    `
    return query
}