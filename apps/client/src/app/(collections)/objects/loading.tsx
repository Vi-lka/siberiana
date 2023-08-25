import { Skeleton } from "@siberiana/ui";
import React from "react";
import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";
import MasonrySkeleton from "~/components/skeletons/MasonrySkeleton";

export default function LoadingObjects() {
  return (
    <>
      <BreadcrumbsSkeleton/>

      <div className="mt-10 mb-24">
        <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
          <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
        </div>

        <Skeleton className="w-full h-20 mb-4" />

        <Skeleton className="w-full h-10" />

        <div className="flex gap-6 items-center md:justify-end justify-between mt-3">
          <Skeleton className="h-full w-12 py-5 md:hidden block" />
          <Skeleton className="h-full md:w-[20%] w-3/5 py-5" />
        </div>

        <div className="flex gap-6 w-full justify-end md:mt-0 mt-3 mb-12 relative">
          <div className="md:w-3/4 w-full">
            <MasonrySkeleton />
          </div>
        </div>
      </div>
    </>
  );
}
