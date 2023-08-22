import React, { Suspense } from "react";
import { getDictionary } from "~/lib/utils/getDictionary";
import type { SortDataType } from "@siberiana/schemas";
import { DictionarySchema } from "@siberiana/schemas";
import SearchField from "~/components/ui/filters/SearchField";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";
import { getCategories } from "~/lib/queries/api-collections";
import ErrorHandler from "~/components/errors/ErrorHandler";
import CollectionsContent from "./CollectionsContent";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";
import { MultiSelect } from "~/components/ui/filters/MultiSelect";
import Sort from "~/components/ui/filters/Sort";

export default async function Collections({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  const category = searchParams['category'] as string | undefined

  // For filters and titles
  const [ categoriesResult ] = await Promise.allSettled([ getCategories({ first: null }) ])
  if  (categoriesResult.status === 'rejected') return (
    <ErrorHandler 
      error={categoriesResult.reason as unknown} 
      place="Categories Filter" 
      notFound 
      goBack={false}
    />
  )

  // Get title
  const categorySingle = categoriesResult.value.edges.find(el => el.node.slug === category)

  // Filter category
  const categoryFilters = categoriesResult.value.edges.map(el => {
    const value = el.node.slug;
    const label = el.node.displayName;
    return { value, label };
  })

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
      />
      
      <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
        <h1 className="text-foreground lg:text-2xl text-xl font-bold uppercase">
          {!!categorySingle ? categorySingle.node.displayName : dictResult.breadcrumbs.collections}
        </h1>

        <div className="flex gap-6 items-center md:justify-end justify-between">
          <MultiSelect 
            values={categoryFilters} 
            param="category"
            placeholder="Выберите категорию" 
            className="text-right" 
            icon
          />
          <Sort 
            dict={dictResult.sort}
            data={sortData}
          />
        </div>
      </div>

      {!!categorySingle ? (
        <p className="font-Inter md:text-base text-sm my-4">
          {categorySingle.node.description}
        </p>
      ): null}
  
      <SearchField 
        placeholder={dictResult.search.button}
      />

      <Suspense fallback={
        <div className="my-12">
          <RowBigBlockSkeleton />
        </div>
      }>
        <CollectionsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
