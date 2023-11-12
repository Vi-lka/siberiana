import React from "react";

import type { CollectionForm } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import { getCollections } from "~/lib/queries/collections";
import AddCollection from "./AddCollection";
import UpdateCollection from "./UpdateCollection";

export const dynamic = "force-dynamic";

export default async function CollectionsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = searchParams["search"] as string | undefined;

  const [result] = await Promise.allSettled([
    getCollections({
      first: null,
      search,
    }),
  ]);
  if (result.status === "rejected") {
    return (
      <ErrorHandler
        error={result.reason as unknown}
        place="Collections Page"
        notFound
        goBack
      />
    );
  }

  const dataForUpdate = result.value.edges.map((data) => {
    const node = data.node;
    const {
      primaryImageURL,
      ...rest // assigns remaining
    } = node;

    return {
      primaryImage: {
        file: null,
        url: primaryImageURL,
      },
      ...rest,
    } as CollectionForm;
  });

  return (
    <div key={Math.random()} className="font-OpenSans px-2 py-10 md:ml-[14rem]">
      <AddCollection className="ml-auto mr-6" />
      <div className="mt-6 flex flex-wrap justify-center gap-10">
        {dataForUpdate.map((item) => (
          <div key={item.id} className="">
            <UpdateCollection {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
