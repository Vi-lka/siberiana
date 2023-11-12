import React from "react";

import { Skeleton } from "@siberiana/ui";

import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";
import RowBlockBelowSkeleton from "~/components/skeletons/RowBlockBelowSkeleton";

export default function LoadingAbout() {
  return (
    <>
      <BreadcrumbsSkeleton />

      <div className="mx-auto mb-24 mt-10 max-w-[1600px]">
        <div className="my-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="mb-12">
          <div className="mb-10 flex items-center justify-between">
            <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
          </div>
          <RowBlockBelowSkeleton />
        </div>
      </div>
    </>
  );
}
