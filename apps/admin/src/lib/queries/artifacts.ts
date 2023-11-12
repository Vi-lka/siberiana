"server-only";

import { notFound } from "next/navigation";

import {
  ArtifactsArray,
  CulturesArray,
  MaterialsArray,
  TechniquesArray,
} from "@siberiana/schemas";

//.........................ARTIFACTS.........................//
export const getArtifacts = async ({
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
}): Promise<ArtifactsArray> => {
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
          description
          primaryImageURL
          additionalImagesUrls
          admissionDate
          chemicalComposition
          typology
          weight
          width
          height
          length
          depth
          diameter
          datingStart
          datingEnd
          dating
          dimensions
          inventoryNumber
          kpNumber
          goskatalogNumber
          externalLink
          collection {
            id
            slug
            displayName
            category {
              slug
              displayName
            }
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
          donor {
            id
            displayName
          }
          license {
            id
            displayName
          }
          mediums {
            id
            displayName
          }
          authors {
            id
            displayName
          }
          projects {
            id
            displayName
          }
          publications {
            id
            displayName
          }
          techniques {
            id
            displayName
          }
          culturalAffiliation {
            id
            displayName
          }
          set {
            id
            displayName
          }
          monument {
            id
            displayName
          }
          model {
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
    throw new Error(`Failed to fetch data 'Artifacts'`);
  }

  const json = (await res.json()) as { data: { artifacts: ArtifactsArray } };
  if (json.data.artifacts.totalCount === 0) {
    notFound();
  }

  const artifacts = ArtifactsArray.parse(json.data.artifacts);

  return artifacts;
};

//.........................CULTURES.........................//
export const getCultures = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<CulturesArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetCultures {
    cultures(
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
          artifacts {
            id
          }
          petroglyphs {
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
    throw new Error(`Failed to fetch data 'Cultures'`);
  }

  const json = (await res.json()) as { data: { cultures: CulturesArray } };
  if (json.data.cultures.totalCount === 0) {
    notFound();
  }

  const cultures = CulturesArray.parse(json.data.cultures);

  return cultures;
};

//.........................MATERIALS.........................//
export const getMaterials = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<MaterialsArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetMaterials {
    media(
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
          artifacts {
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
    throw new Error(`Failed to fetch data 'Materials'`);
  }

  const json = (await res.json()) as { data: { media: MaterialsArray } };
  if (json.data.media.totalCount === 0) {
    notFound();
  }

  const media = MaterialsArray.parse(json.data.media);

  return media;
};

//.........................TECHNIQUES.........................//
export const getTechniques = async ({
  first,
  offset = 0,
  search = "",
  sort = "CREATED_AT:DESC",
}: {
  first: number | null;
  offset?: number | null;
  search?: string;
  sort?: string;
}): Promise<TechniquesArray> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
  query GetTechniques {
    techniques(
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
          artifacts {
            id
          }
          art {
            id
          }
          petroglyphs {
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
    throw new Error(`Failed to fetch data 'Techniques'`);
  }

  const json = (await res.json()) as { data: { techniques: TechniquesArray } };
  if (json.data.techniques.totalCount === 0) {
    notFound();
  }

  const techniques = TechniquesArray.parse(json.data.techniques);

  return techniques;
};
