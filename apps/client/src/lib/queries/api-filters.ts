import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";
import type { FilterArrayType } from "@siberiana/schemas";
import { FilterArraySchema } from "@siberiana/schemas";

//.........................//.........................ARTIFACTS.........................//.........................//

//.........................CULTURES.........................//
export const getCulturesFilter = async ({
    search = "",
    categories,
    collections,
}: {
    search?: string,
    categories?: string,
    collections?: string,
}): Promise<FilterArrayType> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
      query GetCulturesFilter {
        cultures(
            orderBy: [{
              field: DISPLAY_NAME,
              direction: ASC
            }],
            where: {
                hasArtifactsWith: [
                    {
                        hasCollectionWith: [
                            ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
                            ${!!categories ? `{
                              hasCategoryWith: [
                                {slugIn: [${getMultiFilter(categories)}]}
                              ]
                            },` : ''}
                        ],
                        or: [ 
                            {displayNameContainsFold: "${search}"}, 
                            {hasCollectionWith: [
                              {or: [
                                {displayNameContainsFold: "${search}"},
                                {hasCategoryWith: [
                                  {displayNameContainsFold: "${search}"}
                                ]}
                              ]}
                            ]}, 
                        ]
                    }
                ]
            }
        ) {
          totalCount
          edges {
            node {
              id
              displayName
              artifacts {
                id
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
      throw new Error("Failed to fetch data 'Cultures Filter'");
    }
  
    const json = await res.json() as { data: { cultures: FilterArrayType } };

  // await new Promise((resolve) => setTimeout(resolve, 1000));
  
    if (json.data.cultures.totalCount === 0) {
      notFound()
    }
  
    const cultures = FilterArraySchema.parse(json.data.cultures);
  
    return cultures;
  };
  