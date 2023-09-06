import { Skeleton } from "@siberiana/ui";
import React from "react";
import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";

export default function LoadingCollections() {
  return (
    <>
      <BreadcrumbsSkeleton/>

      <div className="mt-10 mb-24">
        <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
          <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
        </div>

        <Skeleton className="w-full h-20 mb-4" />

        <Skeleton className="w-full h-10" />

        <div className="flex gap-6 items-center justify-between mt-3">
          <Skeleton className="h-full w-12 py-5" />
          <Skeleton className="h-full md:w-[20%] w-3/5 py-5" />
        </div>

        <div className="md:w-full w-[85%] mt-3 mb-12 mx-auto grid min-[2000px]:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
          {[Array(12)].map((_, i) => (
            <Skeleton key={i} className="md:aspect-[2/1] aspect-square w-full px-8 py-6" />
          ))}
        </div>
      </div>
    </>
  );
}
