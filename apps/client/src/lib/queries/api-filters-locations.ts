import "server-only";

import { notFound } from "next/navigation";

import { ArtiFilters, BooksFilters, PAPFilters } from "@siberiana/schemas";

import getMultiFilter from "../utils/getMultiFilter";
import { artifacts } from "./api-filters-artifacts";
import { books } from "./api-filters-books";
import { protectedAreaPictures } from "./api-filters-pap";

type Entitys = "countries" | "regions" | "districts" | "settlements";

type LocationArtiQueryType = {
  entity?: Entitys;
  search?: string;
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
};
type LocationBooksQueryType = {
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
type LocationPAPQueryType = {
  entity?: Entitys;
  search?: string;
  categories?: string;
  collections?: string;
  countryIds?: string;
  regionIds?: string;
  districtIds?: string;
  settlementIds?: string;
  protectedAreaIds?: string;
  protectedAreaCategoryIds?: string;
  licenseIds?: string;
};

function LocationArtiQuery({
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
  model
}: LocationArtiQueryType) {
  const queryString = /* GraphGL */ `
    query {
      ${entity}(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        where: {
          hasLocationsWith: [{
            hasCountryWith: [ ${
              !!countryIds ? `{idIn: [${getMultiFilter(countryIds)}]}` : ""
            } ],
            hasRegionWith: [ ${
              !!regionIds ? `{idIn: [${getMultiFilter(regionIds)}]}` : ""
            } ],
            hasDistrictWith: [ ${
              !!districtIds ? `{idIn: [${getMultiFilter(districtIds)}]}` : ""
            } ],
            hasSettlementWith: [ ${
              !!settlementIds
                ? `{idIn: [${getMultiFilter(settlementIds)}]}`
                : ""
            } ],
            hasArtifactsWith: [{
              status: listed,
              ${model ? `hasModel: true,` : '' }
              hasCollectionWith: [
                ${
                  !!collections
                    ? `{slugIn: [${getMultiFilter(collections)}]},`
                    : ""
                }
                ${
                  !!categories
                    ? `{
                  hasCategoryWith: [ {slugIn: [${getMultiFilter(categories)}]} ]
                },`
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
              hasTechniquesWith : [ ${
                !!techniqueIds
                  ? `{idIn: [${getMultiFilter(techniqueIds)}]}`
                  : ""
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
            }]
          }]
        }
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            locations {
              id
              ${artifacts}
            }
          }
        }
      }
    }
  `;
  return queryString;
}

function LocationBooksQuery({
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
}: LocationBooksQueryType) {
  const queryString = /* GraphGL */ `
    query {
      ${entity}(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        where: {
          hasLocationsWith: [{
            hasCountryWith: [ ${
              !!countryIds ? `{idIn: [${getMultiFilter(countryIds)}]}` : ""
            } ],
            hasRegionWith: [ ${
              !!regionIds ? `{idIn: [${getMultiFilter(regionIds)}]}` : ""
            } ],
            hasDistrictWith: [ ${
              !!districtIds ? `{idIn: [${getMultiFilter(districtIds)}]}` : ""
            } ],
            hasSettlementWith: [ ${
              !!settlementIds
                ? `{idIn: [${getMultiFilter(settlementIds)}]}`
                : ""
            } ],
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
              hasLicenseWith: [ ${
                !!licenseIds ? `{idIn: [${getMultiFilter(licenseIds)}]}` : ""
              } ],
              hasBookGenresWith: [ ${
                !!bookGenreIds
                  ? `{idIn: [${getMultiFilter(bookGenreIds)}]}`
                  : ""
              } ],
              or: [ 
                {displayNameContainsFold: "${search}"}
              ]
            }]
          }]
        }
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            locations {
              id
              ${books}
            }
          }
        }
      }
    }
  `;
  return queryString;
}

function LocationPAPQuery({
  entity,
  search = "",
  categories,
  collections,
  countryIds,
  regionIds,
  districtIds,
  settlementIds,
  protectedAreaIds,
  protectedAreaCategoryIds,
  licenseIds,
}: LocationPAPQueryType) {
  const queryString = /* GraphGL */ `
    query {
      ${entity}(
        orderBy: [ {field: DISPLAY_NAME, direction: ASC} ],
        where: {
          hasLocationsWith: [{
            hasCountryWith: [ ${
              !!countryIds ? `{idIn: [${getMultiFilter(countryIds)}]}` : ""
            } ],
            hasRegionWith: [ ${
              !!regionIds ? `{idIn: [${getMultiFilter(regionIds)}]}` : ""
            } ],
            hasDistrictWith: [ ${
              !!districtIds ? `{idIn: [${getMultiFilter(districtIds)}]}` : ""
            } ],
            hasSettlementWith: [ ${
              !!settlementIds
                ? `{idIn: [${getMultiFilter(settlementIds)}]}`
                : ""
            } ],
            hasProtectedAreaPicturesWith: [{
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
                {displayNameContainsFold: "${search}"}
              ]
            }]
          }]
        }
      ) {
        totalCount
        edges {
          node {
            __typename
            id
            displayName
            locations {
              id
              ${protectedAreaPictures}
            }
          }
        }
      }
    }
  `;
  return queryString;
}

// Oh my God... What I did, this this needs to be wrapped in one abstraction

//..................................................COUNTRIES..................................................//
export const getArtiCountriesFilter = async (
  args: LocationArtiQueryType,
): Promise<ArtiFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationArtiQuery({
    entity: "countries",
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
    throw new Error("Failed to fetch data 'Countries Artifacts Filter'");
  }
  const json = (await res.json()) as { data: { countries: ArtiFilters } };
  if (json.data.countries.totalCount === 0) {
    notFound();
  }
  const countries = ArtiFilters.parse(json.data.countries);
  return countries;
};

export const getBooksCountriesFilter = async (
  args: LocationBooksQueryType,
): Promise<BooksFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationBooksQuery({
    entity: "countries",
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
    throw new Error("Failed to fetch data 'Countries Books Filter'");
  }
  const json = (await res.json()) as { data: { countries: BooksFilters } };
  if (json.data.countries.totalCount === 0) {
    notFound();
  }
  const countries = BooksFilters.parse(json.data.countries);
  return countries;
};

export const getPAPCountriesFilter = async (
  args: LocationPAPQueryType,
): Promise<PAPFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationPAPQuery({
    entity: "countries",
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
    throw new Error("Failed to fetch data 'Countries PAP Filter'");
  }
  const json = (await res.json()) as { data: { countries: PAPFilters } };
  if (json.data.countries.totalCount === 0) {
    notFound();
  }
  const countries = PAPFilters.parse(json.data.countries);
  return countries;
};

//..................................................REGION..................................................//
export const getArtiRegionsFilter = async (
  args: LocationArtiQueryType,
): Promise<ArtiFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationArtiQuery({
    entity: "regions",
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
    throw new Error("Failed to fetch data 'Regions Artifacts Filter'");
  }
  const json = (await res.json()) as { data: { regions: ArtiFilters } };
  if (json.data.regions.totalCount === 0) {
    notFound();
  }
  const regions = ArtiFilters.parse(json.data.regions);
  return regions;
};

export const getBooksRegionsFilter = async (
  args: LocationBooksQueryType,
): Promise<BooksFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationBooksQuery({
    entity: "regions",
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
    throw new Error("Failed to fetch data 'Regions Books Filter'");
  }
  const json = (await res.json()) as { data: { regions: BooksFilters } };
  if (json.data.regions.totalCount === 0) {
    notFound();
  }
  const regions = BooksFilters.parse(json.data.regions);
  return regions;
};

export const getPAPRegionsFilter = async (
  args: LocationPAPQueryType,
): Promise<PAPFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationPAPQuery({
    entity: "regions",
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
    throw new Error("Failed to fetch data 'Regions PAP Filter'");
  }
  const json = (await res.json()) as { data: { regions: PAPFilters } };
  if (json.data.regions.totalCount === 0) {
    notFound();
  }
  const regions = PAPFilters.parse(json.data.regions);
  return regions;
};

//..................................................DISTRICT..................................................//
export const getArtiDistrictsFilter = async (
  args: LocationArtiQueryType,
): Promise<ArtiFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationArtiQuery({
    entity: "districts",
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
    throw new Error("Failed to fetch data 'Districts Artifacts Filter'");
  }
  const json = (await res.json()) as { data: { districts: ArtiFilters } };
  if (json.data.districts.totalCount === 0) {
    notFound();
  }
  const districts = ArtiFilters.parse(json.data.districts);
  return districts;
};

export const getBooksDistrictsFilter = async (
  args: LocationBooksQueryType,
): Promise<BooksFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationBooksQuery({
    entity: "districts",
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
    throw new Error("Failed to fetch data 'Districts Books Filter'");
  }
  const json = (await res.json()) as { data: { districts: BooksFilters } };
  if (json.data.districts.totalCount === 0) {
    notFound();
  }
  const districts = BooksFilters.parse(json.data.districts);
  return districts;
};

export const getPAPDistrictsFilter = async (
  args: LocationPAPQueryType,
): Promise<PAPFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationPAPQuery({
    entity: "districts",
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
    throw new Error("Failed to fetch data 'Districts PAP Filter'");
  }
  const json = (await res.json()) as { data: { districts: PAPFilters } };
  if (json.data.districts.totalCount === 0) {
    notFound();
  }
  const districts = PAPFilters.parse(json.data.districts);
  return districts;
};

//..................................................SETTLEMENTS..................................................//
export const getArtiSettlementsFilter = async (
  args: LocationArtiQueryType,
): Promise<ArtiFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationArtiQuery({
    entity: "settlements",
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
    throw new Error("Failed to fetch data 'Settlements Artifacts Filter'");
  }
  const json = (await res.json()) as { data: { settlements: ArtiFilters } };
  if (json.data.settlements.totalCount === 0) {
    notFound();
  }
  const settlements = ArtiFilters.parse(json.data.settlements);
  return settlements;
};

export const getBooksSettlementsFilter = async (
  args: LocationBooksQueryType,
): Promise<BooksFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationBooksQuery({
    entity: "settlements",
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
    throw new Error("Failed to fetch data 'Settlements Books Filter'");
  }
  const json = (await res.json()) as { data: { settlements: BooksFilters } };
  if (json.data.settlements.totalCount === 0) {
    notFound();
  }
  const settlements = BooksFilters.parse(json.data.settlements);
  return settlements;
};

export const getPAPSettlementsFilter = async (
  args: LocationPAPQueryType,
): Promise<PAPFilters> => {
  const headers = { "Content-Type": "application/json" };
  const query = LocationPAPQuery({
    entity: "settlements",
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
    throw new Error("Failed to fetch data 'Settlements PAP Filter'");
  }
  const json = (await res.json()) as { data: { settlements: PAPFilters } };
  if (json.data.settlements.totalCount === 0) {
    notFound();
  }
  const settlements = PAPFilters.parse(json.data.settlements);
  return settlements;
};
