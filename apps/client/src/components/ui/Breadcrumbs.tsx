"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbsDict } from "@siberiana/schemas";

export default function Breadcrumbs({
  dict,
  slug,
  title,
}: {
  dict: BreadcrumbsDict;
  slug?: string;
  title?: string;
}) {
  const pathname = usePathname();

  const getTextGenerator = React.useCallback(
    (subpath: string | null) => {
      if (subpath) {
        if (subpath === slug) {
          return title;
        } else
          return {
            categories: dict.categories,
            collections: dict.collections,
            objects: dict.objects,
            organizations: dict.organizations,
            projects: dict.projects,
            services: dict.services,
            about: dict.about,
            account: dict.account,
            settings: dict.settings,
            faq: dict.faq,
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

      // Create crumb list
      const crumblist = pathNestedRoutes.map((subpath, index) => {
        const href = `/` + pathNestedRoutes.slice(0, index + 1).join("/");
        const title = getTextGenerator(subpath);
        return { href, title };
      });

      // Add Home Page
      const pathWithHome = [{ href: `/`, title: `${dict.home}` }, ...crumblist];

      // Full path
      const pathFull = pathWithHome;

      return pathFull;
    },
    [dict.home, getTextGenerator, pathname],
  );

  return (
    <div className="font-Inter flex flex-wrap items-center">
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
    return (
      <span className="p-1 text-xs font-semibold sm:px-3 sm:py-2 md:text-sm lg:text-base">
        {text}
      </span>
    );
  }

  return (
    <>
      <Link
        href={href}
        className="hover:bg-accent rounded-md p-1 text-xs sm:px-3 sm:py-2 md:text-sm lg:text-base"
      >
        {text}
      </Link>
      <ChevronRight className="h-5 w-5 sm:mx-1" />
    </>
  );
}
