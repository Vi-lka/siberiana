import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { SetsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getSetsQuery } from "~/lib/queries/client/artifacts";
import { FormSelectMulti } from "../inputs/FormSelectMulti";

export default function Sets({
  defaultSets,
  formValueName,
}: {
  defaultSets: {
    id: string;
    displayName: string;
  }[];
  formValueName: string;
}) {
  const defaultItems =
    defaultSets.length > 0 ? defaultSets : [{ id: "", displayName: "__" }];

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    SetsList,
    Error
  >({
    queryKey: ["sets"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getSetsQuery(),
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
        <ErrorToast error={error.message} place="Комплексы" />
      </>
    );
  }

  const itemsData = data
    ? data.sets.edges.map(({ node }) => {
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
        defaultValues={defaultSets}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
      />
    </div>
  );
}
