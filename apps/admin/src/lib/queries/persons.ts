import { PersonsArray } from "@siberiana/schemas";
import { notFound } from "next/navigation";

//.........................PERSONS.........................//
export const getPersons = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<PersonsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetPersons {
    persons(
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
          givenName
          familyName
          patronymicName
          gender
          description
          affiliation {
            id
            displayName
          }
          occupation
          address
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
    throw new Error(`Failed to fetch data 'Persons'`);
  }

  const json = (await res.json()) as { data: { persons: PersonsArray } };
  
  if (json.data.persons.totalCount === 0) {
    notFound();
  }

  const persons = PersonsArray.parse(json.data.persons);

  return persons;
};