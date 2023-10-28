"use client"

export function getCulturesQuery({
    search = "",
    category,
    collection,
}: {
    search?: string,
    category?: string,
    collection?: string,
}) {
    const query = `
      query Cultures() {
        cultures(
            orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
            where: {
                hasArtifactsWith: [{
                  hasCollectionWith: [
                    ${!!collection ? `{slug: "${collection}"},` : ''}
                    ${!!category ? `{
                      hasCategoryWith: [
                        {slug: "${category}"}
                      ]
                    },` : ''}
                  ],
                  or: [ 
                    {displayNameContainsFold: "${search}"}
                  ]
                }]
              }
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

export function getSetsQuery({
  search = "",
  category,
  collection,
}: {
  search?: string,
  category?: string,
  collection?: string,
}) {
  const query = `
    query Sets() {
      sets(
          orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
          where: {
              hasArtifactsWith: [{
                hasCollectionWith: [
                  ${!!collection ? `{slug: "${collection}"},` : ''}
                  ${!!category ? `{
                    hasCategoryWith: [
                      {slug: "${category}"}
                    ]
                  },` : ''}
                ],
                or: [ 
                  {displayNameContainsFold: "${search}"}
                ]
              }]
            }
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

export function getMonumentsQuery({
  search = "",
  category,
  collection,
}: {
  search?: string,
  category?: string,
  collection?: string,
}) {
  const query = `
    query Monuments() {
      monuments(
          orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
          where: {
              hasArtifactsWith: [{
                hasCollectionWith: [
                  ${!!collection ? `{slug: "${collection}"},` : ''}
                  ${!!category ? `{
                    hasCategoryWith: [
                      {slug: "${category}"}
                    ]
                  },` : ''}
                ],
                or: [ 
                  {displayNameContainsFold: "${search}"}
                ]
              }]
            }
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

export function getMaterialsQuery({
  search = "",
  category,
  collection,
}: {
  search?: string,
  category?: string,
  collection?: string,
}) {
  const query = `
    query Media() {
      media(
          orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
          where: {
              hasArtifactsWith: [{
                hasCollectionWith: [
                  ${!!collection ? `{slug: "${collection}"},` : ''}
                  ${!!category ? `{
                    hasCategoryWith: [
                      {slug: "${category}"}
                    ]
                  },` : ''}
                ],
                or: [ 
                  {displayNameContainsFold: "${search}"}
                ]
              }]
            }
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