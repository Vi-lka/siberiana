import { Categories, Collections } from "@siberiana/schemas";
import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";

//.........................CATEGORIES.........................//
export const getCategories = async ({
    first,
    offset = 0,
    search = "",
    sort = "DISPLAY_NAME:ASC",
    artType,
    artifactsType,
    booksType,
    PAPType,
  }: {
    first: number | null,
    offset?: number | null,
    search?: string,
    sort?: string,
    artType?: boolean,
    artifactsType?: boolean,
    booksType?: boolean,
    PAPType?: boolean
  }): Promise<Categories> => {
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
          where: {
            ${(!!artType || !!artifactsType || !!booksType || !!PAPType)
                ? `
                hasCollectionsWith: [{
                  typeIn: [
                    ${!!artType ? `art,`: ""}
                    ${!!artifactsType ? `artifacts,`: ""}
                    ${!!booksType ? `books,`: ""}
                    ${!!PAPType ? `protected_area_pictures,`: ""}
                  ]
                }],
                ` : ''
            }
            or: [ 
              {displayNameContainsFold: "${search}"}, 
              {descriptionContainsFold: "${search}"}, 
              {abbreviationContainsFold: "${search}"} 
            ]
          }
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
                displayName
                type
                slug
              }
              createdBy
              createdAt
              updatedBy
              updatedAt
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
      cache: 'no-store'
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error("Failed to fetch data 'Categories'");
    }
  
    const json = await res.json() as { data: { categories: Categories } };
  
    if ((json.data.categories.totalCount === 0) || (json.data.categories.edges.length === 0)) {
      notFound()
    }
  
    const categories = Categories.parse(json.data?.categories);
  
    return categories;
  };
  
  //.........................COLLECTIONS.........................//
  export const getCollections = async ({
    first,
    slug,
    offset = 0,
    search = "",
    sort = "DISPLAY_NAME:ASC",
    categories,
    artType,
    artifactsType,
    booksType,
    PAPType,
  }: {
    first: number | null,
    slug?: string,
    offset?: number | null,
    search?: string,
    sort?: string,
    categories?: string,
    artType?: boolean,
    artifactsType?: boolean,
    booksType?: boolean,
    PAPType?: boolean,
  }): Promise<Collections> => {
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
            ${!!slug ? `slug: "${slug}",` : ""}
            typeIn: [
              ${!!artType ? `art,`: ""}
              ${!!artifactsType ? `artifacts,`: ""}
              ${!!booksType ? `books,`: ""}
              ${!!PAPType ? `protected_area_pictures,`: ""}
            ],
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
              type
              slug
              displayName
              abbreviation
              primaryImageURL
              description
              category {
                id
                displayName
              }
              createdBy
              createdAt
              updatedBy
              updatedAt
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
      cache: 'no-store'
    });
  
    if (!res.ok) {
      // Log the error to an error reporting service
      const err = await res.text();
      console.log(err);
      // Throw an error
      throw new Error("Failed to fetch data 'Collections'");
    }
  
    const json = await res.json() as { data: { collections: Collections } };
  
    if ((json.data.collections.totalCount === 0) || (json.data.collections.edges.length === 0)) {
      notFound()
    }
  
    const collections = Collections.parse(json.data?.collections);
  
    return collections;
  };