import { Skeleton } from "@siberiana/ui";
import React from "react";
import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";

export default function LoadingFAQ() {
  return (
    <>
      <BreadcrumbsSkeleton/>

      <div className="mt-10 mb-24 lg:w-3/5 md:w-3/4 w-full mx-auto">
        <Skeleton className="w-4/5 h-12 mb-6" />
        <Skeleton className="w-full h-6 mb-12" />

        {[0, 1, 2, 3, 4].map(i => (
          <div key={i} className="mb-14">
            <Skeleton className="w-full h-9 mb-6" />

            <Skeleton className="w-full h-14 mb-1" />
            <Skeleton className="w-full h-14 mb-1" />
            <Skeleton className="w-full h-14 mb-1" />
          </div>
        ))}
      </div>
    </>
  );
}
