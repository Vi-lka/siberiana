import React, { Suspense } from "react";

import type { Categories, Collections, SortData } from "@siberiana/schemas";
import { Dictionary } from "@siberiana/schemas";
import { Skeleton } from "@siberiana/ui";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ObjectsContent from "~/components/objects/ObjectsContent";
import ObjectTabs from "~/components/objects/ObjectsTabs";
import MasonrySkeleton from "~/components/skeletons/MasonrySkeleton";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";
import SearchField from "~/components/ui/filters/SearchField";
import Sort from "~/components/ui/filters/Sort";
import { getCategories, getCollections } from "~/lib/queries/api-collections";
import { getDictionary } from "~/lib/utils/getDictionary";
import Filters from "./(filters)/Filters";
import Artifacts from "./(grids)/Artifacts";
import Arts from "./(grids)/Arts";
import Books from "./(grids)/Books";
import Herbariums from "./(grids)/Herbariums";
import ProtectedAreaPictures from "./(grids)/ProtectedAreaPictures";

export const dynamic = "force-dynamic";

const DEFAULT_PAGE_SIZE = 24;

export default async function Objects({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const categories = searchParams["category"] as string | undefined;
  const collections = searchParams["collection"] as string | undefined;

  // For titles
  const results = await Promise.allSettled([
    getCategories({ first: null }),
    getCollections({ first: null, categories }),
  ]);

  const rejected = results.find(
    (elem) => elem.status === "rejected",
  ) as PromiseRejectedResult;

  if (rejected)
    return (
      <ErrorHandler
        error={rejected.reason as unknown}
        place="Titles in Objects"
        notFound
        goBack
      />
    );

  const categoriesFulfilled = results[0] as PromiseFulfilledResult<Categories>;
  const collectionsFulfilled =
    results[1] as PromiseFulfilledResult<Collections>;

  // Get category title
  const categorySingle = categoriesFulfilled.value.edges.find(
    (el) => el.node.slug === categories,
  );
  // Get collection title
  const collectionSingle = collectionsFulfilled.value.edges.find(
    (el) => el.node.slug === collections,
  );

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
    <div className="mb-12">
      <BreadcrumbsCollections
        dict={dictResult.breadcrumbs}
        categorySlug={categorySingle?.node.slug}
        categoryTitle={categorySingle?.node.displayName as string}
        collectionSlug={collectionSingle?.node.slug}
        collectionTitle={collectionSingle?.node.displayName as string}
      />

      <div className="mb-4 mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-foreground text-xl font-bold uppercase lg:text-2xl">
          {!!collectionSingle
            ? collectionSingle.node.displayName
            : !!categorySingle
              ? categorySingle.node.displayName
              : dictResult.breadcrumbs.objects}
        </h1>
      </div>

      {!!collectionSingle ? (
        <p className="font-Inter my-4 text-sm md:text-base">
          {collectionSingle.node.description}
        </p>
      ) : !!categorySingle ? (
        <p className="font-Inter my-4 text-sm md:text-base">
          {categorySingle.node.description}
        </p>
      ) : null}

      <SearchField placeholder={dictResult.search.button} />

      <div className="relative">
        <div className="mt-4 flex items-center justify-end gap-6 lg:mt-3">
          {/* <Filter className="lg:hidden block" /> Mobile here */}
          <Sort
            dict={dictResult.sort}
            data={sortData}
            className="lg:absolute lg:top-1"
          />
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          <div className="hidden w-[30%] lg:flex xl:w-[24%] 2xl:w-1/5">
            <Filters searchParams={searchParams} />
          </div>

          <div className="mt-2 w-full lg:mt-0 lg:w-[70%] xl:w-[76%] 2xl:w-4/5">
            <Suspense
              fallback={
                <div className="flex w-full flex-col">
                  <Skeleton className="mt-2 h-10 w-full" />
                  <MasonrySkeleton />
                </div>
              }
            >
              <ObjectTabs dict={dictResult}>
                <ObjectsContent value="artifacts">
                  <Artifacts
                    searchParams={searchParams}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                  />
                </ObjectsContent>

                <ObjectsContent value="books">
                  <Books
                    searchParams={searchParams}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                  />
                </ObjectsContent>

                <ObjectsContent value="protected_area_pictures">
                  <ProtectedAreaPictures
                    searchParams={searchParams}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                  />
                </ObjectsContent>

                <ObjectsContent value="arts">
                  <Arts
                    searchParams={searchParams}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                  />
                </ObjectsContent>

                <ObjectsContent value="herbariums">
                  <Herbariums
                    searchParams={searchParams}
                    defaultPageSize={DEFAULT_PAGE_SIZE}
                  />
                </ObjectsContent>
              </ObjectTabs>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
