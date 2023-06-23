import type { LocaleType, ProjectType } from "@siberiana/schemas";

// Если runtime = 'nodejs' (по дефолту), при билде получаем [TypeError: fetch failed], [https://github.com/vercel/next.js/issues/44062]
// если указать имя контейнера NEXT_PUBLIC_STRAPI_API_URL=http://siberiana-strapi:1337 - errno: -3008, code: 'ENOTFOUND',
// если указать IP внешний NEXT_PUBLIC_STRAPI_API_URL=http://127.0.0.1:1337 - errno: -111, code: 'ECONNREFUSED', - localhost тоже не подходит
// если указать IP внутренний NEXT_PUBLIC_STRAPI_API_URL=http://172.18.0.3:1337 - cause: ConnectTimeoutError: Connect Timeout Error
// Возможно проблема в fetch() nodejs выше 16-ой версии
export const runtime = "edge";

export const getLangs = async (): Promise<{
  localesCodes: string[];
  localesNames: string[];
}> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
      query i18NLocales {
        i18NLocales {
          data {
            attributes {
              name
              code
            }
          }
        }
      }
    `;
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query: query,
    }),
    next: { tags: ["strapi"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();
  const localesCodes = [] as string[];
  const localesNames = [] as string[];

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  json.data.i18NLocales.data.forEach((lang: LocaleType) => {
    if (!localesCodes.includes(lang.attributes.code)) {
      localesCodes.push(lang.attributes.code);
    }
    if (!localesNames.includes(lang.attributes.name)) {
      localesNames.push(lang.attributes.name);
    }
  });

  return { localesCodes, localesNames };
};

export const getProjects = async (locale: string): Promise<ProjectType[]> => {
  const headers = { "Content-Type": "application/json" };
  const query = /* GraphGL */ `
      query Projects {
        projects(sort: "id", locale: "${locale}") {
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
    `;
  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    headers,
    method: "POST",
    body: JSON.stringify({
      query: query,
    }),
    next: { tags: ["strapi"] },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const json = await res.json();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
  return json.data?.projects.data;
};
