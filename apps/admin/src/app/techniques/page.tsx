import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

import TablesTechniques from "./TablesTechniques";
import RefreshPage from "~/components/RefreshPage";

export const dynamic = "force-dynamic";

export default function TechniquesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div key={Math.random()} className="font-OpenSans px-2 py-10 md:ml-[14rem]">
      <div className="flex items-start justify-end gap-3">
        <RefreshPage />
      </div>
      <Suspense
        fallback={<Loader2 className="mx-auto h-12 w-12 animate-spin" />}
      >
        <TablesTechniques searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
