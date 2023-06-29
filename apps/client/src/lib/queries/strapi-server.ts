import "server-only";

import type { ProjectsType } from "@siberiana/schemas";

export const getProjects = async (locale: string): Promise<ProjectsType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Projects {
      projects(sort: "order:asc", locale: "${locale}") {
        data {
          attributes {
            Name
            Description
            Content
            Image {
              data {
                attributes {
                  url
                }
              }
            }
          }
        }
      }
    }
  `;
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query,
    }),
    next: { tags: ["strapi"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data 'Projects'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // await new Promise((resolve) => setTimeout(resolve, 1000));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return json.data?.projects.data;
};
