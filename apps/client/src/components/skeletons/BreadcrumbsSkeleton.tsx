import React from "react";

import { Skeleton } from "@siberiana/ui";
import { ChevronRight } from "lucide-react";

export default function BreadcrumbsSkeleton() {
  return (
    <div className="font-Inter flex items-center mt-2">
        <Skeleton className="w-16 sm:px-3 sm:py-3 p-2" />
        <ChevronRight className="sm:mx-1 h-5 w-5" />

        <Skeleton className="w-16 sm:px-3 sm:py-3 p-2" />
        <ChevronRight className="sm:mx-1 h-5 w-5" />

        <Skeleton className="w-16 sm:px-3 sm:py-3 p-2" />
    </div>
  );
}
