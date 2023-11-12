import React from "react";

import { Dictionary } from "@siberiana/schemas";
import { Separator } from "@siberiana/ui";

import FilterTab from "~/components/objects/FilterTab";
import { getDictionary } from "~/lib/utils/getDictionary";
import ArtifactsFilters from "./ArtifactsFilters";
import BooksFilters from "./BooksFilters";
import GlobalFilters from "./GlobalFilters";
import PAPFilters from "./PAPFilters";

export default async function Filters({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const type = searchParams["type"] as string | undefined;

  return (
    <div className="w-full rounded-md py-3">
      <h1 className="font-OpenSans mb-6 text-xl font-bold uppercase">
        {dictResult.objects.filters.title}
      </h1>

      <GlobalFilters searchParams={searchParams} />

      <Separator className="mt-1 h-[2px]" decorative />

      <FilterTab value="artifacts" className="mt-3">
        {type === "artifacts" ? (
          <ArtifactsFilters searchParams={searchParams} />
        ) : null}
      </FilterTab>

      <FilterTab value="books" className="mt-3">
        {type === "books" ? <BooksFilters searchParams={searchParams} /> : null}
      </FilterTab>

      <FilterTab value="protected_area_pictures" className="mt-3">
        {type === "protected_area_pictures" ? (
          <PAPFilters searchParams={searchParams} />
        ) : null}
      </FilterTab>
    </div>
  );
}
