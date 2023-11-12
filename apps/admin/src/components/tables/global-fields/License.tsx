import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { LicenseList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getLicensesQuery } from "~/lib/queries/client/global";
import { FormSelect } from "../inputs/FormSelect";

export default function License({
  defaultLicense,
  formValueName,
  className,
}: {
  defaultLicense: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultItem = defaultLicense
    ? defaultLicense
    : { id: "", displayName: "__" };

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    LicenseList,
    Error
  >({
    queryKey: ["license"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getLicensesQuery(),
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
    ? data.licenses.edges.map(({ node }) => {
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
        defaultValue={defaultLicense}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
        className={className}
      />
    </div>
  );
}
