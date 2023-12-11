"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { MonumentsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getMonumentsQuery } from "~/lib/queries/client/artifacts";
import { FormSelect } from "../inputs/FormSelect";

export default function Monument({
  defaultMonument,
  formValueName,
  className,
}: {
  defaultMonument: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultLable = !!defaultMonument ? defaultMonument.displayName : "__";

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    MonumentsList,
    Error
  >({
    queryKey: ["monuments"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getMonumentsQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        {defaultLable}
        <ErrorToast error={error.message} place="Памятники" />
      </>
    );
  }

  const itemsData = data
    ? data.monuments.edges.map(({ node }) => {
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
        defaultValue={defaultMonument}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        className={className}
        onClick={handleClick}
      />
    </div>
  );
}
