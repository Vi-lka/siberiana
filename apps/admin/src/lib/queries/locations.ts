import { CountriesArray, DistrictsArray, LocationsArray, RegionsArray, SettlementsArray } from "@siberiana/schemas";
import { notFound } from "next/navigation";

//.........................LOCATIONS.........................//
export const getLocations = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<LocationsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetLocations {
    locations(
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
          country {
            id
            displayName
          }
          region {
            id
            displayName
          }
          district {
            id
            displayName
          }
          settlement {
            id
            displayName
          }
          artifacts {
            id
          }
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
    throw new Error(`Failed to fetch data 'Locations'`);
  }

  const json = (await res.json()) as { data: { locations: LocationsArray } };
  
  if (json.data.locations.totalCount === 0) {
    notFound();
  }

  const locations = LocationsArray.parse(json.data.locations);

  return locations;
};


//.........................COUNTRIES.........................//
export const getCountries = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<CountriesArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetCountries {
    countries(
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
          regions {
            id
          }
          locations {
            id
          }
          artifacts {
            id
          }
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
    throw new Error(`Failed to fetch data 'Countries'`);
  }

  const json = (await res.json()) as { data: { countries: CountriesArray } };
  
  if (json.data.countries.totalCount === 0) {
    notFound();
  }

  const countries = CountriesArray.parse(json.data.countries);

  return countries;
};

//.........................REGIONS.........................//
export const getRegions = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<RegionsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetRegions {
    regions(
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
          country {
            id
            displayName
          }
          districts {
            id
          }
          locations {
            id
          }
          artifacts {
            id
          }
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
    throw new Error(`Failed to fetch data 'Regions'`);
  }

  const json = (await res.json()) as { data: { regions: RegionsArray } };
  
  if (json.data.regions.totalCount === 0) {
    notFound();
  }

  const regions = RegionsArray.parse(json.data.regions);

  return regions;
};

//.........................DISTRICTS.........................//
export const getDistricts = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<DistrictsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetDistricts {
    districts(
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
          region {
            id
            displayName
          }
          settlements {
            id
          }
          locations {
            id
          }
          artifacts {
            id
          }
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
    throw new Error(`Failed to fetch data 'Districts'`);
  }

  const json = (await res.json()) as { data: { districts: DistrictsArray } };
  
  if (json.data.districts.totalCount === 0) {
    notFound();
  }

  const districts = DistrictsArray.parse(json.data.districts);

  return districts;
};

//.........................SETTLEMENTS.........................//
export const getSettlements = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<SettlementsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetSettlements {
    settlements(
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
          region {
            id
            displayName
          }
          district {
            id
            displayName
          }
          locations {
            id
          }
          artifacts {
            id
          }
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
    throw new Error(`Failed to fetch data 'Settlements'`);
  }

  const json = (await res.json()) as { data: { settlements: SettlementsArray } };
  
  if (json.data.settlements.totalCount === 0) {
    notFound();
  }

  const settlements = SettlementsArray.parse(json.data.settlements);

  return settlements;
};