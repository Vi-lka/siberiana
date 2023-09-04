import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function RowBlockSkeleton() {
  return (
    <div className="md:w-full w-[85%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4">
      <Skeleton className="aspect-square w-full px-8 py-6" />
      <Skeleton className="aspect-square w-full px-8 py-6" />
      <Skeleton className="aspect-square w-full px-8 py-6" />
      <Skeleton className="aspect-square w-full px-8 py-6" />
    </div>
  );
}
