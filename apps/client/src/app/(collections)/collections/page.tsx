import React, { Suspense } from "react";
import { getDictionary } from "~/lib/utils/getDictionary";
import type { SortData } from "@siberiana/schemas";
import { Dictionary } from "@siberiana/schemas";
import SearchField from "~/components/ui/filters/SearchField";
import { getCategories } from "~/lib/queries/api-collections";
import ErrorHandler from "~/components/errors/ErrorHandler";
import CollectionsContent from "./CollectionsContent";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";
import Sort from "~/components/ui/filters/Sort";
import { Skeleton } from "@siberiana/ui";
import { Select } from "~/components/ui/filters/Select";

export const dynamic = 'force-dynamic'

export default async function Collections({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

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
  ] as SortData[]

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
      </div>

      {!!categorySingle ? (
        <p className="font-Inter md:text-base text-sm my-4">
          {categorySingle.node.description}
        </p>
      ): null}
  
      <SearchField 
        placeholder={dictResult.search.button}
      />

      <div className="flex gap-6 items-center justify-between mt-3">
        <Select 
          isMulti
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

      <Suspense fallback={
        <div className="md:w-full w-[85%] mt-3 mb-12 mx-auto grid min-[2000px]:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {[1,2,3,4,5,6,7,8,9,10,11,12].map((_, i) => (
            <Skeleton key={i} className="md:aspect-[2/1] aspect-square w-full px-8 py-6" />
          ))}
        </div>
      }>
        <CollectionsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
