"use client";

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
    `;
  return query;
}

export function getEthnosSliceQuery() {
  const query = `
      query EthnosSlice() {
        ethnosSlice(
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
  `;
  return query;
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
  `;
  return query;
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
  `;
  return query;
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
  `;
  return query;
}

export function getModelsQuery() {
  const query = `
    query Models() {
      models(
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
