"use client"

export function getCulturesQuery() {
    const query = `
      query Cultures() {
        cultures(
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
    `
    return query
}

export function getSetsQuery() {
  const query = `
    query Sets() {
      sets(
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
  `
  return query
}

export function getMonumentsQuery() {
  const query = `
    query Monuments() {
      monuments(
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
  `
  return query
}

export function getMaterialsQuery() {
  const query = `
    query Media() {
      media(
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
  `
  return query
}

export function getTechniquesQuery() {
  const query = `
    query Techniques() {
      techniques(
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
  `
  return query
}

export function getAuthorsQuery() {
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
  `
  return query
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
  `
  return query
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