import { Skeleton } from "@siberiana/ui";
import React from "react";
import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";
import RowBlockBelowSkeleton from "~/components/skeletons/RowBlockBelowSkeleton";

export default function LoadingAbout() {
  return (
    <>
      <BreadcrumbsSkeleton/>

      <div className="mt-10 mb-24 max-w-[1600px] mx-auto">
        <div className="my-10 flex gap-4 md:flex-row flex-col md:items-center justify-between">
          <Skeleton className="w-full h-24" />
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
