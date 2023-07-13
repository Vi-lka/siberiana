import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function RowBlockSkeleton() {
  return (
    <div className="mx-auto mb-24 w-[85%] max-w-[1600px]">
      <div className="mb-10 flex items-center justify-between">
        <Skeleton className="h-full w-[65%] py-4 md:w-[40%]" />
        <Skeleton className="h-full w-[20%] py-4" />
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="aspect-square w-full px-8 py-6" />
      </div>
    </div>
  );
}
