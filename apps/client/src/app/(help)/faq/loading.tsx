import React from "react";

import { Skeleton } from "@siberiana/ui";

import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";

export default function LoadingFAQ() {
  return (
    <>
      <BreadcrumbsSkeleton />

      <div className="mx-auto mb-24 mt-10 w-full max-w-[1000px] md:w-3/4 lg:w-3/5">
        <Skeleton className="mb-6 h-12 w-4/5" />
        <Skeleton className="mb-12 h-6 w-full" />

        {[1,2,3,4,5].map((_, index) => (
          <div key={index} className="mb-14">
            <Skeleton className="mb-6 h-9 w-full" />

            <Skeleton className="mb-1 h-14 w-full" />
            <Skeleton className="mb-1 h-14 w-full" />
            <Skeleton className="mb-1 h-14 w-full" />
          </div>
        ))}
      </div>
    </>
  );
}
