import React, { Suspense } from "react";
import { Loader2 } from "lucide-react";

import TablesMaterials from "./TablesMaterials";

export const dynamic = "force-dynamic";

export default function MaterialsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div key={Math.random()} className="font-OpenSans px-2 py-10 md:ml-[14rem]">
      <Suspense
        fallback={<Loader2 className="mx-auto h-12 w-12 animate-spin" />}
      >
        <TablesMaterials searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
