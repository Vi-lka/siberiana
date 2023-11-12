import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function RowBlockSkeleton() {
  return (
    <div className="mx-auto grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-4">
      <Skeleton className="aspect-square w-full px-8 py-6" />
      <Skeleton className="aspect-square w-full px-8 py-6" />
      <Skeleton className="aspect-square w-full px-8 py-6" />
      <Skeleton className="aspect-square w-full px-8 py-6" />
    </div>
  );
}
