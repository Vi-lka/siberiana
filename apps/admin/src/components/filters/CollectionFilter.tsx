import React from "react";

import ErrorHandler from "~/components/errors/ErrorHandler";
import { getCollections } from "~/lib/queries/collections";
import { Select } from "./Select";

export default async function CollectionFilter({
  searchParams,
  artType,
  artifactsType,
  booksType,
  PAPType,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  artType?: boolean;
  artifactsType?: boolean;
  booksType?: boolean;
  PAPType?: boolean;
}) {
  const categories = searchParams["category"] as string | undefined;

  const [result] = await Promise.allSettled([
    getCollections({
      first: null,
      categories,
      artType,
      artifactsType,
      booksType,
      PAPType,
    }),
  ]);

  if (result.status === "rejected") {
    return (
      <ErrorHandler
        error={result.reason as unknown}
        place="Collection Filter"
        notFound
        goBack
      />
    );
  }

  const resultsFiltered = result.value.edges.map((el) => {
    const value = el.node.slug;
    const label = el.node.displayName;
    return { value, label };
  });

  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-medium">Коллекции</h1>
      <Select
        isMulti={false}
        badges
        side="bottom"
        values={resultsFiltered}
        param="collection"
        placeholder="Выберите коллекции"
        className="w-full max-w-none"
      />
    </div>
  );
}
