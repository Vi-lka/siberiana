import React, { Suspense } from "react";
import type { Categories, Collections, SortData } from "@siberiana/schemas";
import { Dictionary } from "@siberiana/schemas";
import { getDictionary } from "~/lib/utils/getDictionary";
import { getCategories, getCollections } from "~/lib/queries/api-collections";
import ErrorHandler from "~/components/errors/ErrorHandler";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";
import SearchField from "~/components/ui/filters/SearchField";
import ObjectTabs from "~/components/objects/ObjectsTabs";
import ObjectsContent from "~/components/objects/ObjectsContent";
import Artifacts from "./(grids)/Artifacts";
import Books from "./(grids)/Books";
import ProtectedAreaPictures from "./(grids)/ProtectedAreaPictures";
import Filters from "./(filters)/Filters";
import Sort from "~/components/ui/filters/Sort";
import { Filter } from "lucide-react";
import MasonrySkeleton from "~/components/skeletons/MasonrySkeleton";
import { Skeleton } from "@siberiana/ui";

export default async function Objects({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const defaultPageSize = 5

  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined

  // For titles
  const results = await Promise.allSettled([ 
    getCategories({ first: null }),
    getCollections({ first: null, categories })
  ])

  const rejected = results.find(elem => elem.status === "rejected") as PromiseRejectedResult;

  if (rejected) {
    return (
      <ErrorHandler
        error={rejected.reason as unknown} 
        place="Titles in Objects"
        notFound 
        goBack
      />
    )
  }

  const categoriesFulfilled = results[0] as PromiseFulfilledResult<Categories>
  const collectionsFulfilled = results[1] as PromiseFulfilledResult<Collections>

  // Get category title
  const categorySingle = categoriesFulfilled.value.edges.find(el => el.node.slug === categories)
  // Get collection title
  const collectionSingle = collectionsFulfilled.value.edges.find(el => el.node.slug === collections)

  const sortData = [
    { val: 'DISPLAY_NAME:ASC', text: `${dictResult.sort.byName}: ${dictResult.sort.ascText}` },
    { val: 'DISPLAY_NAME:DESC', text: `${dictResult.sort.byName}: ${dictResult.sort.descText}` },
  ] as SortData[]

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


      <div className="relative">
        <div className="flex gap-6 items-center lg:justify-end justify-between lg:mt-3 mt-4">
          <Filter className="lg:hidden block" /> {/* Mobile here */}
          <Sort 
            dict={dictResult.sort}
            data={sortData}
            className="lg:absolute lg:top-1"
          />
        </div>

        <div className="flex lg:flex-row flex-col gap-6">
          <div className="2xl:w-1/5 xl:w-[24%] w-[30%] lg:flex hidden">
            <Filters searchParams={searchParams} /> 
          </div>

          <div className="2xl:w-4/5 xl:w-[76%] lg:w-[70%] w-full lg:mt-0 mt-2">
            <Suspense fallback={ 
              <div className='w-full flex flex-col'>
                <Skeleton className='w-full h-10 mt-2'/>
                <MasonrySkeleton />
              </div> 
            }>
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
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
