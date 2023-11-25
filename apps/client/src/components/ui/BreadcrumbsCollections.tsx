"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbsDict } from "@siberiana/schemas";

import GoBackButton from "./GoBackButton";

type Props = {
  dict: BreadcrumbsDict;
  title?: string;
} & (WithCategoryType | NoCategoryType) &
  (WithCollectionType | NoCollectionType);

type WithCategoryType = {
  categorySlug?: string;
  categoryTitle: string;
};
type NoCategoryType = {
  categorySlug?: undefined;
};

type WithCollectionType = {
  collectionSlug?: string;
  collectionTitle: string;
};
type NoCollectionType = {
  collectionSlug?: undefined;
};

export default function BreadcrumbsCollections(props: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const collection = searchParams.get("collection");

  const getTitleGenerator = React.useCallback(
    (subpath: string) => {
      switch (subpath) {
        case props.categorySlug:
          return (props as WithCategoryType).categoryTitle;

        case props.collectionSlug:
          return (props as WithCollectionType).collectionTitle;

        default:
          return {
            categories: props.dict.categories,
            collections: props.dict.collections,
            objects: props.dict.objects,
          }[subpath];
      }
    },
    [props],
  );

  const breadcrumbs = React.useMemo(
    function generateBreadcrumbs() {
      // Ex:"/my/nested/path" --> ["my", "nested", "path"]
      const pathNestedRoutes = pathname.split("/").filter((v) => v.length > 0);

      const pathReplaced = pathNestedRoutes;

      // Replace if single category
      if (category === (props as WithCategoryType).categorySlug) {
        pathReplaced.forEach((el, index) => {
          if (el === "collections" || "objects") {
            pathReplaced.splice(index, 1, "categories");
          }
        });
      }
      if (collection === (props as WithCollectionType).collectionSlug) {
        pathReplaced.forEach((el, index) => {
          if (el === "objects") {
            pathReplaced.splice(index, 1, "collections");
          }
        });
      }

      // Create crumb list
      const crumblist = pathReplaced.map((subpath, index) => {
        const href = `/` + pathReplaced.slice(0, index + 1).join("/");
        const title = getTitleGenerator(subpath);
        return { href, title };
      });

      // Add Home Page
      const pathWithHome = [
        { href: `/`, title: `${props.dict.home}` },
        ...crumblist,
      ];

      // Objects page
      // Add Category param
      const pathWithCategory =
        category === props.categorySlug
          ? [
              ...pathWithHome,
              {
                href: `/collections?category=${category}`,
                title: getTitleGenerator(category),
              },
            ]
          : pathWithHome;

      // Add Collection param
      const pathWithCollection =
        collection === props.collectionSlug
          ? [
              ...pathWithCategory,
              {
                href: `/objects?category=${category}&collection=${collection}`,
                title: getTitleGenerator(collection),
              },
            ]
          : pathWithCategory;

      // Full path
      const pathFull = pathWithCollection;

      return pathFull;
    },
    [pathname, category, props, getTitleGenerator, collection],
  );

  return (
    <div className="font-Inter relative flex flex-wrap items-center">
      <div className="absolute -top-10 left-0 sm:-left-8 sm:top-0 lg:-left-12">
        <GoBackButton />
      </div>
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
        className="hover:bg-accent rounded-md px-1 py-2 text-xs sm:px-3 md:text-sm lg:text-base"
      >
        {text}
      </Link>
      <ChevronRight className="h-5 w-5 sm:mx-1" />
    </>
  );
}
