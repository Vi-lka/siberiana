import React, { Suspense } from "react";
import type { SortData } from "@siberiana/schemas";
import { Dictionary } from "@siberiana/schemas";
import { getDictionary } from "~/lib/utils/getDictionary";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import Sort from "~/components/ui/filters/Sort";
import SearchField from "~/components/ui/filters/SearchField";
import { PiHandshakeLight } from "react-icons/pi";
import ToggleFilter from "~/components/ui/filters/ToggleFilter";
import OrganizationsContent from "./OrganizationsContent";
import { Skeleton } from "@siberiana/ui";

export default async function Organizations({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const sortData = [
    { val: 'title:asc', text: `${dictResult.sort.byName}: ${dictResult.sort.ascText}` },
    { val: 'title:desc', text: `${dictResult.sort.byName}: ${dictResult.sort.descText}` },
  ] as SortData[]

  return (
    <div>
      <Breadcrumbs dict={dictResult.breadcrumbs} />

      <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.organizations.title}
        </h1>
      </div>

      <SearchField 
        placeholder={dictResult.search.button}
      />

      
      <div className="flex gap-6 items-center justify-between mt-3">
        <ToggleFilter 
          tooltip={dictResult.tooltips.consortium} 
          param={'consortium'}
        >
          <PiHandshakeLight className="h-7 w-7" />
        </ToggleFilter>
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
        <OrganizationsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
