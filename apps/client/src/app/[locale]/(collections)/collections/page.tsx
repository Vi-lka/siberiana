import React, { Suspense } from "react";
import { getDictionary } from "~/lib/utils/getDictionary";
import { DictionarySchema } from "@siberiana/schemas";
import SearchField from "~/components/ui/SearchField";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";
import { getCategories } from "~/lib/queries/api-collections";
import ErrorHandler from "~/components/errors/ErrorHandler";
import CollectionsContent from "./CollectionsContent";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";

export default async function Collections({
  params: { locale },
  searchParams
}: {
  params: { locale: string };
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary(locale);
  const dictResult = DictionarySchema.parse(dict);

  const category = searchParams['category'] as string | undefined

  // For filters and titles
  try {
    await getCategories({ first: null });
  } catch (error) {
    return (
      <ErrorHandler 
        locale={locale} 
        error={error} 
        place="Categories" 
        notFound 
        goBack={false}
      />
    )
  }
  const categoriesResult = await getCategories({ first: null });

  // Get title
  const categorySingle = categoriesResult.edges.find(el => el.node.slug === category)

  return (
    <div>
      <BreadcrumbsCollections 
        dict={dictResult.breadcrumbs}
        categorySlug={categorySingle?.node.slug}
        categoryTitle={categorySingle?.node.displayName as string}
      />
      
      <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
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

      <Suspense fallback={
        <div className="my-12">
          <RowBigBlockSkeleton />
        </div>
      }>
        <CollectionsContent locale={locale} searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
