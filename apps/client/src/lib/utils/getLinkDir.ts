export default function getLinkDir(link: string): string {
  try {
    new URL(link);
  } catch (error) {
    return link;
  }

  const url = new URL(link);
  const domain = url.hostname.replace("www.", "");

  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const pathNestedRoutes = url.pathname.split("/").filter((v) => v.length > 0);

  const path = pathNestedRoutes.join("/");
  const search = url.search;
  const hash = url.hash;
  const internalLink = path + search + hash;

  const nextDomain = new URL(
    process.env.NEXT_PUBLIC_URL as string,
  ).hostname.replace("www.", "");

  if (domain === "localhost" || domain === nextDomain) {
    return `/${internalLink}`;
  } else {
    console.log("OUT: ", url.href);
    return url.href;
  }
}
