import type { ProjectType } from "@siberiana/schemas";

export const getProjects = async (): Promise<ProjectType[]> => {
    const headers = { 'Content-Type': 'application/json' };
    const query = /* GraphGL */ `
      query Projects {
        projects(sort: "id", locale: "ru") {
          data {
            id
            attributes {
              Name
              Short_description
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
    `
    const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          query: query,
        }),
        next: { tags: ['strapi'] }
    });

    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return json.data?.projects.data;
}