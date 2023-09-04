import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function RowBlockBelowSkeleton() {
  return (
      <div className="md:w-full w-[85%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4">
        <div className="flex flex-col gap-3 h-fit aspect-square w-full">
            <Skeleton className="aspect-square w-full px-8 py-6" />
            <Skeleton className="w-full py-8" />
        </div>
        <div className="flex flex-col gap-3 h-fit aspect-square w-full">
            <Skeleton className="aspect-square w-full px-8 py-6" />
            <Skeleton className="w-full py-8" />
        </div>
        <div className="flex flex-col gap-3 h-fit aspect-square w-full">
            <Skeleton className="aspect-square w-full px-8 py-6" />
            <Skeleton className="w-full py-8" />
        </div>
        <div className="flex flex-col gap-3 h-fit aspect-square w-full">
            <Skeleton className="aspect-square w-full px-8 py-6" />
            <Skeleton className="w-full py-8" />
        </div>

        <div className="flex flex-col gap-3 h-fit aspect-square w-full">
            <Skeleton className="aspect-square w-full px-8 py-6" />
            <Skeleton className="w-full py-8" />
        </div>
        <div className="flex flex-col gap-3 h-fit aspect-square w-full">
            <Skeleton className="aspect-square w-full px-8 py-6" />
            <Skeleton className="w-full py-8" />
        </div>
        <div className="flex flex-col gap-3 h-fit aspect-square w-full">
            <Skeleton className="aspect-square w-full px-8 py-6" />
            <Skeleton className="w-full py-8" />
        </div>
        <div className="flex flex-col gap-3 h-fit aspect-square w-full">
            <Skeleton className="aspect-square w-full px-8 py-6" />
            <Skeleton className="w-full py-8" />
        </div>
      </div>
  );
}
