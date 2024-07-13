import { PublicationsArray } from "@siberiana/schemas";
import { notFound } from "next/navigation";

//.........................PUBLICATIONS.........................//
export const getPublications = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<PublicationsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetPublications {
    publications(
      first: ${first}, 
      offset: ${offset}, 
      orderBy: {
        field: ${sort.split(":")[0]},
        direction: ${sort.split(":")[1]}
      },
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
          artifacts {
            id
          }
          authors {
            id
            displayName
          }
          externalLink
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
    throw new Error(`Failed to fetch data 'Publications'`);
  }

  const json = (await res.json()) as { data: { publications: PublicationsArray } };
  
  if (json.data.publications.totalCount === 0) {
    notFound();
  }

  const publications = PublicationsArray.parse(json.data.publications);

  return publications;
};