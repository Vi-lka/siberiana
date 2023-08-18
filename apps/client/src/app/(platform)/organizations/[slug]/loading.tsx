import { Skeleton } from "@siberiana/ui";
import React from "react";
import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";
import RowBigBlockBelowSkeleton from "~/components/skeletons/RowBigBlockBelowSkeleton";
import RowBlockBelowSkeleton from "~/components/skeletons/RowBlockBelowSkeleton";
import RowBlockSkeleton from "~/components/skeletons/RowBlockSkeleton";

export default function LoadingOrganizationBySlug() {
  return ( 
    <>
      <BreadcrumbsSkeleton/>

      {/* TITLE */}
      <div className="mt-14 mb-24 flex lg:flex-row flex-col-reverse gap-6 justify-between lg:items-center">
        <div className="flex flex-col gap-6 lg:w-[60%] sm:w-[80%] w-full">
          <Skeleton className="w-full h-20" />

          <div className="flex md:gap-6 gap-3">
            <Skeleton className="lg:w-[52px] lg:h-[52px] w-[44px] h-[44px] p-3 rounded-full" />
            <Skeleton className="md:px-36 md:py-6 py-[22px] px-[22px] rounded-full" />
          </div>
        </div>
  
        <div className="relative flex lg:w-[40%] w-full aspect-[2/1] overflow-hidden rounded-md">
          <Skeleton className="w-full object-cover aspect-[2/1]"/>
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
        <RowBigBlockBelowSkeleton />
      </div>

      {/* CONTACTS */}
      <div className="mb-24">
        <div className="mb-10 flex items-center justify-between">
          <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
        </div>

        <div className="flex justify-start lg:flex-row flex-col gap-7">
          <Skeleton className="lg:w-1/2 w-full min-h-[375px] rounded-xl" />

          <div>
            <Skeleton className="w-64 h-44 mb-6" />
            <Skeleton className="md:px-28 md:py-6 py-[22px] px-[22px] rounded-full" />
          </div>
        </div>
      </div>
    </>
  );
}
