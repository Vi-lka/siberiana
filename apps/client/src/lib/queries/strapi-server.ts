import "server-only";

import type { CustomBlockType, ProjectsType, SliderType } from "@siberiana/schemas";

export const getSlider = async (): Promise<SliderType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Slider {
      slider {
        data {
          attributes {
            Images {
              data {
                attributes {
                  url
                  alternativeText
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
    throw new Error("Failed to fetch data 'Slider'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return json.data?.slider.data.attributes.Images.data;
};

export const getCustomBlock = async (locale: string): Promise<CustomBlockType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Custom {
      custom(locale: "${locale}") {
        data {
          attributes {
            content {
              title
              url
              textUrl
              list(sort: "order:asc") {
                title
                url
                img {
                  data {
                    attributes {
                      url
                      alternativeText
                    }
                  }
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
    throw new Error("Failed to fetch data 'CustomBlock'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return json.data?.custom.data.attributes.content;
};

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
