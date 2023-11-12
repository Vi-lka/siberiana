import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function GridBlockSkeleton() {
  return (
    <div className="mx-auto grid aspect-auto w-[85%] grid-flow-row-dense grid-cols-1 grid-rows-5 gap-6 md:aspect-[4/2] md:w-full md:grid-cols-4 md:grid-rows-2">
      <Skeleton className="col-span-1 row-span-1 aspect-square md:col-span-2 md:row-span-1 md:aspect-auto" />
      <Skeleton className="col-span-1 row-span-1 aspect-square md:col-span-1 md:row-span-1 md:aspect-auto" />
      <Skeleton className="col-span-1 row-span-1 aspect-square md:col-span-1 md:row-span-2 md:aspect-auto" />
      <Skeleton className="col-span-1 row-span-1 aspect-square md:col-span-1 md:row-span-1 md:aspect-auto" />
      <Skeleton className="col-span-1 row-span-1 aspect-square md:col-span-2 md:row-span-1 md:aspect-auto" />
    </div>
  );
}
