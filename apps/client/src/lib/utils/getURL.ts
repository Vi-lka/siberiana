export type UrlOrigins = "strapi" | "storage" | "next" | undefined;

export default function getURL(url: string | undefined, origin: UrlOrigins): string {
  if (url === undefined) {
    return `/images/image-placeholder.png`
  }

  switch (origin) {
    case "strapi":
      return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${url}`;

    case "storage":
      return url;

    case "next":
      return url;

    default:
      return url;
  }
}
