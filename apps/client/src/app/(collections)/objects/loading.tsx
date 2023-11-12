import React from "react";

import { Skeleton } from "@siberiana/ui";

import BreadcrumbsSkeleton from "~/components/skeletons/BreadcrumbsSkeleton";
import MasonrySkeleton from "~/components/skeletons/MasonrySkeleton";

export default function LoadingObjects() {
  return (
    <>
      <BreadcrumbsSkeleton />

      <div className="mb-24 mt-10">
        <div className="mb-4 mt-10 flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
        </div>

        <Skeleton className="mb-4 h-20 w-full" />

        <Skeleton className="h-10 w-full" />

        <div className="relative">
          <div className="mt-4 flex items-center justify-between gap-6 lg:mt-3 lg:justify-end">
            <Skeleton className="block w-12 py-5 lg:hidden" />
            <Skeleton className="block w-3/5 py-5 lg:hidden lg:w-[20%]" />
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            <div className="hidden w-[30%] lg:flex xl:w-[24%] 2xl:w-1/5">
              <Skeleton className="h-full w-full" />
            </div>

            <div className="mt-3 w-full lg:mt-0 lg:w-[70%] xl:w-[76%] 2xl:w-4/5">
              <div className="flex w-full flex-col">
                <Skeleton className="mt-2 h-10 w-full" />
                <MasonrySkeleton />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
