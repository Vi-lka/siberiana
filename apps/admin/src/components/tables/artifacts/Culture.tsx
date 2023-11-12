"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { CulturesList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getCulturesQuery } from "~/lib/queries/client/artifacts";
import { FormSelect } from "../inputs/FormSelect";

export default function Culture({
  defaultCulture,
  rowIndex,
}: {
  defaultCulture: {
    id: string;
    displayName: string;
  } | null;
  rowIndex: number;
}) {
  const defaultLable = !!defaultCulture ? defaultCulture.displayName : "__";

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    CulturesList,
    Error
  >({
    queryKey: ["cultures"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getCulturesQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        {defaultLable}
        <ErrorToast error={error.message} place="Культуры" />
      </>
    );
  }

  const itemsData = data
    ? data.cultures.edges.map(({ node }) => {
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
        defaultValue={defaultCulture}
        itemsData={itemsData}
        formValueName={`artifacts[${rowIndex}].culturalAffiliation`}
        isLoading={isFetching && isPending}
        onClick={handleClick}
      />
    </div>
  );
}
