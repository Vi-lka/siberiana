import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { TechniquesList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getTechniquesQuery } from "~/lib/queries/client/artifacts";
import { FormSelectMulti } from "../inputs/FormSelectMulti";

export default function Techniques({
  defaultTechniques,
  formValueName,
  className,
}: {
  defaultTechniques: {
    id: string;
    displayName: string;
  }[];
  formValueName: string;
  className?: string;
}) {
  const defaultItems =
    defaultTechniques.length > 0
      ? defaultTechniques
      : [{ id: "", displayName: "__" }];

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    TechniquesList,
    Error
  >({
    queryKey: ["techniques"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getTechniquesQuery(),
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
        <ErrorToast error={error.message} place="Техники" />
      </>
    );
  }

  const itemsData = data
    ? data.techniques.edges.map(({ node }) => {
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
        defaultValues={defaultTechniques}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        className={className}
        onClick={handleClick}
      />
    </div>
  );
}
