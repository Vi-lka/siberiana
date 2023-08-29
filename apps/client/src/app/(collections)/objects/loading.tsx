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

        <div className="relative">
          <div className="flex gap-6 items-center lg:justify-end justify-between lg:mt-3 mt-4">
            <Skeleton className="w-12 py-5 lg:hidden block" />
            <Skeleton className="w-3/5 py-5 lg:w-[20%] lg:hidden block" />
          </div>

          <div className="flex lg:flex-row flex-col gap-6">
            <div className="2xl:w-1/5 xl:w-[24%] w-[30%] lg:flex hidden">
              <Skeleton className='w-full h-full' />
            </div>

            <div className="2xl:w-4/5 xl:w-[76%] lg:w-[70%] w-full lg:mt-0 mt-3">
              <div className='w-full flex flex-col'>
                <Skeleton className='w-full h-10 mt-2' />
                <MasonrySkeleton />
              </div> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
