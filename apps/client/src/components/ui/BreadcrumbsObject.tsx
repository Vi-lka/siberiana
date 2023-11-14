"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

import type { BreadcrumbsDict } from "@siberiana/schemas";
import GoBackButton from "./GoBackButton";

type Props = {
  dict: BreadcrumbsDict;
  title: string;
  categorySlug: string;
  categoryTitle: string;
  collectionSlug: string;
  collectionTitle: string;
};

export default function BreadcrumbsObject(props: Props) {
  const breadcrumbs = React.useMemo(
    function generateBreadcrumbs() {
      // Create crumb list
      const crumblist = [
        { href: `/`, title: `${props.dict.home}` },
        {
          href: `/collections?category=${props.categorySlug}`,
          title: props.categoryTitle,
        },
        {
          href: `/objects?category=${props.categorySlug}&collection=${props.collectionSlug}`,
          title: props.collectionTitle,
        },
        { href: ``, title: `${props.title}` },
      ];

      return crumblist;
    },
    [props],
  );

  return (
    <div className="relative font-Inter flex flex-wrap items-center">
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
