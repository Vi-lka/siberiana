import { Skeleton } from "@siberiana/ui";

export default function SimilarObjectsSkeleton() {
  return (
    <div className="flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-4 xl:gap-10">
      {Array(4).map((_, i) => (
        <Skeleton className="aspect-square w-full" />
      ))}
    </div>
  );
}
