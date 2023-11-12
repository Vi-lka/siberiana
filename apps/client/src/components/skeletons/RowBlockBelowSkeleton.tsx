import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function RowBlockBelowSkeleton() {
  return (
    <div className="mx-auto grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-4">
      <div className="flex aspect-square h-fit w-full flex-col gap-3">
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="w-full py-8" />
      </div>
      <div className="flex aspect-square h-fit w-full flex-col gap-3">
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="w-full py-8" />
      </div>
      <div className="flex aspect-square h-fit w-full flex-col gap-3">
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="w-full py-8" />
      </div>
      <div className="flex aspect-square h-fit w-full flex-col gap-3">
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="w-full py-8" />
      </div>

      <div className="flex aspect-square h-fit w-full flex-col gap-3">
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="w-full py-8" />
      </div>
      <div className="flex aspect-square h-fit w-full flex-col gap-3">
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="w-full py-8" />
      </div>
      <div className="flex aspect-square h-fit w-full flex-col gap-3">
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="w-full py-8" />
      </div>
      <div className="flex aspect-square h-fit w-full flex-col gap-3">
        <Skeleton className="aspect-square w-full px-8 py-6" />
        <Skeleton className="w-full py-8" />
      </div>
    </div>
  );
}
