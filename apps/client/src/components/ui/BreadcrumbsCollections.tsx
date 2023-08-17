"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbsDictType } from "@siberiana/schemas";

import { useLocale } from "~/lib/utils/useLocale";

type Props = {
  dict: BreadcrumbsDictType;
  title?: string
}& (WithCategoryType | NoCategoryType) & (WithCollectionType | NoCollectionType)

type WithCategoryType ={
  categorySlug?: string,
  categoryTitle: string,
}
type NoCategoryType ={
  categorySlug?: undefined,
}

type WithCollectionType ={
  collectionSlug?: string,
  collectionTitle: string
}
type NoCollectionType ={
  collectionSlug?: undefined,
}


export default function BreadcrumbsCollections(props: Props) {
  const locale = useLocale();

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const category = searchParams.get("category")
  const collection = searchParams.get("collection")

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
      const pathNestedRoutes = pathname
        .split("/")
        .filter((v) => v.length > 0);

      // Remove locale
      pathNestedRoutes.shift();

      const pathReplaced = pathNestedRoutes

      // Replace if single category
      if (category === (props as WithCategoryType).categorySlug) {
        pathReplaced.forEach((el, index) => {
          if (el === "collections" || "objects") {
            pathReplaced.splice(index, 1, "categories");
          }
        })
      }
      if (collection === (props as WithCollectionType).collectionSlug) {
        pathReplaced.forEach((el, index) => {
          if (el === "objects") {
            pathReplaced.splice(index, 1, "collections");
          }
        })
      }

      // Create crumb list
      const crumblist = pathReplaced.map((subpath, index) => {
        const href =
          `/${locale}/` + pathReplaced.slice(0, index + 1).join("/");
        const title = getTitleGenerator(subpath);
        return { href, title };
      });

      // Add Home Page
      const pathWithHome = [
        { href: `/${locale}`, title: `${props.dict.home}` },
        ...crumblist,
      ];

      // Objects page
      // Add Category param
      const pathWithCategory = (category === props.categorySlug)
        ? [
            ...pathWithHome,
            {
              href: `/${locale}/collections?category=${category}`,
              title: getTitleGenerator(category),
            },
          ]
        : pathWithHome;

        console.log(collection)
        console.log(props.collectionSlug)

      // Add Collection param
      const pathWithCollection = ((collection === props.collectionSlug))
        ? [
            ...pathWithCategory,
            {
              href: `/${locale}/objects?category=${category}&collection=${collection}`,
              title: getTitleGenerator(collection),
            },
          ]
        : pathWithCategory

      // Full path
      const pathFull = pathWithCollection;

      return pathFull;
    },
    [pathname, category, props, locale, getTitleGenerator, collection],
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