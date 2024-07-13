import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { SettlementsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { FormSelect } from "../inputs/FormSelect";
import { getSettlementsQuery } from "~/lib/queries/client/global";

export default function Settlement({
  defaultSettlement,
  formValueName,
  className,
}: {
    defaultSettlement: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultItem = defaultSettlement
    ? defaultSettlement
    : { id: "", displayName: "__" };

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    SettlementsList,
    Error
  >({
    queryKey: ["settlements"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getSettlementsQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        <p className="">{defaultItem.displayName}</p>
        <ErrorToast error={error.message} place="Settlement" />
      </>
    );
  }

  const itemsData = data
    ? data.settlements.edges.map(({ node }) => {
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
        defaultValue={defaultSettlement}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
        className={className}
      />
    </div>
  );
}
