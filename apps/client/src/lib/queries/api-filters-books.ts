import "server-only";

import { notFound } from "next/navigation";

import { BooksFilters } from "@siberiana/schemas";

import getMultiFilter from "../utils/getMultiFilter";

type Entitys = "bookGenres" | "licenses";

type BooksQueryType = {
  entity?: Entitys;
  search?: string;
  categories?: string;
  collections?: string;
  countryIds?: string;
  regionIds?: string;
  districtIds?: string;
  settlementIds?: string;
  bookGenreIds?: string;
  licenseIds?: string;
};

export const books = `
    books {
        displayName
        collection {
            slug
            category {
                slug
            }
        }
        bookGenres {
            id
        }
        license {
            id
        }
        location {
            country {
                id
            }
            region {
                id
            }
            district {
                id
            }
            settlement {
                id
            }
        }
  }
`;

function BooksQuery({
  entity,
  search = "",
  categories,
  collections,
  countryIds,
  regionIds,
  districtIds,
  settlementIds,
  bookGenreIds,
  licenseIds,
}: BooksQueryType) {
  const queryString = /* GraphGL */ `
    query {
      ${entity}(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        where: {
          hasBooksWith: [{
            status: listed,
            hasCollectionWith: [
              ${
                !!collections
                  ? `{slugIn: [${getMultiFilter(collections)}]},`
                  : ""
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
                  ? `{hasRegionWith: [ {idIn: [${getMultiFilter(
                      regionIds,
                    )}]} ]}`
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
              {displayNameContainsFold: "${search}"}
            ]
          }]
        }
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            ${books}
          }
        }
      }
    }
  `;
  return queryString;
}

//.........................LICENSES.........................//
export const getLicensesFilter = async (
  args: BooksQueryType,
): Promise<BooksFilters> => {
  const headers = { "Content-Type": "application/json" };

  const query = BooksQuery({
    entity: "licenses",
    ...args,
  });

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
    throw new Error("Failed to fetch data 'Licenses Books Filter'");
  }

  const json = (await res.json()) as { data: { licenses: BooksFilters } };

  if (json.data.licenses.totalCount === 0) {
    notFound();
  }

  const licenses = BooksFilters.parse(json.data.licenses);

  return licenses;
};

//.........................BOOK GENRES.........................//
export const getBookGenresFilter = async (
  args: BooksQueryType,
): Promise<BooksFilters> => {
  const headers = { "Content-Type": "application/json" };

  const query = BooksQuery({
    entity: "bookGenres",
    ...args,
  });

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
    throw new Error("Failed to fetch data 'Books Genres Filter'");
  }

  const json = (await res.json()) as { data: { bookGenres: BooksFilters } };

  if (json.data.bookGenres.totalCount === 0) {
    notFound();
  }

  const bookGenres = BooksFilters.parse(json.data.bookGenres);

  return bookGenres;
};
