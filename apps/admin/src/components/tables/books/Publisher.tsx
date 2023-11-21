import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { PublishersList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getPublishersQuery } from "~/lib/queries/client/books";
import { FormSelect } from "../inputs/FormSelect";

export default function Publisher({
  defaultPublisher,
  formValueName,
  className,
}: {
  defaultPublisher: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultItem = defaultPublisher
    ? defaultPublisher
    : { id: "", displayName: "__" };

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    PublishersList,
    Error
  >({
    queryKey: ["Publishers"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getPublishersQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        <p className="">{defaultItem.displayName}</p>
        <ErrorToast error={error.message} place="Publishers" />
      </>
    );
  }

  const itemsData = data
    ? data.publishers.edges.map(({ node }) => {
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
        defaultValue={defaultPublisher}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
        className={className}
      />
    </div>
  );
}
