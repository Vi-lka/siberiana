"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { BreadcrumbsDict } from "@siberiana/schemas";

type Props = {
  dict: BreadcrumbsDict;
  title: string,
  categorySlug: string,
  categoryTitle: string,
  collectionSlug: string,
  collectionTitle: string
}


export default function BreadcrumbsObject(props: Props) {

  const breadcrumbs = React.useMemo(
    function generateBreadcrumbs() {

      // Create crumb list
      const crumblist = [
        { href: `/`, title: `${props.dict.home}` },
        { href: `/collections?category=${props.categorySlug}`, title: props.categoryTitle },
        { href: `/objects?category=${props.categorySlug}&collection=${props.collectionSlug}`, title: props.collectionTitle },
        { href: ``, title: `${props.title}` },
      ]

      return crumblist;
    },
    [props],
  );

  return (
    <div className="font-Inter flex items-center flex-wrap">
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
      <Link href={href} className="hover:bg-accent rounded-md sm:px-3 px-1 py-2 lg:text-base md:text-sm text-xs">
        {text}
      </Link>
      <ChevronRight className="sm:mx-1 h-5 w-5" />
    </>
  );
}
