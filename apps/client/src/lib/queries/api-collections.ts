import type { CategoriesType, CategoryNodeType } from "@siberiana/schemas";
import { CategoriesSchema, CategoryNodeSchema } from "@siberiana/schemas";
import { notFound } from "next/navigation";

export const getCategories = async (
    first: number | null,
    offset = 0 as number | null,
    search = "",
  ): Promise<CategoriesType> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
        query Categories {
            categories(
                first: ${first}, 
                offset: ${offset}, 
                where: {or: [ 
                    {displayNameContainsFold: "${search}"}, 
                    {descriptionContainsFold: "${search}"}, 
                    {abbreviationContainsFold: "${search}"} 
                ]}
            ) {
                totalCount
                edges {
                    node {
                        id
                        displayName
                        abbreviation
                        description
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
      throw new Error("Failed to fetch data 'Categories'");
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await res.json();

    // await new Promise((resolve) => setTimeout(resolve, 1000));
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((json.data.categories.totalCount === 0) || (json.data.categories.edges.length === 0)) {
      notFound()
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const categories = CategoriesSchema.parse(json.data?.categories);
  
    return categories;
};

export const getCategoryByID = async (id: string): Promise<CategoryNodeType> => {
    const headers = { "Content-Type": "application/json" };
    const query = /* GraphGL */ `
        query CategoryByID {
            categories(
                where: {id: "${id}"}
            ) {
                edges {
                    node {
                        id
                        displayName
                        abbreviation
                        description
                        collections {
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
      next: { revalidate: 60 },
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error("Failed to fetch data 'Category'");
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await res.json();

    // await new Promise((resolve) => setTimeout(resolve, 1000));
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if ((json.data.categories.edges.length === 0)) {
      notFound()
    }
  
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    const category = CategoryNodeSchema.parse(json.data?.categories.edges[0].node);
  
    return category;
};