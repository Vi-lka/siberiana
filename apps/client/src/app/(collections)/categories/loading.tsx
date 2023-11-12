import React from "react";

import { Skeleton } from "@siberiana/ui";

import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";

export default function LoadingCategories() {
  return (
    <>
      <BreadcrumbsSkeleton />

      <div className="mb-24 mt-10">
        <div className="mb-4 mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
        </div>

        <Skeleton className="h-10 w-full" />

        <div className="mt-3 flex items-center justify-end gap-6">
          <Skeleton className="h-full w-4/5 py-5 md:w-[20%]" />
        </div>

        <div className="mx-auto mb-12 mt-3 grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-2 min-[2000px]:grid-cols-3">
          {[Array(12)].map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-square w-full px-8 py-6 md:aspect-[2/1]"
            />
          ))}
        </div>
      </div>
    </>
  );
}
