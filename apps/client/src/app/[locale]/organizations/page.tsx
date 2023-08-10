import React, { Suspense } from "react";
import type { SortDataType } from "@siberiana/schemas";
import { DictionarySchema } from "@siberiana/schemas";
import { getDictionary } from "~/lib/utils/getDictionary";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import Sort from "~/components/ui/Sort";
import SearchField from "~/components/ui/SearchField";
import { PiHandshakeLight } from "react-icons/pi";
import ToggleFilter from "~/components/ui/ToggleFilter";
import OrganizationsContent from "./OrganizationsContent";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";

export default async function Organizations({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary(locale);
  const dictResult = DictionarySchema.parse(dict);

  const sortData = [
    { val: 'title:asc', text: `${dictResult.sort.byName}: ${dictResult.sort.ascText}` },
    { val: 'title:desc', text: `${dictResult.sort.byName}: ${dictResult.sort.descText}` },
  ] as SortDataType[]

  return (
    <div>
      <Breadcrumbs dict={dictResult.breadcrumbs} />

      <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.organizations.title}
        </h1>

        <div className="flex flex-grow gap-6 items-center md:justify-end justify-between md:w-fit w-full">
            <ToggleFilter 
              tooltip={dictResult.tooltips.consortium} 
              param={'consortium'}
            >
              <PiHandshakeLight className="h-6 w-6" />
            </ToggleFilter>

          <Sort 
            dict={dictResult.sort}
            data={sortData}
          />
        </div>
      </div>

      <SearchField 
        placeholder={dictResult.search.button}
      />

      <Suspense fallback={
        <div className="my-12">
          <RowBigBlockSkeleton />
        </div>
      }>
        <OrganizationsContent locale={locale} searchParams={searchParams} dict={dictResult} />
      </Suspense>
    </div>
  );
}
