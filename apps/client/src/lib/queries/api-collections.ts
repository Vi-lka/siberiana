import type { CategoriesType, CategoryNodeType, CollectionsType } from "@siberiana/schemas";
import { CategoriesSchema, CategoryNodeSchema, CollectionsSchema } from "@siberiana/schemas";
import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";

export const getCategories = async ({
  first,
  offset = 0,
  search = "",
}: {
  first: number | null,
  offset?: number | null,
  search?: string;
}): Promise<CategoriesType> => {
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
            slug
            displayName
            abbreviation
            primaryImageURL
            description
            collections {
              id
              slug
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
    throw new Error("Failed to fetch data 'Categories'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

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
            primaryImageURL
            description
            collections {
              id
              slug
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
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.categories.edges.length === 0)) {
    notFound()
  }
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const category = CategoryNodeSchema.parse(json.data?.categories.edges[0].node);
  
  return category;
};

export const getCollections = async ({
  first,
  offset = 0,
  search = "",
  categories
}: {
  first: number | null,
  offset?: number | null,
  search?: string;
  categories?: string
}): Promise<CollectionsType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Collections {
      collections(
        first: ${first}, 
        offset: ${offset}, 
        where: {
          ${!!categories ? (
            `hasCategoryWith: [
              {slugIn: [${getMultiFilter(categories)}]}
            ]`
          ) : ''}
          or: [ 
          {displayNameContainsFold: "${search}"}, 
          {descriptionContainsFold: "${search}"}, 
          {abbreviationContainsFold: "${search}"} 
        ]}
      ) {
        totalCount
        edges {
          node {
            id
            slug
            displayName
            abbreviation
            primaryImageURL
            description
            category {
              id
              slug
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
    throw new Error("Failed to fetch data 'Collections'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.collections.totalCount === 0) || (json.data.collections.edges.length === 0)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const collections = CollectionsSchema.parse(json.data?.collections);

  return collections;
};