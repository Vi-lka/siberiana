"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbsDictType } from "@siberiana/schemas";

import { useLocale } from "~/lib/utils/useLocale";

export default function Breadcrumbs({
  dict,
  slug,
  title
}: {
  dict: BreadcrumbsDictType;
  slug?: string,
  title?: string
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const locale = useLocale();

  const getTextGenerator = React.useCallback(
    (subpath: string | null) => {
      if (subpath) {
        if (subpath === slug) {
          return title
        }
        else
          return {
            organizations: dict.organizations,
            projects: dict.projects,
            objects: dict.objects,
            archaeological: dict.archaeological,
            archaeology: dict.archaeology,
          }[subpath];
      }
    },
    [dict, slug, title],
  );

  const breadcrumbs = React.useMemo(
    function generateBreadcrumbs() {
      // Remove query parameters
      const pathWithoutQuery = pathname.split("?")[0];

      // Ex:"/my/nested/path" --> ["my", "nested", "path"]
      const pathNestedRoutes = pathWithoutQuery
        .split("/")
        .filter((v) => v.length > 0);

      // Remove locale
      pathNestedRoutes.shift();

      // Create crumb list
      const crumblist = pathNestedRoutes.map((subpath, index) => {
        const href =
          `/${locale}/` + pathNestedRoutes.slice(0, index + 1).join("/");
        const title = getTextGenerator(subpath);
        return { href, title };
      });

      // Add Home Page
      const pathWithHome = [
        { href: `/${locale}`, title: `${dict.home}` },
        ...crumblist,
      ];

      // Add Category param
      const pathWithCategory = searchParams.get("category")
        ? [
            ...pathWithHome,
            {
              href: `/${locale}/objects?category=${searchParams.get(
                "category",
              )}`,
              title: getTextGenerator(searchParams.get("category")),
            },
          ]
        : pathWithHome;

      // Add Collection param
      const pathWithCollection = searchParams.get("collection")
        ? [
            ...pathWithCategory,
            {
              href: `/${locale}/objects?category=${searchParams.get(
                "category",
              )}&collection=${searchParams.get("collection")}`,
              title: getTextGenerator(searchParams.get("collection")),
            },
          ]
        : pathWithCategory;

      // Full path
      const pathFull = pathWithCollection;

      return pathFull;
    },
    [dict.home, getTextGenerator, locale, pathname, searchParams],
  );

  return (
    <div className="font-Inter flex items-center">
      {breadcrumbs.map((crumb, index) => (
        <Crumb
          key={index}
          text={crumb.title}
          href={crumb.href}
          last={index === breadcrumbs.length - 1}
        />
      ))}
    </div>
  );
}

function Crumb({
  text,
  href,
  last = false,
}: {
  text: string | null | undefined;
  href: string;
  last: boolean;
}) {
  if (!text) return null;

  // The last crumb is rendered as normal text
  if (last) {
    return <span className="sm:px-3 sm:py-2 p-1 font-semibold lg:text-base md:text-sm text-xs">{text}</span>;
  }

  return (
    <>
      <Link href={href} className="hover:bg-accent rounded-md sm:px-3 sm:py-2 p-1 lg:text-base md:text-sm text-xs">
        {text}
      </Link>
      <ChevronRight className="sm:mx-1 h-5 w-5" />
    </>
  );
}
