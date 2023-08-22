import React, { Suspense } from "react";
import { DictionarySchema } from "@siberiana/schemas";
import { getDictionary } from "~/lib/utils/getDictionary";
import { getCategories, getCollections } from "~/lib/queries/api-collections";
import ErrorHandler from "~/components/errors/ErrorHandler";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";
import SearchField from "~/components/ui/filters/SearchField";
import RowBlockSkeleton from "~/components/skeletons/RowBlockSkeleton";
import ObjectsContent from "./ObjectsContent";

export default async function Objects({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {
  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  // const defaultPageSize = 10
  
  // const page = searchParams['page'] ?? '1'
  // const per = searchParams['per'] ?? defaultPageSize
  // const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  
  // const first = Number(per)
  // const offset = (Number(page) - 1) * Number(per)

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
      
      <div className="mt-10 mb-4 flex gap-4 flex-row items-center justify-between">
        <h1 className="text-foreground lg:text-2xl text-xl font-bold uppercase">
          {!!collectionSingle 
            ? collectionSingle.node.displayName 
            : !!categorySingle 
              ? categorySingle.node.displayName
              : dictResult.breadcrumbs.objects}
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

      <Suspense fallback={
        <div className="my-12">
          {Array(4).map((_, index) => (
            <RowBlockSkeleton key={index} />
          ))}
        </div>
      }>
        <ObjectsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
