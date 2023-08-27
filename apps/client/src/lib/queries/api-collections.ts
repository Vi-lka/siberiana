import "server-only";

import type { CategoriesType, CollectionsType, ObjectsArrayType } from "@siberiana/schemas";
import { CategoriesSchema, CollectionsSchema, ObjectsArraySchema } from "@siberiana/schemas";
import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";

//.........................CATEGORIES.........................//
export const getCategories = async ({
  first,
  offset = 0,
  search = "",
  sort = "DISPLAY_NAME:ASC",
}: {
  first: number | null,
  offset?: number | null,
  search?: string,
  sort?: string
}): Promise<CategoriesType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Categories {
      categories(
        first: ${first}, 
        offset: ${offset},
        orderBy: [{
          field: ${sort.split(':')[0]},
          direction: ${sort.split(':')[1]}
        }],
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

//.........................COLLECTIONS.........................//
export const getCollections = async ({
  first,
  offset = 0,
  search = "",
  sort = "DISPLAY_NAME:ASC",
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

//.........................ARTIFACTS.........................//
export const getArtifacts = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
  categories,
  collections,
}: {
  first: number | null,
  offset?: number | null,
  search?: string,
  sort?: string,
  categories?: string,
  collections?: string,
}): Promise<ObjectsArrayType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetArtifacts {
      artifacts(
        first: ${first}, 
        offset: ${offset}, 
        orderBy: [{
          field: ${sort.split(':')[0]},
          direction: ${sort.split(':')[1]}
        }],
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
    throw new Error("Failed to fetch data 'Artifacts'");
  }

  const json = await res.json() as { data: { artifacts: ObjectsArrayType } };

  if (json.data.artifacts.totalCount === 0) {
    notFound()
  }

  const artifacts = ObjectsArraySchema.parse(json.data.artifacts);

  return artifacts;
};

//.........................BOOKS.........................//
export const getBooks = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
  categories,
  collections,
}: {
  first: number | null,
  offset?: number | null,
  search?: string,
  sort?: string,
  categories?: string,
  collections?: string,
}): Promise<ObjectsArrayType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetBooks {
      books(
        first: ${first}, 
        offset: ${ offset}, 
        orderBy: [{
          field: ${sort.split(':')[0]},
          direction: ${sort.split(':')[1]}
        }],
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
    throw new Error("Failed to fetch data 'Books'");
  }

  const json = await res.json() as { data: { books: ObjectsArrayType } };

  if (json.data.books.totalCount === 0) {
    notFound()
  }

  const books = ObjectsArraySchema.parse(json.data.books);

  return books;
};

//.........................PROTECTED AREA PICTURES.........................//
export const getProtectedAreaPictures = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
  categories,
  collections,
}: {
  first: number | null,
  offset?: number | null,
  search?: string,
  sort?: string,
  categories?: string,
  collections?: string,
}): Promise<ObjectsArrayType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetProtectedAreaPictures {
      protectedAreaPictures(
        first: ${first}, 
        offset: ${offset}, 
        orderBy: [{
          field: ${sort.split(':')[0]},
          direction: ${sort.split(':')[1]}
        }],
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
    throw new Error("Failed to fetch data 'ProtectedAreaPictures'");
  }

  const json = await res.json() as { data: { protectedAreaPictures: ObjectsArrayType } };

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  if (json.data.protectedAreaPictures.totalCount === 0) {
    notFound()
  }

  const protectedAreaPictures = ObjectsArraySchema.parse(json.data.protectedAreaPictures);

  return protectedAreaPictures;
};