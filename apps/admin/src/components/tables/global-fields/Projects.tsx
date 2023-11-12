import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { ProjectsList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getProjectsQuery } from "~/lib/queries/client/global";
import { FormSelectMulti } from "../inputs/FormSelectMulti";

export default function Projects({
  defaultProjects,
  formValueName,
}: {
  defaultProjects: {
    id: string;
    displayName: string;
  }[];
  formValueName: string;
}) {
  const defaultItems =
    defaultProjects.length > 0
      ? defaultProjects
      : [{ id: "", displayName: "__" }];

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    ProjectsList,
    Error
  >({
    queryKey: ["projects"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getProjectsQuery(),
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
        <ErrorToast error={error.message} place="Проекты" />
      </>
    );
  }

  const itemsData = data
    ? data.projects.edges.map(({ node }) => {
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
        defaultValues={defaultProjects}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        onClick={handleClick}
      />
    </div>
  );
}
