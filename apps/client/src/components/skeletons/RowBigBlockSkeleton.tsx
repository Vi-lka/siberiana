import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function RowBigBlockSkeleton() {
  return (
    <div>
      <div className="mx-auto grid w-[85%] grid-cols-1 gap-7 md:w-full md:grid-cols-2">
        <Skeleton className="aspect-square w-full px-8 py-6 md:aspect-[2/1]" />
        <Skeleton className="aspect-square w-full px-8 py-6 md:aspect-[2/1]" />
        <Skeleton className="aspect-square w-full px-8 py-6 md:aspect-[2/1]" />
        <Skeleton className="aspect-square w-full px-8 py-6 md:aspect-[2/1]" />
      </div>
    </div>
  );
}
