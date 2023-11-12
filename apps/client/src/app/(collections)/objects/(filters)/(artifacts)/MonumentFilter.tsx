import React from "react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import { Select } from "~/components/ui/filters/Select";
import { getMonumentsFilter } from "~/lib/queries/api-filters-artifacts";
import { filterArtifacts } from "~/lib/utils/filters";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function MonumentFilter({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const search = searchParams["search"] as string | undefined;

  const categories = searchParams["category"] as string | undefined;
  const collections = searchParams["collection"] as string | undefined;

  const countryIds = searchParams["countryArtifacts"] as string | undefined;
  const regionIds = searchParams["regionArtifacts"] as string | undefined;
  const settlementIds = searchParams["settlementArtifacts"] as
    | string
    | undefined;
  const districtIds = searchParams["districtArtifacts"] as string | undefined;

  const licenseIds = searchParams["licenseArtifacts"] as string | undefined;

  const cultureIds = searchParams["culture"] as string | undefined;
  const setIds = searchParams["set"] as string | undefined;
  const techniqueIds = searchParams["technique"] as string | undefined;

  const [result] = await Promise.allSettled([
    getMonumentsFilter({
      search,
      categories,
      collections,
      countryIds,
      regionIds,
      settlementIds,
      licenseIds,
      districtIds,
      cultureIds,
      setIds,
      techniqueIds,
    }),
  ]);

  if (result.status === "rejected") {
    return (
      <ErrorHandler
        error={result.reason as unknown}
        place="Artifacts Monument Filter"
        notFound={false}
      />
    );
  }

  const resultsFiltered = filterArtifacts(result.value, searchParams);

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-medium">{dictResult.objects.filters.monuments}</h1>
      <Select
        isMulti
        badges
        side="right"
        values={resultsFiltered}
        param="monument"
        placeholder="Выберите памятники"
        className="w-full max-w-none"
      />
    </div>
  );
}
