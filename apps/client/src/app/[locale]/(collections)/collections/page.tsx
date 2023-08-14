import React, { Suspense } from "react";
import type { Metadata } from "next";
import { getDictionary } from "~/lib/utils/getDictionary";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { DictionarySchema } from "@siberiana/schemas";
import SearchField from "~/components/ui/SearchField";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";

export async function generateMetadata(
  { params }: {params: { locale: string }},
): Promise<Metadata> {
  // read route params
  const locale = params.locale
  
  // fetch data
  const dict = await getDictionary(locale);

  return {
    title: dict.breadcrumbs.collections
  }
}

export default async function Collections({
  params: { locale },
}: {
  params: { locale: string };
}) {

  const dict = await getDictionary(locale);

  const dictResult = DictionarySchema.parse(dict);

  return (
    <div>
      <Breadcrumbs dict={dictResult.breadcrumbs} />
      
      <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.breadcrumbs.collections}
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
        {/* <CollectionsContent locale={locale} searchParams={searchParams} dict={dictResult} /> */}
      </Suspense>
    </div>
  );
}
