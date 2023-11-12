import React from "react";

import { Skeleton } from "@siberiana/ui";

import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";
import RowBlockBelowSkeleton from "~/components/skeletons/RowBlockBelowSkeleton";
import RowBlockSkeleton from "~/components/skeletons/RowBlockSkeleton";

export default function LoadingOrganizationBySlug() {
  return (
    <>
      <BreadcrumbsSkeleton />

      <div className="mx-auto max-w-[1600px]">
        {/* TITLE */}
        <div className="mb-24 mt-14 flex flex-col-reverse justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex w-full flex-col gap-6 sm:w-[80%] lg:w-[60%]">
            <Skeleton className="h-20 w-full" />

            <div className="flex gap-3 md:gap-6">
              <Skeleton className="h-[44px] w-[44px] rounded-full p-3 lg:h-[52px] lg:w-[52px]" />
              <Skeleton className="rounded-full px-[22px] py-[22px] md:px-36 md:py-6" />
            </div>
          </div>

          <div className="relative flex aspect-[2/1] w-full overflow-hidden rounded-md lg:w-[40%]">
            <Skeleton className="aspect-[2/1] w-full object-cover" />
          </div>
        </div>

        {/* COLLECTIONS */}
        <div className="mb-24">
          <div className="mb-10 flex items-center justify-between">
            <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
            <Skeleton className="h-full w-[20%] py-5" />
          </div>
          <RowBlockSkeleton />
        </div>

        {/* EXHIBITS */}
        <div className="mb-24">
          <div className="mb-10 flex items-center justify-between">
            <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
            <Skeleton className="h-full w-[20%] py-5" />
          </div>
          <RowBlockBelowSkeleton />
        </div>

        {/* EVENTS */}
        <div className="mb-24">
          <div className="mb-10 flex items-center justify-between">
            <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
            <Skeleton className="h-full w-[20%] py-5" />
          </div>
          <RowBigBlockSkeleton />
        </div>

        {/* CONTACTS */}
        <div className="mb-24">
          <div className="mb-10 flex items-center justify-between">
            <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
          </div>

          <div className="flex flex-col justify-start gap-7 lg:flex-row">
            <Skeleton className="min-h-[375px] w-full rounded-xl lg:w-1/2" />

            <div>
              <Skeleton className="mb-6 h-44 w-64" />
              <Skeleton className="rounded-full px-[22px] py-[22px] md:px-28 md:py-6" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
