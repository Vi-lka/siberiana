import React, { Suspense } from "react";
import { DictionarySchema } from "@siberiana/schemas";
import { getDictionary } from "~/lib/utils/getDictionary";
import { getCategories, getCollections } from "~/lib/queries/api-collections";
import ErrorHandler from "~/components/errors/ErrorHandler";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";
import SearchField from "~/components/ui/filters/SearchField";
import ObjectTabs from "~/components/objects/ObjectsTabs";
import Artifacts from "./Artifacts";
import Books from "./Books";
import ObjectsContent from "~/components/objects/ObjectsContent";
import ProtectedAreaPictures from "./ProtectedAreaPictures";
import ObjectsTabsSkeleton from "~/components/skeletons/ObjectsTabsSkeleton";

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

      <Suspense fallback={ <ObjectsTabsSkeleton /> }>
        <div className="w-full mt-6">
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
  );
}
