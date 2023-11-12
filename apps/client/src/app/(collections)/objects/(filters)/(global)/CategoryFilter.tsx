import React from "react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import { Select } from "~/components/ui/filters/Select";
import { getCategories } from "~/lib/queries/api-collections";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function CategoryFilter() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const [result] = await Promise.allSettled([getCategories({ first: null })]);

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
      <h1 className="font-medium">{dictResult.objects.filters.categories}</h1>
      <Select
        isMulti={false}
        side="right"
        values={resultsFiltered}
        param="category"
        deleteParam="collection"
        placeholder="Выберите категорию"
        className="w-full max-w-none"
      />
    </div>
  );
}
