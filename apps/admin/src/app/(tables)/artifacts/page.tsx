import React, { Suspense } from "react";
import { ArrowBigUp, Loader2 } from "lucide-react";

import CategoryFilter from "~/components/filters/CategoryFilter";
import CollectionFilter from "~/components/filters/CollectionFilter";
import RefreshPage from "~/components/RefreshPage";
import TablesArtifacts from "./TablesArtifacts";

export const dynamic = "force-dynamic";

export default function ArtifactsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams["category"] as string | undefined;
  const collection = searchParams["collection"] as string | undefined;

  return (
    <div key={Math.random()} className="font-OpenSans px-2 md:py-10 py-3 md:ml-[14rem]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 flex-col gap-2 text-sm md:flex-row">
          <div className="">
            <CategoryFilter artifactsType />
            {!(!!category || !!collection) ? (
              <div className="flex flex-col items-center text-center">
                <ArrowBigUp />
                <p>Выберите категорию</p>
              </div>
            ) : null}
          </div>

          <div className="">
            <CollectionFilter artifactsType searchParams={searchParams} />
            {!(!!category || !!collection) ? (
              <div className="flex flex-col items-center text-center">
                <ArrowBigUp />
                <p>Или коллекцию</p>
              </div>
            ) : null}
            {!!category && !!!collection ? (
              <div className="flex flex-col items-center text-center">
                <ArrowBigUp />
                <p>Выберите коллекцию</p>
              </div>
            ) : null}
          </div>
        </div>

        <RefreshPage />
      </div>

      {!!collection ? (
        <Suspense
          fallback={<Loader2 className="mx-auto h-12 w-12 animate-spin" />}
        >
          <TablesArtifacts searchParams={searchParams} />
        </Suspense>
      ) : null}
    </div>
  );
}
