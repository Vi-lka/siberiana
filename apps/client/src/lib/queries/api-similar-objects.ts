import type { SimilarObject } from "@siberiana/schemas";

export enum ObjectsTypes {
  PAP = "protectedAreaPictures",
  artifacts = "artifacts",
  arts = "arts",
  books = "books",
}

export async function getSimilar(
  type: ObjectsTypes,
  primaryImageURL: string,
  removeLastPath?: boolean,
): Promise<SimilarObject[]> {
  const headers = { "Content-Type": "application/json" };

  const similarRes = await fetch(
    `${process.env.NEXT_PUBLIC_ASIMILAR_API_URL}/inference?image_path=${primaryImageURL}&num_similar=${200}`,
    {
      headers,
      method: "POST",
      cache: "no-store",
    },
  );

  if (!similarRes.ok) {
    return [];
  }

  const similar = (await similarRes.json()) as { similar_images: string[] };

  const url = primaryImageURL
    .split("/")
    .slice(0, removeLastPath ? -2 : -1)
    .join("/");
  const filename = primaryImageURL.split("/").pop();

  const query = /* GraphGL */ `
  query Similar {
    ${type}(first: 4, where: { primaryImageURLIn: [${similar.similar_images
      .filter((img) => img !== filename)
      .map((img) => `"${url}/${img}"`)}]}) {
      edges {
        node {
          id
          primaryImageURL
          displayName
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
    return [];
  }

  const json = (await res.json()) as {
    data: {
      [type in ObjectsTypes]: {
        edges: {
          node: SimilarObject;
        }[];
      };
    };
  };

  return json.data[type].edges.map((e) => e.node);
}
