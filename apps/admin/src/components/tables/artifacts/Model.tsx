import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { ModelsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getModelsQuery } from "~/lib/queries/client/artifacts";
import { FormSelect } from "../inputs/FormSelect";

export default function Model({
  defaultModel,
  formValueName,
  className,
}: {
  defaultModel: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultItem = defaultModel
    ? defaultModel
    : { id: "", displayName: "__" };

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    ModelsList,
    Error
  >({
    queryKey: ["model"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getModelsQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        <p className="">{defaultItem.displayName}</p>
        <ErrorToast error={error.message} place="License" />
      </>
    );
  }

  const itemsData = data
    ? data.models.edges.map(({ node }) => {
        const id = node.id;
        const displayName = node.displayName;
        return { id, displayName };
      })
    : null;

  const handleClick = () => {
    void refetch();
  };

  return (
    <div className="h-full w-full">
      <FormSelect
        defaultValue={defaultModel}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
        className={className}
      />
    </div>
  );
}
