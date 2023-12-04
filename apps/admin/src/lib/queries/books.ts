import { notFound } from "next/navigation";

import { BookGenresArray, BooksArray, PeriodicalsArray } from "@siberiana/schemas";

//.........................BOOKS.........................//
export const getBooks = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
  category,
  collection,
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
  category?: string;
  collection?: string;
}): Promise<BooksArray> => {
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
          hasCollectionWith: [
            ${!!collection ? `{slug: "${collection}"},` : ""}
            ${
              !!category
                ? `{
              hasCategoryWith: [
                {slug: "${category}"}
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
            id
            status
            displayName
            abbreviation
            description
            externalLink
            primaryImageURL
            additionalImagesUrls
            year
            files
            collection {
              id
              slug
              displayName
              category {
                slug
                displayName
              }
            }
            bookGenres {
              id
              displayName
            }
            authors {
              id
              displayName
            }
            periodical {
              id
              displayName
            }
            publisher {
              id
              displayName
            }
            license {
              id
              displayName
            }
            library {
              id
              displayName
            }
            location {
              id
              displayName
            }
            country {
              id
              displayName
            }
            region {
             id displayName 
            }
            district {
             id
             displayName 
            }
            settlement {
              id
              displayName
            }
            createdAt
            createdBy
            updatedAt
            updatedBy
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
    throw new Error(`Failed to fetch data 'Books'`);
  }

  const json = (await res.json()) as { data: { books: BooksArray } };
  if (json.data.books.totalCount === 0) {
    notFound();
  }

  const books = BooksArray.parse(json.data.books);

  return books;
};

//.........................BOOK GENRES.........................//
export const getBookGenres = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<BookGenresArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetBookGenres {
    bookGenres(
      first: ${first}, 
      offset: ${offset}, 
      orderBy: [{
        field: ${sort.split(":")[0]},
        direction: ${sort.split(":")[1]}
      }],
      where: {
        displayNameContainsFold: "${search}"
      }
    ) {
      totalCount
      edges {
        node {
          id
          displayName
          description
          externalLink
          books {
            id
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
    throw new Error(`Failed to fetch data 'BookGenres'`);
  }

  const json = (await res.json()) as { data: { bookGenres: BookGenresArray } };
  if (json.data.bookGenres.totalCount === 0) {
    notFound();
  }

  const bookGenres = BookGenresArray.parse(json.data.bookGenres);

  return bookGenres;
};

//.........................PERIODICALS.........................//
export const getPeriodicals = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<PeriodicalsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetPeriodicals {
    periodicals(
      first: ${first}, 
      offset: ${offset}, 
      orderBy: [{
        field: ${sort.split(":")[0]},
        direction: ${sort.split(":")[1]}
      }],
      where: {
        displayNameContainsFold: "${search}"
      }
    ) {
      totalCount
      edges {
        node {
          id
          displayName
          description
          externalLink
          books {
            id
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
    throw new Error(`Failed to fetch data 'Periodicals'`);
  }

  const json = (await res.json()) as { data: { periodicals: PeriodicalsArray } };
  if (json.data.periodicals.totalCount === 0) {
    notFound();
  }

  const periodicals = PeriodicalsArray.parse(json.data.periodicals);

  return periodicals;
};