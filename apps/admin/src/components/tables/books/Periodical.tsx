import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { PeriodicalsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getPeriodicalsQuery } from "~/lib/queries/client/books";
import { FormSelect } from "../inputs/FormSelect";

export default function Periodical({
  defaultPeriodical,
  formValueName,
  className,
}: {
  defaultPeriodical: {
    id: string;
    displayName: string;
  } | null;
  formValueName: string;
  className?: string;
}) {
  const defaultItem = defaultPeriodical
    ? defaultPeriodical
    : { id: "", displayName: "__" };

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    PeriodicalsList,
    Error
  >({
    queryKey: ["periodicals"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getPeriodicalsQuery(),
      ),
    refetchOnWindowFocus: false,
    enabled: false, // disable this query from automatically running
  });

  if (isError && !!error) {
    return (
      <>
        <p className="">{defaultItem.displayName}</p>
        <ErrorToast error={error.message} place="Periodicals" />
      </>
    );
  }

  const itemsData = data
    ? data.periodicals.edges.map(({ node }) => {
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
        defaultValue={defaultPeriodical}
        itemsData={itemsData}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
        className={className}
      />
    </div>
  );
}
