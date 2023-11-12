import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { PublicationsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getPublicationsQuery } from "~/lib/queries/client/global";
import { FormSelectMulti } from "../inputs/FormSelectMulti";

export default function Publications({
  defaultPublications,
  formValueName,
}: {
  defaultPublications: {
    id: string;
    displayName: string;
  }[];
  formValueName: string;
}) {
  const defaultItems =
    defaultPublications.length > 0
      ? defaultPublications
      : [{ id: "", displayName: "__" }];

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    PublicationsList,
    Error
  >({
    queryKey: ["publications"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getPublicationsQuery(),
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
        <ErrorToast error={error.message} place="Публикации" />
      </>
    );
  }

  const itemsData = data
    ? data.publications.edges.map(({ node }) => {
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
        defaultValues={defaultPublications}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
      />
    </div>
  );
}
