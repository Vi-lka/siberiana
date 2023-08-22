import type { CategoriesType, CategoryNodeType, CollectionsType, ObjectsType } from "@siberiana/schemas";
import { CategoriesSchema, CategoryNodeSchema, CollectionsSchema, ObjectsSchema } from "@siberiana/schemas";
import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";

export const getCategories = async ({
  first,
  offset = 0,
  search = "",
}: {
  first: number | null,
  offset?: number | null,
  search?: string,
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
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Categories'");
  }

  const json = await res.json() as { data: { categories: CategoriesType } };

  if ((json.data.categories.totalCount === 0) || (json.data.categories.edges.length === 0)) {
    notFound()
  }

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
    next: { revalidate: 3600 },
  });
  
  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Category'");
  }

  const json = await res.json() as {
    data: {
      categories: {
        edges: {
          node: CategoryNodeType
        }[]
      }
    }
  };

  if ((json.data.categories.edges.length === 0)) {
    notFound()
  }

  const category = CategoryNodeSchema.parse(json.data?.categories.edges[0].node);
  
  return category;
};

export const getCollections = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
  categories
}: {
  first: number | null,
  offset?: number | null,
  search?: string,
  sort?: string,
  categories?: string
}): Promise<CollectionsType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Collections {
      collections(
        first: ${first}, 
        offset: ${offset},
        orderBy: [{
          field: ${sort.split(':')[0]},
          direction: ${sort.split(':')[1]}
        }],
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
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Collections'");
  }

  const json = await res.json() as { data: { collections: CollectionsType } };

  if ((json.data.collections.totalCount === 0) || (json.data.collections.edges.length === 0)) {
    notFound()
  }

  const collections = CollectionsSchema.parse(json.data?.collections);

  return collections;
};

export const getObjects = async ({
  first,
  offset = 0,
  search = "",
  categories,
  collections,
}: {
  first: number | null,
  offset?: number | null,
  search?: string,
  categories?: string,
  collections?: string,
}): Promise<ObjectsType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Objects {
      artifacts(
        first: ${first}, 
        offset: ${offset}, 
        where: {
          hasCollectionWith: [
            ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
            ${!!categories ? `{
              hasCategoryWith: [
                {slugIn: [${getMultiFilter(categories)}]}
              ]
            },` : ''}
          ]
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
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            primaryImageURL
          }
        }
      }
      books(
        first: ${first}, 
        offset: ${offset}, 
        where: {
          hasCollectionWith: [
            ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
            ${!!categories ? `{
              hasCategoryWith: [
                {slugIn: [${getMultiFilter(categories)}]}
              ]
            },` : ''}
          ]
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
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            primaryImageURL
          }
        }
      }
      protectedAreaPictures(
        first: ${first}, 
        offset: ${offset}, 
        where: {
          hasCollectionWith: [
            ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
            ${!!categories ? `{
              hasCategoryWith: [
                {slugIn: [${getMultiFilter(categories)}]}
              ]
            },` : ''}
          ]
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
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            primaryImageURL
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
    throw new Error("Failed to fetch data 'Objects'");
  }

  const json = await res.json() as { data: ObjectsType };

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const allCount = json.data.artifacts.totalCount + json.data.books.totalCount + json.data.protectedAreaPictures.totalCount
  if (allCount === 0) {
    notFound()
  }

  const objects = ObjectsSchema.parse(json.data);

  return objects;
};