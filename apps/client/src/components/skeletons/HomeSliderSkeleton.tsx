import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function HomeSliderSkeleton() {
  return (
    <div className="home-slider h-fit w-full">
      <div className="h-[35vh] w-full sm:h-[40vh] lg:h-[45vh] xl:h-[50vh] 2xl:h-[55vh]">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
}
