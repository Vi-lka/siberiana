import React from "react";

import { Skeleton } from "@siberiana/ui";

export default function MasonrySkeleton() {
  return (
    <div
      className="
        mx-auto mt-6 w-full 
        columns-1
        gap-6
        min-[400px]:columns-2
        min-[900px]:columns-3
        min-[1200px]:columns-4
        min-[2000px]:columns-5
        min-[2800px]:columns-6
    "
    >
      <Skeleton className="aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />

      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />

      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />

      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />

      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />

      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-square w-full" />
      <Skeleton className="mt-6 aspect-video w-full" />
    </div>
  );
}
