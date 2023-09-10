import "server-only";

import { notFound } from "next/navigation";
import getMultiFilter from "../utils/getMultiFilter";
import { ArtiFilters } from "@siberiana/schemas";

type Entitys = "licenses" | "cultures" | "sets" | "monuments" | "techniques"

type ArtiQueryType = {
  entity?: Entitys,
  search?: string,
  categories?: string,
  collections?: string,
  countryIds?: string,
  regionIds?: string,
  districtIds?: string,
  settlementIds?: string,
  licenseIds?: string,
  cultureIds?: string,
  setIds?: string,
  monumentIds?: string,
  techniqueIds?: string,
}

export const artifacts = `
  artifacts {
    displayName
    collection {
      slug
      category {
        slug
      }
    }
    license {
      id
    }
    culturalAffiliation {
      id
    }
    set {
      id
    }
    monument {
      id
    }
    techniques {
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
`

function ArtiQuery({ 
  entity,
  search = "",
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
}: ArtiQueryType) {
  const queryString = /* GraphGL */ `
    query {
      ${entity}(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        where: {
          hasArtifactsWith: [{
            hasCollectionWith: [
              ${!!collections ? `{slugIn: [${getMultiFilter(collections)}]},` : ''}
              ${!!categories ? `{
                hasCategoryWith: [
                  {slugIn: [${getMultiFilter(categories)}]}
                ]
              },` : ''}
            ],
            hasLocationWith: [
              ${!!countryIds ? `{hasCountryWith: [ {idIn: [${getMultiFilter(countryIds)}]} ]}` : ''}
              ${!!regionIds ? `{hasRegionWith: [ {idIn: [${getMultiFilter(regionIds)}]} ]}` : ''}
              ${!!districtIds ? `{hasDistrictWith: [ {idIn: [${getMultiFilter(districtIds)}]} ]}` : ''}
              ${!!settlementIds ? `{hasSettlementWith: [ {idIn: [${getMultiFilter(settlementIds)}]} ]}` : ''}
            ],
            hasLicenseWith: [ ${!!licenseIds ? `{idIn: [${getMultiFilter(licenseIds)}]}` : ''} ],
            hasCulturalAffiliationWith: [ ${!!cultureIds ? `{idIn: [${getMultiFilter(cultureIds)}]}` : ''} ],
            hasSetWith: [ ${!!setIds ? `{idIn: [${getMultiFilter(setIds)}]}` : ''} ],
            hasMonumentWith: [ ${!!monumentIds ? `{idIn: [${getMultiFilter(monumentIds)}]}` : ''} ],
            hasTechniquesWith : [ ${!!techniqueIds ? `{idIn: [${getMultiFilter(techniqueIds)}]}` : ''} ],
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
            ${artifacts}
          }
        }
      }
    }
  `;
  return queryString
}

//.........................LICENSES.........................//
export const getLicensesFilter = async (args: ArtiQueryType): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };

  const query = ArtiQuery({
    entity: "licenses",
    ...args
  })

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
    throw new Error("Failed to fetch data 'Licenses Artifacts Filter'");
  }
  
  const json = await res.json() as { data: { licenses: ArtiFilters } };
  
  if (json.data.licenses.totalCount === 0) {
    notFound()
  }
  
  const licenses = ArtiFilters.parse(json.data.licenses);
  
  return licenses;
};

//.........................CULTURES.........................//
export const getCulturesFilter = async (args: ArtiQueryType): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };

  const query = ArtiQuery({
    entity: "cultures",
    ...args
  })

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
    throw new Error("Failed to fetch data 'Cultures Filter'");
  }
  
  const json = await res.json() as { data: { cultures: ArtiFilters } };
  
  if (json.data.cultures.totalCount === 0) {
    notFound()
  }
  
  const cultures = ArtiFilters.parse(json.data.cultures);
  
  return cultures;
};

//.........................SETS.........................//
export const getSetsFilter = async (args: ArtiQueryType): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };

  const query = ArtiQuery({
    entity: "sets",
    ...args
  })
 
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
    throw new Error("Failed to fetch data 'Sets Filter'");
  }
  
  const json = await res.json() as { data: { sets: ArtiFilters } };
  
  if (json.data.sets.totalCount === 0) {
    notFound()
  }
  
  const sets = ArtiFilters.parse(json.data.sets);
  
  return sets;
};

//.........................MONUMENTS.........................//
export const getMonumentsFilter = async (args: ArtiQueryType): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };

  const query = ArtiQuery({
    entity: "monuments",
    ...args
  })
 
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
    throw new Error("Failed to fetch data 'Monuments Filter'");
  }
  
  const json = await res.json() as { data: { monuments: ArtiFilters } };
  
  if (json.data.monuments.totalCount === 0) {
    notFound()
  }
  
  const monuments = ArtiFilters.parse(json.data.monuments);
  
  return monuments;
};  
  
//.........................TECHNIQUES.........................//
export const getTechniquesFilter = async (args: ArtiQueryType): Promise<ArtiFilters> => {

  const headers = { "Content-Type": "application/json" };

  const query = ArtiQuery({
    entity: "techniques",
    ...args
  })
  
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
    throw new Error("Failed to fetch data 'Techniques Filter'");
  }
  
  const json = await res.json() as { data: { techniques: ArtiFilters } };
  
  if (json.data.techniques.totalCount === 0) {
    notFound()
  }
  
  const techniques = ArtiFilters.parse(json.data.techniques);
  
  return techniques;
};
  