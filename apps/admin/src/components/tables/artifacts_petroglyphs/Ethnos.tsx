"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { EthnosList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getEthnosSliceQuery } from "~/lib/queries/client/artifacts";
import { FormSelect } from "../inputs/FormSelect";

export default function Ethnos({
  defaultEthnos,
  formValueName,
  className,
}: {
  defaultEthnos: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultLable = !!defaultEthnos ? defaultEthnos.displayName : "__";

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    EthnosList,
    Error
  >({
    queryKey: ["ethnosSlice"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getEthnosSliceQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        {defaultLable}
        <ErrorToast error={error.message} place="Этносы" />
      </>
    );
  }

  const itemsData = data
    ? data.ethnosSlice.edges.map(({ node }) => {
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
        defaultValue={defaultEthnos}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        className={className}
        onClick={handleClick}
      />
    </div>
  );
}
