import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { OrganizationList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getOrganizationsQuery } from "~/lib/queries/client/global";
import { FormSelect } from "../inputs/FormSelect";

export default function Organization({
  defaultOrganization,
  formValueName,
  className,
}: {
  defaultOrganization: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultItem = defaultOrganization
    ? defaultOrganization
    : { id: "", displayName: "__" };

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    OrganizationList,
    Error
  >({
    queryKey: ["organizations"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getOrganizationsQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        <p className="">{defaultItem.displayName}</p>
        <ErrorToast error={error.message} place="Organizations" />
      </>
    );
  }

  const itemsData = data
    ? data.organizations.edges.map(({ node }) => {
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
        defaultValue={defaultOrganization}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
        className={className}
      />
    </div>
  );
}
