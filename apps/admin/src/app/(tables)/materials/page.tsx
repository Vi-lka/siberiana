import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

import RefreshPage from "~/components/RefreshPage";
import TablesMaterials from "./TablesMaterials";

export const dynamic = "force-dynamic";

export default function MaterialsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div key={Math.random()} className="font-OpenSans px-2 md:py-10 py-3 md:ml-[14rem]">
      <div className="flex items-start justify-between gap-3">
        <h1 className="font-semibold text-center text-2xl md:w-fit w-full md:mb-0 mb-4">Материалы</h1>
        <RefreshPage />
      </div>
      <Suspense
        fallback={<Loader2 className="mx-auto h-12 w-12 animate-spin" />}
      >
        <TablesMaterials searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
