import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { CountriesList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { FormSelect } from "../inputs/FormSelect";
import { getCountriesQuery } from "~/lib/queries/client/global";

export default function Country({
  defaultCountry,
  formValueName,
  className,
}: {
    defaultCountry: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultItem = defaultCountry
    ? defaultCountry
    : { id: "", displayName: "__" };

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    CountriesList,
    Error
  >({
    queryKey: ["country"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getCountriesQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        <p className="">{defaultItem.displayName}</p>
        <ErrorToast error={error.message} place="Country" />
      </>
    );
  }

  const itemsData = data
    ? data.countries.edges.map(({ node }) => {
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
        defaultValue={defaultCountry}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
        className={className}
      />
    </div>
  );
}
