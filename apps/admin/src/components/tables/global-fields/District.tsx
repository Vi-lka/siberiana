import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { DistrictsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { FormSelect } from "../inputs/FormSelect";
import { getDistrictsQuery } from "~/lib/queries/client/global";

export default function District({
  defaultDistrict,
  formValueName,
  className,
}: {
    defaultDistrict: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultItem = defaultDistrict
    ? defaultDistrict
    : { id: "", displayName: "__" };

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    DistrictsList,
    Error
  >({
    queryKey: ["district"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getDistrictsQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        <p className="">{defaultItem.displayName}</p>
        <ErrorToast error={error.message} place="District" />
      </>
    );
  }

  const itemsData = data
    ? data.districts.edges.map(({ node }) => {
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
        defaultValue={defaultDistrict}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
        className={className}
      />
    </div>
  );
}
