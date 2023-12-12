import { Skeleton } from "@siberiana/ui";

export default function SimilarObjectsSkeleton() {
  return (
    <div className="mb-20">
      <Skeleton className="mb-10 h-8 w-80" />
      <div className="flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-4 xl:gap-10">
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="aspect-square w-full" />
        <Skeleton className="aspect-square w-full" />
      </div>
    </div>
  );
}
