import React, { Suspense } from "react";
import type { SortDataType } from "@siberiana/schemas";
import { DictionarySchema } from "@siberiana/schemas";
import { getDictionary } from "~/lib/utils/getDictionary";
import { getCategories, getCollections } from "~/lib/queries/api-collections";
import ErrorHandler from "~/components/errors/ErrorHandler";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";
import SearchField from "~/components/ui/filters/SearchField";
import Sort from "~/components/ui/filters/Sort";
import { Filter } from "lucide-react";
import ObjectsFilters from "./ObjectsFilters";
import MasonrySkeleton from "~/components/skeletons/MasonrySkeleton";
import ObjectTabs from "~/components/objects/ObjectsTabs";
import Artifacts from "./Artifacts";
import Books from "./Books";
import ObjectsContent from "~/components/objects/ObjectsContent";
import ProtectedAreaPictures from "./ProtectedAreaPictures";

export default async function Objects({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {
  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  const defaultPageSize = 5

  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined

  // For filters and titles
  const [ categoriesResult, collectionsResult ] = await Promise.allSettled([ 
    getCategories({ first: null }),
    getCollections({ first: null, categories })
  ])
  if (categoriesResult.status === 'rejected') return (
    <ErrorHandler 
      error={categoriesResult.reason as unknown} 
      place="Categories in Objects"
      notFound 
      goBack={false}
    />
  )
  if (collectionsResult.status === 'rejected') return (
    <ErrorHandler 
      error={collectionsResult.reason as unknown} 
      place="Collections in Objects" 
      notFound 
      goBack={false}
    />
  )

  // Get category title
  const categorySingle = categoriesResult.value.edges.find(el => el.node.slug === categories)
  // Get collection title
  const collectionSingle = collectionsResult.value.edges.find(el => el.node.slug === collections)

  const sortData = [
    { val: 'DISPLAY_NAME:ASC', text: `${dictResult.sort.byName}: ${dictResult.sort.ascText}` },
    { val: 'DISPLAY_NAME:DESC', text: `${dictResult.sort.byName}: ${dictResult.sort.descText}` },
    {},
    { val: 'CREATED_AT:ASC', text: `${dictResult.sort.byAdded}: ${dictResult.sort.asc}` },
    { val: 'CREATED_AT:DESC', text: `${dictResult.sort.byAdded}: ${dictResult.sort.desc}` },
  ] as SortDataType[]

  return (
    <div>
      <BreadcrumbsCollections 
        dict={dictResult.breadcrumbs}
        categorySlug={categorySingle?.node.slug}
        categoryTitle={categorySingle?.node.displayName as string}
        collectionSlug={collectionSingle?.node.slug}
        collectionTitle={collectionSingle?.node.displayName as string}
      />

      <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
        <h1 className="text-foreground lg:text-2xl text-xl font-bold uppercase">
          {!!collectionSingle 
            ? collectionSingle.node.displayName 
            : !!categorySingle 
              ? categorySingle.node.displayName
              : dictResult.breadcrumbs.objects
          }
        </h1>
      </div>

      {!!collectionSingle 
        ? (
          <p className="font-Inter md:text-base text-sm my-4">
            {collectionSingle.node.description}
          </p>
        )
        : !!categorySingle 
          ? (
            <p className="font-Inter md:text-base text-sm my-4">
              {categorySingle.node.description}
            </p>
          )
          : null
      }
  
      <SearchField 
        placeholder={dictResult.search.button}
      />

      <div className="flex gap-6 items-center md:justify-end justify-between mt-3">
        <Filter className="md:hidden block" />
        <Sort 
          dict={dictResult.sort}
          data={sortData}
        />
      </div>

      <div className="flex gap-6 w-full justify-between md:mt-0 mt-3 mb-12 relative">
        <div className="w-1/4 bg-red-700 md:block hidden">
          <ObjectsFilters />
        </div>

        <Suspense fallback={
          <div className="md:w-3/4 w-full">
              <MasonrySkeleton />
          </div>
        }>
          <div className="md:w-3/4 w-full">
            <ObjectTabs dict={dictResult}>
              <ObjectsContent value="artifacts">
                <Artifacts searchParams={searchParams} defaultPageSize={defaultPageSize} />
              </ObjectsContent>
              
              <ObjectsContent value="books">
                <Books searchParams={searchParams} defaultPageSize={defaultPageSize} />
              </ObjectsContent>

              <ObjectsContent value="protected_area_pictures">
                <ProtectedAreaPictures searchParams={searchParams} defaultPageSize={defaultPageSize} />
              </ObjectsContent>
            </ObjectTabs>
          </div>
        </Suspense>
      </div>
    </div>
  );
}
