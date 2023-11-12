import React from "react";
import { ChevronRight } from "lucide-react";

import { Skeleton } from "@siberiana/ui";

export default function BreadcrumbsSkeleton() {
  return (
    <div className="font-Inter flex items-center lg:mt-1">
      <Skeleton className="h-5 w-16 p-2 sm:px-3 sm:py-3 md:h-8" />
      <ChevronRight className="h-5 w-5 sm:mx-1" />

      <Skeleton className="h-5 w-16 p-2 sm:px-3 sm:py-3 md:h-8" />
      <ChevronRight className="h-5 w-5 sm:mx-1" />

      <Skeleton className="h-5 w-16 p-2 sm:px-3 sm:py-3 md:h-8" />
    </div>
  );
}
