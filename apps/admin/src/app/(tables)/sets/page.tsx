import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

import RefreshPage from "~/components/RefreshPage";
import TablesSets from "./TablesSets";

export const dynamic = "force-dynamic";

export default function SetsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div key={Math.random()} className="font-OpenSans px-2 md:py-10 py-3 md:ml-[14rem]">
      <div className="flex items-start justify-between gap-3">
        <h1 className="font-semibold text-center text-2xl md:w-fit w-full md:mb-0 mb-4">Комплексы</h1>
        <RefreshPage />
      </div>
      <Suspense
        fallback={<Loader2 className="mx-auto h-12 w-12 animate-spin" />}
      >
        <TablesSets searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
