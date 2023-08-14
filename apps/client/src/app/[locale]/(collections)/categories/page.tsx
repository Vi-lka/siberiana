import React, { Suspense } from "react";
import { getDictionary } from "~/lib/utils/getDictionary";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { DictionarySchema } from "@siberiana/schemas";
import SearchField from "~/components/ui/SearchField";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";
import CategoriesContent from "./CategoriesContent";

export default async function Categories({
    params: { locale },
    searchParams,
  }: {
    params: { locale: string },
    searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary(locale);
  const dictResult = DictionarySchema.parse(dict);

  return (
    <div>
        <Breadcrumbs dict={dictResult.breadcrumbs} />

        <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
          <h1 className="text-foreground text-2xl font-bold uppercase">
            {dictResult.breadcrumbs.categories}
          </h1>
        </div>
    
        <SearchField 
          placeholder={dictResult.search.button}
        />
  
        <Suspense fallback={
          <div className="my-12">
            <RowBigBlockSkeleton />
          </div>
        }>
          <CategoriesContent locale={locale} searchParams={searchParams} />
        </Suspense>
    </div>
  );
}
