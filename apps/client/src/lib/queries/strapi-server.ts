import "server-only";

import {
  CustomBlockSchema,
  OrganizationsSchema,
  SliderSchema,
} from "@siberiana/schemas";
import type {
  CustomBlockType,
  OrganizationBySlugType,
  OrganizationsType,
  ProjectsType,
  SliderType,
} from "@siberiana/schemas";

export const getSlider = async (): Promise<SliderType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Slider {
      slider {
        data {
          attributes {
            Images(sort: "order:asc") {
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
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Slider'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  const data = SliderSchema.parse(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    json.data?.slider.data.attributes.Images.data,
  );

  return data;
};

export const getCustomBlock = async (
  locale: string,
): Promise<CustomBlockType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query CustomBlock {
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
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Custom Block'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  const data = CustomBlockSchema.parse(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    json.data?.custom.data?.attributes.content,
  );

  return data;
};

export const getOrganizations = async (
  locale: string,
): Promise<OrganizationsType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Organizations {
      organizations(locale: "${locale}", sort: "order:asc", pagination: {limit: 5}) {
        data {
          attributes {
            title
            slug
            image {
              data {
                attributes {
                  url
                }
              }
            }
            consortium
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
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Organizations'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // await new Promise((resolve) => setTimeout(resolve, 2000));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const data = OrganizationsSchema.parse(json.data?.organizations.data);

  return data;
};

export const getOrganizationBySlug = async (
  slug: string,
): Promise<OrganizationBySlugType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query OrganizationBySlug {
      organizations(
        filters: {
          slug: {
            eq: "${slug}",
          }
        }
      ) {
        data {
          attributes {
            title
            slug
            image {
              data {
                attributes {
                  url
                }
              }
            }
            consortium
            url
            collections {
              title
              url
              textUrl
              list(sort: "order:asc") {
                title
                img {
                  data {
                    attributes {
                      url
                    }
                  }
                }
                url
              }
            }
            exhibits {
              title
              url
              textUrl
              list(sort: "order:asc") {
                name
                description
                url
                image {
                  data {
                    attributes {
                      url
                    }
                  }
                }
              }
            }
            events_organization {
              data {
                attributes {
                  title
                  url
                  textUrl
                  list(sort: "order:asc") {
                    name
                    dateStart
                    dateEnd
                    cost
                    url
                    address
                    image {
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
            contacts {
              title
              map
              schedule {
                monday
                tuesday
                wednesday
                thursday
                friday
                saturday
                sunday
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
    throw new Error("Failed to fetch data 'Organization By Slug'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return json.data?.organizations.data[0].attributes;
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
