import React, { Suspense } from "react";

import type { SortData } from "@siberiana/schemas";
import { Dictionary } from "@siberiana/schemas";
import { Skeleton } from "@siberiana/ui";

import Breadcrumbs from "~/components/ui/Breadcrumbs";
import SearchField from "~/components/ui/filters/SearchField";
import Sort from "~/components/ui/filters/Sort";
import { getDictionary } from "~/lib/utils/getDictionary";
import ProjectsContent from "./ProjectsContent";

export default async function Projects({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const sortData = [
    {
      val: "title:asc",
      text: `${dictResult.sort.byName}: ${dictResult.sort.ascText}`,
    },
    {
      val: "title:desc",
      text: `${dictResult.sort.byName}: ${dictResult.sort.descText}`,
    },
  ] as SortData[];

  return (
    <div>
      <Breadcrumbs dict={dictResult.breadcrumbs} />

      <div className="mb-4 mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.projects.title}
        </h1>
      </div>

      <SearchField placeholder={dictResult.search.button} />

      <div className="mt-3 flex items-center justify-end gap-6">
        <Sort dict={dictResult.sort} data={sortData} />
      </div>

      <Suspense
        fallback={
          <div className="mx-auto mb-12 mt-3 grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-2 min-[2000px]:grid-cols-3">
            {[1,2,3,4,5,6,7,8,9,10,11,12].map((_, i) => (
              <Skeleton
                key={i}
                className="aspect-square w-full px-8 py-6 md:aspect-[2/1]"
              />
            ))}
          </div>
        }
      >
        <ProjectsContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
