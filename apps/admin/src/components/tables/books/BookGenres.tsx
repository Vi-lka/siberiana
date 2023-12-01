import React from "react";
import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

import type { BookGenresList } from "@siberiana/schemas";

import ErrorToast from "~/components/errors/ErrorToast";
import { getBookGenresQuery } from "~/lib/queries/client/books";
import { FormSelectMulti } from "../inputs/FormSelectMulti";

export default function BookGenres({
  defaultBookGenres,
  formValueName,
  className
}: {
  defaultBookGenres: {
    id: string;
    displayName: string;
  }[];
  formValueName: string;
  className?: string;
}) {
  const defaultItems =
    defaultBookGenres.length > 0
      ? defaultBookGenres
      : [{ id: "", displayName: "__" }];

  const { data, isFetching, isPending, isError, error, refetch } = useQuery<
    BookGenresList,
    Error
  >({
    queryKey: ["bookGenres"],
    queryFn: async () =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        getBookGenresQuery(),
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
        <ErrorToast error={error.message} place="Разделы/Жанры книг" />
      </>
    );
  }

  const itemsData = data
    ? data.bookGenres.edges.map(({ node }) => {
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
        defaultValues={defaultBookGenres}
        formValueName={formValueName}
        isLoading={isFetching && isPending}
        className={className}
        onClick={handleClick}
      />
    </div>
  );
}
