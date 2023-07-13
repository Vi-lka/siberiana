import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function QuizSkeleton() {
  return (
    <div className="hidden grid-cols-2 justify-center gap-6 md:grid">
      <div className="relative h-[300px] w-full max-w-[800px] overflow-hidden rounded-md 2xl:h-[350px]">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col justify-between">
        <div>
          <Skeleton className="mb-6 h-8 w-full" />
          <Skeleton className="xl:h-34 h-24 w-full" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Skeleton className="h-full w-full px-8 py-6" />
          <Skeleton className="h-full w-full px-8 py-6" />
          <Skeleton className="h-full w-full px-8 py-6" />
          <Skeleton className="h-full w-full px-8 py-6" />
        </div>
      </div>
    </div>
  );
}
