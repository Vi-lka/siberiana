import React from "react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ObjectsGrid from "~/components/objects/ObjectsGrid";
import { ClientHydration } from "~/components/providers/ClientHydration";
import ObjectsCounter from "~/components/providers/ObjectsCounter";
import MasonrySkeleton from "~/components/skeletons/MasonrySkeleton";
import PaginationControls from "~/components/ui/PaginationControls";
import { getArts } from "~/lib/queries/api-collections";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function Arts({
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

  const countryIds = searchParams["countryArts"] as string | undefined;
  const regionIds = searchParams["regionArts"] as string | undefined;
  const districtIds = searchParams["districtArts"] as string | undefined;
  const settlementIds = searchParams["settlementArts"] as string | undefined;

  const licenseIds = searchParams["licenseArts"] as string | undefined;

  //   const techniqueIds = searchParams["technique"] as string | undefined;

  const sort = searchParams["sort"] as string | undefined;
  const page = searchParams["page_arts"] ?? "1";
  const per = searchParams["per_arts"] ?? defaultPageSize;

  const first = Number(per);
  const offset = (Number(page) - 1) * Number(per);

  const [dataResult] = await Promise.allSettled([
    getArts({
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
      //   techniqueIds,
    }),
  ]);
  if (dataResult.status === "rejected")
    return (
      <>
        <ErrorHandler
          error={dataResult.reason as unknown}
          place="Arts"
          notFound
          goBack={false}
        />
        <ObjectsCounter artsCount={0} />
      </>
    );

  return (
    <div key={Math.random()} className="w-full">
      <ClientHydration fallback={<MasonrySkeleton />}>
        <ObjectsGrid data={dataResult.value} hrefTo={"art"} />
        <div className="mb-24 mt-6">
          <PaginationControls
            dict={dictResult.pagination}
            length={dataResult.value.totalCount}
            defaultPageSize={defaultPageSize}
            classNameMore="xl:left-[38%]"
            pageParam={"page_arts"}
            perParam={"per_arts"}
          />
        </div>
      </ClientHydration>

      <ObjectsCounter artsCount={dataResult.value.totalCount} />
    </div>
  );
}
