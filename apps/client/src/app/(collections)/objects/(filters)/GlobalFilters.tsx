import React, { Suspense } from "react";

import { Dictionary } from "@siberiana/schemas";
import { Skeleton } from "@siberiana/ui";

import { getDictionary } from "~/lib/utils/getDictionary";
import CategoryFilter from "./(global)/CategoryFilter";
import CollectionFilter from "./(global)/CollectionFilter";

export default async function GlobalFilters({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  return (
    <>
      {/* Category */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.categories}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <CategoryFilter />
      </Suspense>

      {/* Collections */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.collections}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <CollectionFilter searchParams={searchParams} />
      </Suspense>
    </>
  );
}
