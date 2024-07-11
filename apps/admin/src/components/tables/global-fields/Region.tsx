import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { RegionsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { FormSelect } from "../inputs/FormSelect";
import { getRegionsQuery } from "~/lib/queries/client/global";

export default function Region({
  defaultRegion,
  formValueName,
  className,
}: {
    defaultRegion: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultItem = defaultRegion
    ? defaultRegion
    : { id: "", displayName: "__" };

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
  RegionsList,
    Error
  >({
    queryKey: ["region"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getRegionsQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        <p className="">{defaultItem.displayName}</p>
        <ErrorToast error={error.message} place="Region" />
      </>
    );
  }

  const itemsData = data
    ? data.regions.edges.map(({ node }) => {
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
        defaultValue={defaultRegion}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
        className={className}
      />
    </div>
  );
}
