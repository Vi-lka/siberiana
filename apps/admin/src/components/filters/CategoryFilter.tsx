import React from "react";

import ErrorHandler from "~/components/errors/ErrorHandler";
import { getCategories } from "~/lib/queries/collections";
import { Select } from "./Select";

export default async function CategoryFilter({
  artType,
  artifactsType,
  booksType,
  PAPType,
}: {
  artType?: boolean;
  artifactsType?: boolean;
  booksType?: boolean;
  PAPType?: boolean;
}) {
  const [result] = await Promise.allSettled([
    getCategories({
      first: null,
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
        place="Category Filter"
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
    <div className="mb-3 flex flex-col gap-1">
      <h1 className="font-medium">Категории</h1>
      <Select
        isMulti={false}
        side="bottom"
        values={resultsFiltered}
        param="category"
        deleteParam="collection"
        placeholder="Выберите категорию"
        className="w-full max-w-none"
      />
    </div>
  );
}
