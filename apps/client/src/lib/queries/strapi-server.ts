import "server-only";

import {
  AboutSchema,
  CustomBlockSchema,
  FAQSchema,
  OrganizationBySlugSchema,
  OrganizationsSchema,
  ProjectsSchema,
  ServicesSchema,
  SliderSchema,
} from "@siberiana/schemas";
import type {
  AboutType,
  CustomBlockType,
  FAQType,
  OrganizationBySlugType,
  OrganizationsType,
  ProjectsType,
  ServicesType,
  SliderType,
} from "@siberiana/schemas";
import { notFound } from "next/navigation";

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

export const getCustomBlock = async (): Promise<CustomBlockType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query CustomBlock {
      custom {
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!json.data.custom.data) {
    notFound()
  }

  const data = CustomBlockSchema.parse(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    json.data?.custom.data?.attributes.content,
  );

  return data;
};

export const getOrganizations = async ({
  page,
  per,
  sort = "order:asc",
  search = "",
  consortium
}: {
  page: number,
  per: number,
  sort?: string,
  search?: string,
  consortium?: boolean,
}): Promise<OrganizationsType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Organizations {
      organizations(
        sort: "${sort}", 
        pagination: {
          page: ${page},
          pageSize: ${per}
        },
        filters: {
          title: {
            containsi: "${search}"
          },
          ${consortium ? (
            `consortium: {
              eqi: true
            }`
          ) : ''}
        }
      ) {
        meta {
          pagination {
            total
          }
        }
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.organizations.meta.pagination.total === 0) || (json.data.organizations.data.length === 0)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const organizations = OrganizationsSchema.parse(json.data?.organizations);

  return organizations;
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
    // Log the error to an error reporting service
    const err = await res.text();
    console.log(err);
    // Throw an error
    throw new Error("Failed to fetch data 'Organization By Slug'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (json.data.organizations.data.length === 0) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const data = OrganizationBySlugSchema.parse(json.data?.organizations.data[0].attributes);

  return data;
};

export const getProjects = async ({
  page,
  per,
  sort = "order:asc",
  search = ""
}: {
  page: number,
  per: number,
  sort?: string,
  search?: string,
}): Promise<ProjectsType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Projects {
      projects(
        sort: "${sort}",
        pagination: {
          page: ${page},
          pageSize: ${per}
        },
        filters: {
          title: {
            containsi: "${search}"
          }
        }
      ) {
        meta {
          pagination {
            total
          }
        }
        data {
          attributes {
            title
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
    throw new Error("Failed to fetch data 'Projects'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.projects.meta.pagination.total === 0) || (json.data.projects.data.length === 0)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const projects = ProjectsSchema.parse(json.data?.projects);

  return projects;
};

export const getServices = async ({
  page,
  per,
  sort = "order:asc",
  search = ""
}: {
  page: number,
  per: number,
  sort?: string,
  search?: string
}): Promise<ServicesType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query Services {
      services(
        sort: "${sort}",
        pagination: {
          page: ${page},
          pageSize: ${per}
        },
        filters: {
          title: {
            containsi: "${search}"
          }
        }
      ) {
        meta {
          pagination {
            total
          }
        }
        data {
          attributes {
            title
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
    throw new Error("Failed to fetch data 'Services'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if ((json.data.services.meta.pagination.total === 0) || (json.data.services.data.length === 0)) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const services = ServicesSchema.parse(json.data?.services);

  return services;
};

export const getAbout = async (): Promise<AboutType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query About {
      about {
        data {
          attributes {
            description 
            title
            team {
              name
              description
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
    throw new Error("Failed to fetch data 'About'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!json.data.about.data) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const about = AboutSchema.parse(json.data?.about.data.attributes);

  return about;
};

export const getFAQ = async (): Promise<FAQType> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
    query FAQ {
      faq {
        data {
          attributes {
            category {
              title
              item {
                question
                answer
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
    throw new Error("Failed to fetch data 'FAQ'");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (!json.data.faq.data) {
    notFound()
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const faq = FAQSchema.parse(json.data?.faq.data.attributes);

  return faq;
};