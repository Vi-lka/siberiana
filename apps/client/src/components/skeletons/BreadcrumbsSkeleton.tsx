import React from "react";

import { Skeleton } from "@siberiana/ui";
import { ChevronRight } from "lucide-react";

export default function BreadcrumbsSkeleton() {
  return (
    <div className="font-Inter flex items-center lg:mt-1">
        <Skeleton className="w-16 md:h-8 h-5 sm:px-3 sm:py-3 p-2" />
        <ChevronRight className="sm:mx-1 h-5 w-5" />

        <Skeleton className="w-16 md:h-8 h-5 sm:px-3 sm:py-3 p-2" />
        <ChevronRight className="sm:mx-1 h-5 w-5" />

        <Skeleton className="w-16 md:h-8 h-5 sm:px-3 sm:py-3 p-2" />
    </div>
  );
}
