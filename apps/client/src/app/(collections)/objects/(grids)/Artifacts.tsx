import React from "react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ObjectsGrid from "~/components/objects/ObjectsGrid";
import { ClientHydration } from "~/components/providers/ClientHydration";
import ObjectsCounter from "~/components/providers/ObjectsCounter";
import MasonrySkeleton from "~/components/skeletons/MasonrySkeleton";
import PaginationControls from "~/components/ui/PaginationControls";
import { getArtifacts } from "~/lib/queries/api-collections";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function Artifacts({
  searchParams,
  defaultPageSize,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  defaultPageSize: number;
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
  const model = searchParams["modelArtifacts"] as string | undefined;

  const cultureIds = searchParams["culture"] as string | undefined;
  const setIds = searchParams["set"] as string | undefined;
  const monumentIds = searchParams["monument"] as string | undefined;
  const techniqueIds = searchParams["technique"] as string | undefined;

  const sort = searchParams["sort"] as string | undefined;
  const page = searchParams["page_artifacts"] ?? "1";
  const per = searchParams["per_artifacts"] ?? defaultPageSize;

  const first = Number(per);
  const offset = (Number(page) - 1) * Number(per);

  const [dataResult] = await Promise.allSettled([
    getArtifacts({
      first,
      offset,
      search,
      sort,
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
      model: Boolean(model),
    }),
  ]);
  if (dataResult.status === "rejected")
    return (
      <>
        <ErrorHandler
          error={dataResult.reason as unknown}
          place="Artifacts"
          notFound
          goBack={false}
        />
        <ObjectsCounter artifactsCount={0} />
      </>
    );

  return (
    <div key={Math.random()} className="w-full">
      <ClientHydration fallback={<MasonrySkeleton />}>
        <ObjectsGrid data={dataResult.value} hrefTo={"artifact"} />
        <div className="mb-24 mt-6">
          <PaginationControls
            dict={dictResult.pagination}
            length={dataResult.value.totalCount}
            defaultPageSize={defaultPageSize}
            classNameMore="xl:left-[38%]"
            pageParam={"page_artifacts"}
            perParam={"per_artifacts"}
          />
        </div>
      </ClientHydration>

      <ObjectsCounter artifactsCount={dataResult.value.totalCount} />
    </div>
  );
}
