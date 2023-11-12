import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { MonumentsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getMonumentsQuery } from "~/lib/queries/client/artifacts";
import { FormSelectMulti } from "../inputs/FormSelectMulti";

export default function Monuments({
  defaultMonuments,
  formValueName,
}: {
  defaultMonuments: {
    id: string;
    displayName: string;
  }[];
  formValueName: string;
}) {
  const defaultItems =
    defaultMonuments.length > 0
      ? defaultMonuments
      : [{ id: "", displayName: "__" }];

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
        {defaultItems.map((item, index) => (
          <p key={index} className="">
            {item.displayName}
          </p>
        ))}
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
      <FormSelectMulti
        itemsData={itemsData}
        defaultValues={defaultMonuments}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
      />
    </div>
  );
}
