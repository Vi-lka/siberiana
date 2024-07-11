import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

import RefreshPage from "~/components/RefreshPage";
import TablesDistricts from "./TablesDistricts";

export const dynamic = "force-dynamic";

export default function DistrictsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div
      key={Math.random()}
      className="font-OpenSans px-2 py-3 md:ml-[14rem] md:py-10"
    >
      <div className="flex items-start justify-between gap-3">
        <h1 className="mb-4 w-full text-center text-2xl font-semibold md:mb-0 md:w-fit">
          Районы
        </h1>
        <RefreshPage />
      </div>
      <Suspense
        fallback={<Loader2 className="mx-auto h-12 w-12 animate-spin" />}
      >
        <TablesDistricts searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
