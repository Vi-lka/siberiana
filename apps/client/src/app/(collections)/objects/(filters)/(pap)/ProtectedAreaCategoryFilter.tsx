import React from "react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import { Select } from "~/components/ui/filters/Select";
import { getProtectedAreaCategorysFilter } from "~/lib/queries/api-filters-pap";
import { filterProtectedAreaPictures } from "~/lib/utils/filters";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function ProtectedAreaCategoryFilter({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const search = searchParams["search"] as string | undefined;
  const categories = searchParams["category"] as string | undefined;
  const collections = searchParams["collection"] as string | undefined;
  const countryIds = searchParams["countryPAP"] as string | undefined;
  const regionIds = searchParams["regionPAP"] as string | undefined;
  const districtIds = searchParams["districtPAP"] as string | undefined;
  const settlementIds = searchParams["settlementPAP"] as string | undefined;
  const licenseIds = searchParams["licensePAP"] as string | undefined;
  const protectedAreaIds = searchParams["protectedArea"] as string | undefined;

  const [result] = await Promise.allSettled([
    getProtectedAreaCategorysFilter({
      search,
      categories,
      collections,
      countryIds,
      regionIds,
      districtIds,
      settlementIds,
      protectedAreaIds,
      licenseIds,
    }),
  ]);

  if (result.status === "rejected") {
    console.log(result);
    return (
      <ErrorHandler
        error={result.reason as unknown}
        place="Protected Area Categorys Filter"
        notFound={false}
      />
    );
  }

  const resultsFiltered = filterProtectedAreaPictures(
    result.value,
    searchParams,
  );

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-medium">{dictResult.objects.filters.ooptCategory}</h1>
      <Select
        isMulti
        badges
        side="right"
        values={resultsFiltered}
        param="protectedAreaCategory"
        placeholder="Выберите Категории ООПТ"
        className="w-full max-w-none"
      />
    </div>
  );
}
