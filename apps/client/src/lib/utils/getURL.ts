export type UrlOrigins = "strapi" | "storage" | "next" | undefined;

export default function getURL(url: string, origin: UrlOrigins): string {
  switch (origin) {
    case "strapi":
      return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;

    case "storage":
      return `${process.env.NEXT_PUBLIC_GO_API_URL}${url}`;

    case "next":
      return url;

    default:
      return url;
  }
}
