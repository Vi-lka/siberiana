import { Skeleton } from "@siberiana/ui";
import React from "react";
import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";

export default function LoadingProjects() {
  return (
    <>
      <BreadcrumbsSkeleton/>

      <div className="mt-10 mb-24">
        <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
          <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
          <Skeleton className="h-full md:w-[20%] w-full md:py-5 py-4" />
        </div>

        <Skeleton className="w-full h-10 mb-12" />

        <RowBigBlockSkeleton />
      </div>
    </>
  );
}
