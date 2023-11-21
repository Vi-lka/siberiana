"use client";

export function getBookGenresQuery() {
    const query = `
        query BookGenres() {
          bookGenres(
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

export function getPeriodicalsQuery() {
    const query = `
        query Periodicals() {
          periodicals(
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


export function getPublishersQuery() {
    const query = `
        query Publishers() {
          publishers(
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