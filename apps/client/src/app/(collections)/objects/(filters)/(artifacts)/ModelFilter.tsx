import React from "react";
import { Box } from "lucide-react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ToggleFilter from "~/components/ui/filters/ToggleFilter";
import { getArtifacts } from "~/lib/queries/api-collections";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function ModelFilter({
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
  const districtIds = searchParams["districtArtifacts"] as string | undefined;
  const settlementIds = searchParams["settlementArtifacts"] as
    | string
    | undefined;

  const licenseIds = searchParams["licenseArtifacts"] as string | undefined;

  const cultureIds = searchParams["culture"] as string | undefined;
  const setIds = searchParams["set"] as string | undefined;
  const monumentIds = searchParams["monument"] as string | undefined;
  const techniqueIds = searchParams["technique"] as string | undefined;

  const [result] = await Promise.allSettled([
    getArtifacts({
      first: null,
      search,
      categories,
      collections,
      countryIds,
      regionIds,
      districtIds,
      settlementIds,
      licenseIds,
      cultureIds,
      setIds,
      monumentIds,
      techniqueIds,
      model: true,
    }),
  ]);

  if (result.status === "rejected") {
    return (
      <ErrorHandler
        error={result.reason as unknown}
        place="Artifacts Models Filter"
        notFound={false}
      />
    );
  }

  const artifactsCount = result.value.totalCount;

  if (artifactsCount === 0) return null;

  return (
    <div className="mb-3 flex flex-col gap-1">
      <div className="font-Inter flex items-center gap-0.5">
        <ToggleFilter
          tooltip={dictResult.objects.filters.model}
          param={"modelArtifacts"}
          className="px-1 py-7"
        >
          <Box className="mr-1 h-7 w-7" /> 3D
        </ToggleFilter>

        <p className="ml-1 text-sm">({artifactsCount})</p>
      </div>
    </div>
  );
}
