import React from "react";
import { DictionarySchema } from "@siberiana/schemas";
import { getDictionary } from "~/lib/utils/getDictionary";
import { getCategories, getCollections } from "~/lib/queries/api-collections";
import ErrorHandler from "~/components/errors/ErrorHandler";
import BreadcrumbsCollections from "~/components/ui/BreadcrumbsCollections";

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
  try {
    await getCategories({ first: null });
  } catch (error) {
    return (
      <ErrorHandler 
        error={error} 
        place="Categories" 
        notFound 
        goBack={false}
      />
    )
  }
  const categoriesResult = await getCategories({ first: null });

  try {
    await getCollections({ first: null, categories });
  } catch (error) {
    console.error(error)
      return (
        <ErrorHandler 
          error={error} 
          place="Collections" 
          notFound 
          goBack={false}
        />
      )
  }
  const collectionsResult = await getCollections({ first: null, categories });

  // Get category title
  const categorySingle = categoriesResult.edges.find(el => el.node.slug === categories)
  // Get collection title
  const collectionSingle = collectionsResult?.edges.find(el => el.node.slug === collections)

  return (
    <div>
      <BreadcrumbsCollections 
        dict={dictResult.breadcrumbs}
        categorySlug={categorySingle?.node.slug}
        categoryTitle={categorySingle?.node.displayName as string}
        collectionSlug={collectionSingle?.node.slug}
        collectionTitle={collectionSingle?.node.displayName as string}
      />
    </div>
  );
}
