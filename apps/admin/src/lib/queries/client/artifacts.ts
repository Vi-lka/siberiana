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