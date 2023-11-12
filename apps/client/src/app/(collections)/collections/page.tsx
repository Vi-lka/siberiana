import React, { Suspense } from "react";

import type { SortData } from "@siberiana/schemas";
import { Dictionary } from "@siberiana/schemas";
import { Skeleton } from "@siberiana/ui";

import ErrorHandler from "~/components/errors/ErrorHandler";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";
import SearchField from "~/components/ui/filters/SearchField";
import { Select } from "~/components/ui/filters/Select";
import Sort from "~/components/ui/filters/Sort";
import { getCategories } from "~/lib/queries/api-collections";
import { getDictionary } from "~/lib/utils/getDictionary";
import CollectionsContent from "./CollectionsContent";

export const dynamic = "force-dynamic";

export default async function Collections({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const category = searchParams["category"] as string | undefined;

  // For filters and titles
  const [categoriesResult] = await Promise.allSettled([
    getCategories({ first: null }),
  ]);
  if (categoriesResult.status === "rejected")
    return (
      <ErrorHandler
        error={categoriesResult.reason as unknown}
        place="Categories Filter"
        notFound
        goBack={false}
      />
    );

  // Get title
  const categorySingle = categoriesResult.value.edges.find(
    (el) => el.node.slug === category,
  );

  // Filter category
  const categoryFilters = categoriesResult.value.edges.map((el) => {
    const value = el.node.slug;
    const label = el.node.displayName;
    return { value, label };
  });

  const sortData = [
    {
      val: "DISPLAY_NAME:ASC",
      text: `${dictResult.sort.byName}: ${dictResult.sort.ascText}`,
    },
    {
      val: "DISPLAY_NAME:DESC",
      text: `${dictResult.sort.byName}: ${dictResult.sort.descText}`,
    },
  ] as SortData[];

  return (
    <div>
      <BreadcrumbsCollections
        dict={dictResult.breadcrumbs}
        categorySlug={categorySingle?.node.slug}
        categoryTitle={categorySingle?.node.displayName as string}
      />

      <div className="mb-4 mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-foreground text-xl font-bold uppercase lg:text-2xl">
          {!!categorySingle
            ? categorySingle.node.displayName
            : dictResult.breadcrumbs.collections}
        </h1>
      </div>

      {!!categorySingle ? (
        <p className="font-Inter my-4 text-sm md:text-base">
          {categorySingle.node.description}
        </p>
      ) : null}

      <SearchField placeholder={dictResult.search.button} />

      <div className="mt-3 flex items-center justify-between gap-6">
        <Select
          isMulti
          values={categoryFilters}
          param="category"
          placeholder="Выберите категорию"
          className="text-right"
          icon
        />
        <Sort dict={dictResult.sort} data={sortData} />
      </div>

      <Suspense
        fallback={
          <div className="mx-auto mb-12 mt-3 grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-2 min-[2000px]:grid-cols-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-square w-full px-8 py-6 md:aspect-[2/1]"
              />
            ))}
          </div>
        }
      >
        <CollectionsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
