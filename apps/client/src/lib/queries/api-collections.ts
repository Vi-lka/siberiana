import "server-only";

import { notFound } from "next/navigation";

import { Categories, Collections, ObjectsArray } from "@siberiana/schemas";

import getMultiFilter from "../utils/getMultiFilter";

//.........................CATEGORIES.........................//
export const getCategories = async ({
  first,
  offset = 0,
  search = "",
  sort = "DISPLAY_NAME:ASC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<Categories> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Categories {
      categories(
        first: ${first}, 
        offset: ${offset},
        orderBy: [{
          field: ${sort.split(":")[0]},
          direction: ${sort.split(":")[1]}
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
              displayName
              type
              slug
            }
          }
        }
      }
    }
  `;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Categories'");
  }

  const json = (await res.json()) as { data: { categories: Categories } };

  if (
    json.data.categories.totalCount === 0 ||
    json.data.categories.edges.length === 0
  ) {
    notFound();
  }

  const categories = Categories.parse(json.data?.categories);

  return categories;
};

//.........................COLLECTIONS.........................//
export const getCollections = async ({
  first,
  offset = 0,
  search = "",
  sort = "DISPLAY_NAME:ASC",
  categories,
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
  categories?: string;
}): Promise<Collections> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Collections {
      collections(
        first: ${first}, 
        offset: ${offset},
        orderBy: [{
          field: ${sort.split(":")[0]},
          direction: ${sort.split(":")[1]}
        }],
        where: {
          ${
            !!categories
              ? `hasCategoryWith: [
              {slugIn: [${getMultiFilter(categories)}]}
            ]`
              : ""
          }
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
              slug
            }
          }
        }
      }
    }
  `;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Collections'");
  }

  const json = (await res.json()) as { data: { collections: Collections } };

  if (
    json.data.collections.totalCount === 0 ||
    json.data.collections.edges.length === 0
  ) {
    notFound();
  }

  const collections = Collections.parse(json.data?.collections);

  return collections;
};

//.........................//.........................OBJECTS.........................//.........................//

//.........................ARTIFACTS.........................//
export const getArtifacts = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
  categories,
  collections,
  countryIds,
  regionIds,
  districtIds,
  settlementIds,
  licenseIds,
  cultureIds,
  setIds,
  monumentIds,
  techniqueIds,
  model,
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
  categories?: string;
  collections?: string;
  countryIds?: string;
  regionIds?: string;
  districtIds?: string;
  settlementIds?: string;
  licenseIds?: string;
  cultureIds?: string;
  setIds?: string;
  monumentIds?: string;
  techniqueIds?: string;
  model?: boolean;
}): Promise<ObjectsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetArtifacts {
      artifacts(
        first: ${first}, 
        offset: ${offset}, 
        orderBy: [{
          field: ${sort.split(":")[0]},
          direction: ${sort.split(":")[1]}
        }],
        where: {
          status: listed,
          ${model ? `hasModel: true,` : ""}
          hasCollectionWith: [
            ${
              !!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ""
            }
            ${
              !!categories
                ? `{
              hasCategoryWith: [
                {slugIn: [${getMultiFilter(categories)}]}
              ]
            },`
                : ""
            }
          ],
          hasLocationWith: [
            ${
              !!countryIds
                ? `{hasCountryWith: [ {idIn: [${getMultiFilter(
                    countryIds,
                  )}]} ]}`
                : ""
            }
            ${
              !!regionIds
                ? `{hasRegionWith: [ {idIn: [${getMultiFilter(regionIds)}]} ]}`
                : ""
            }
            ${
              !!districtIds
                ? `{hasDistrictWith: [ {idIn: [${getMultiFilter(
                    districtIds,
                  )}]} ]}`
                : ""
            }
            ${
              !!settlementIds
                ? `{hasSettlementWith: [ {idIn: [${getMultiFilter(
                    settlementIds,
                  )}]} ]}`
                : ""
            }
          ],
          hasLicenseWith: [ ${
            !!licenseIds ? `{idIn: [${getMultiFilter(licenseIds)}]}` : ""
          } ],
          hasCulturalAffiliationWith: [ ${
            !!cultureIds ? `{idIn: [${getMultiFilter(cultureIds)}]}` : ""
          } ],
          hasSetWith: [ ${
            !!setIds ? `{idIn: [${getMultiFilter(setIds)}]}` : ""
          } ],
          hasMonumentWith: [ ${
            !!monumentIds ? `{idIn: [${getMultiFilter(monumentIds)}]}` : ""
          } ],
          hasTechniquesWith: [ ${
            !!techniqueIds ? `{idIn: [${getMultiFilter(techniqueIds)}]}` : ""
          } ],
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Artifacts'");
  }

  const json = (await res.json()) as { data: { artifacts: ObjectsArray } };

  if (json.data.artifacts.totalCount === 0) {
    notFound();
  }

  const artifacts = ObjectsArray.parse(json.data.artifacts);

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
  countryIds,
  regionIds,
  districtIds,
  settlementIds,
  licenseIds,
  bookGenreIds,
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
  categories?: string;
  collections?: string;
  countryIds?: string;
  regionIds?: string;
  districtIds?: string;
  settlementIds?: string;
  licenseIds?: string;
  bookGenreIds?: string;
}): Promise<ObjectsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetBooks {
      books(
        first: ${first}, 
        offset: ${offset}, 
        orderBy: [{
          field: ${sort.split(":")[0]},
          direction: ${sort.split(":")[1]}
        }],
        where: {
          status: listed,
          hasCollectionWith: [
            ${
              !!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ""
            }
            ${
              !!categories
                ? `{
              hasCategoryWith: [
                {slugIn: [${getMultiFilter(categories)}]}
              ]
            },`
                : ""
            }
          ],
          hasLocationWith: [
            ${
              !!countryIds
                ? `{hasCountryWith: [ {idIn: [${getMultiFilter(
                    countryIds,
                  )}]} ]}`
                : ""
            }
            ${
              !!regionIds
                ? `{hasRegionWith: [ {idIn: [${getMultiFilter(regionIds)}]} ]}`
                : ""
            }
            ${
              !!districtIds
                ? `{hasDistrictWith: [ {idIn: [${getMultiFilter(
                    districtIds,
                  )}]} ]}`
                : ""
            }
            ${
              !!settlementIds
                ? `{hasSettlementWith: [ {idIn: [${getMultiFilter(
                    settlementIds,
                  )}]} ]}`
                : ""
            }
          ],
          hasLicenseWith: [ ${
            !!licenseIds ? `{idIn: [${getMultiFilter(licenseIds)}]}` : ""
          } ],
          hasBookGenresWith: [ ${
            !!bookGenreIds ? `{idIn: [${getMultiFilter(bookGenreIds)}]}` : ""
          } ],
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Books'");
  }

  const json = (await res.json()) as { data: { books: ObjectsArray } };

  if (json.data.books.totalCount === 0) {
    notFound();
  }

  const books = ObjectsArray.parse(json.data.books);

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
  countryIds,
  regionIds,
  districtIds,
  settlementIds,
  licenseIds,
  protectedAreaIds,
  protectedAreaCategoryIds,
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
  categories?: string;
  collections?: string;
  countryIds?: string;
  regionIds?: string;
  districtIds?: string;
  settlementIds?: string;
  licenseIds?: string;
  protectedAreaIds?: string;
  protectedAreaCategoryIds?: string;
}): Promise<ObjectsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetProtectedAreaPictures {
      protectedAreaPictures(
        first: ${first}, 
        offset: ${offset}, 
        orderBy: [{
          field: ${sort.split(":")[0]},
          direction: ${sort.split(":")[1]}
        }],
        where: {
          status: listed,
          hasCollectionWith: [
            ${
              !!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ""
            }
            ${
              !!categories
                ? `{
              hasCategoryWith: [
                {slugIn: [${getMultiFilter(categories)}]}
              ]
            },`
                : ""
            }
          ],
          hasLocationWith: [
            ${
              !!countryIds
                ? `{hasCountryWith: [ {idIn: [${getMultiFilter(
                    countryIds,
                  )}]} ]}`
                : ""
            }
            ${
              !!regionIds
                ? `{hasRegionWith: [ {idIn: [${getMultiFilter(regionIds)}]} ]}`
                : ""
            }
            ${
              !!districtIds
                ? `{hasDistrictWith: [ {idIn: [${getMultiFilter(
                    districtIds,
                  )}]} ]}`
                : ""
            }
            ${
              !!settlementIds
                ? `{hasSettlementWith: [ {idIn: [${getMultiFilter(
                    settlementIds,
                  )}]} ]}`
                : ""
            }
          ],
          hasLicenseWith: [ ${
            !!licenseIds ? `{idIn: [${getMultiFilter(licenseIds)}]}` : ""
          } ],
          hasProtectedAreaWith: [ 
            ${
              !!protectedAreaIds
                ? `{idIn: [${getMultiFilter(protectedAreaIds)}]},`
                : ""
            } 
            ${
              !!protectedAreaCategoryIds
                ? `{
              hasProtectedAreaCategoryWith: [
                {idIn: [${getMultiFilter(protectedAreaCategoryIds)}]}
              ]
            },`
                : ""
            }
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'ProtectedAreaPictures'");
  }

  const json = (await res.json()) as {
    data: { protectedAreaPictures: ObjectsArray };
  };

  if (json.data.protectedAreaPictures.totalCount === 0) {
    notFound();
  }

  const protectedAreaPictures = ObjectsArray.parse(
    json.data.protectedAreaPictures,
  );

  return protectedAreaPictures;
};

//.........................ARTS.........................//
export const getArts = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
  categories,
  collections,
  // countryIds,
  // regionIds,
  // districtIds,
  // settlementIds,
  // licenseIds,
  techniqueIds,
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
  categories?: string;
  collections?: string;
  countryIds?: string;
  regionIds?: string;
  districtIds?: string;
  settlementIds?: string;
  licenseIds?: string;
  techniqueIds?: string;
}): Promise<ObjectsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetArts {
      arts(
        first: ${first}, 
        offset: ${offset}, 
        orderBy: [{
          field: ${sort.split(":")[0]},
          direction: ${sort.split(":")[1]}
        }],
        where: {
          status: listed,
          hasCollectionWith: [
            ${
              !!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ""
            }
            ${
              !!categories
                ? `{
              hasCategoryWith: [
                {slugIn: [${getMultiFilter(categories)}]}
              ]
            },`
                : ""
            }
          ],
          hasTechniquesWith: [ ${
            !!techniqueIds ? `{idIn: [${getMultiFilter(techniqueIds)}]}` : ""
          } ],
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Arts'");
  }

  const json = (await res.json()) as { data: { arts: ObjectsArray } };

  if (json.data.arts.totalCount === 0) {
    notFound();
  }

  const arts = ObjectsArray.parse(json.data.arts);

  return arts;
};

//.........................HERBARIA.........................//
export const getHerbariums = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
  categories,
  collections,
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
  categories?: string;
  collections?: string;
  countryIds?: string;
  regionIds?: string;
  districtIds?: string;
  settlementIds?: string;
  licenseIds?: string;
  techniqueIds?: string;
}): Promise<ObjectsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetHerbaria {
      herbaria(
        first: ${first}, 
        offset: ${offset}, 
        orderBy: [{
          field: ${sort.split(":")[0]},
          direction: ${sort.split(":")[1]}
        }],
        where: {
          status: listed,
          hasCollectionWith: [
            ${
              !!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ""
            }
            ${
              !!categories
                ? `{
              hasCategoryWith: [
                {slugIn: [${getMultiFilter(categories)}]}
              ]
            },`
                : ""
            }
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Herbaria'");
  }

  const json = (await res.json()) as { data: { herbaria: ObjectsArray } };

  if (json.data.herbaria.totalCount === 0) {
    notFound();
  }

  const herbariums = ObjectsArray.parse(json.data.herbaria);

  return herbariums;
};

//.........................DENDTOCHRONOLOGIES.........................//
export const getDendrochronologies = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
  categories?: string;
  collections?: string;
  countryIds?: string;
  regionIds?: string;
  districtIds?: string;
  settlementIds?: string;
  licenseIds?: string;
  techniqueIds?: string;
}): Promise<ObjectsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query GetDendrochronologies {
      dendrochronologies(
        first: ${first}, 
        offset: ${offset}, 
        orderBy: [{
          field: ${sort.split(":")[0]},
          direction: ${sort.split(":")[1]}
        }],
        where: {
          status: listed,
          or: [ 
            {displayNameContainsFold: "${search}"}, 
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
    {
      headers,
      method: "POST",
      body: JSON.stringify({
        query,
      }),
      cache: "no-store",
    },
  );

  if (!res.ok) {
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Dendrochronologies'");
  }

  const json = (await res.json()) as { data: { dendrochronologies: ObjectsArray } };

  if (json.data.dendrochronologies.totalCount === 0) {
    notFound();
  }

  const dendrochronologies = ObjectsArray.parse(json.data.dendrochronologies);

  return dendrochronologies;
};