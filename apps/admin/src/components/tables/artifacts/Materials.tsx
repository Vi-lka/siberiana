import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { MaterialsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getMaterialsQuery } from "~/lib/queries/client/artifacts";
import { FormSelectMulti } from "../inputs/FormSelectMulti";

export default function Materials({
  defaultMaterials,
  formValueName,
}: {
  defaultMaterials: {
    id: string;
    displayName: string;
  }[];
  formValueName: string;
}) {
  const defaultItems =
    defaultMaterials.length > 0
      ? defaultMaterials
      : [{ id: "", displayName: "__" }];

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    MaterialsList,
    Error
  >({
    queryKey: ["materials"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getMaterialsQuery(),
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
        <ErrorToast error={error.message} place="Материалы" />
      </>
    );
  }

  const itemsData = data
    ? data.media.edges.map(({ node }) => {
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
        defaultValues={defaultMaterials}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
      />
    </div>
  );
}
