import React from "react";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";

import type { BookForTable } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import { ClientHydration } from "~/components/providers/ClientHydration";
import { getBooks } from "~/lib/queries/books";
import { getCollections } from "~/lib/queries/collections";
import getStatusName from "~/lib/utils/getStatusName";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { columns, moderatorsColumns, moderatorsUpdateColumns, updateColumns } from "./columns";
import CreateTable from "./CreateTable";
import UpdateTable from "./UpdateTable";

export default async function TablesBooks({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  const roles = session?.user.roles;

  const isModerator = roles?.includes("moderator");

  const mode = searchParams["mode"] as string | undefined;
  const category = searchParams["category"] as string | undefined;
  const collection = searchParams["collection"] as string | undefined;

  const results = await Promise.allSettled([
    getBooks({
      first: null,
      category,
      collection,
    }),
    getCollections({
      first: null,
      slug: collection,
    }),
  ]);

  // Error or no collection found
  if (results[1].status === "rejected")
    return (
      <ErrorHandler
        error={results[1].reason as unknown}
        place="Books"
        notFound
        goBack
      />
    );

  const collectionFulfilled = results[1];

  const statusForModerator = {
    id: "listed",
    displayName: getStatusName("listed"),
  };
  const statusForAdmin = {
    id: "draft",
    displayName: getStatusName("draft"),
  };
  const dataForCreate = [
    {
      id: "random" + Math.random().toString(),
      status: isModerator ? statusForModerator : statusForAdmin,
      displayName: "",
      description: "",
      externalLink: "",
      year: undefined,
      files: [],
      primaryImage: {
        file: undefined,
        url: "",
      },
      bookGenres: [],
      authors: [],
      periodical: null,
      publisher: null,
      license: null,
      library: null,
      location: null,
      collection: {
        id: collectionFulfilled.value.edges[0].node.id,
        displayName: collectionFulfilled.value.edges[0].node.displayName,
      },
    },
  ] as BookForTable[];

  if (results[0].status === "rejected") {
    if ((results[0].reason as Error).message === "NEXT_NOT_FOUND") {
      return (
        <div className="mx-auto w-full pt-3">
          <h1 className="font-Inter mb-6 flex-grow text-center text-2xl font-semibold lg:mb-1">
            Добавление
          </h1>
          <ClientHydration
            fallback={
              <Loader2 className="mx-auto mt-12 h-12 w-12 animate-spin" />
            }
          >
            <CreateTable
              columns={columns}
              moderatorsColumns={moderatorsColumns}
              data={dataForCreate}
            />
          </ClientHydration>
        </div>
      );
    } else
      return (
        <ErrorHandler
          error={results[0].reason as unknown}
          place="Books"
          notFound
          goBack
        />
      );
  }

  const dataForUpdate = results[0].value.edges.map((data) => {
    const node = data.node;
    const {
      status,
      primaryImageURL,
      collection,
      location,
      country,
      region,
      district,
      settlement,
      ...rest // assigns remaining
    } = node;

    const locationForTabel = location
      ? { ...location, type: "location" }
      : settlement
      ? { ...settlement, type: "settlement" }
      : district
      ? { ...district, type: "district" }
      : region
      ? { ...region, type: "region" }
      : country
      ? { ...country, type: "country" }
      : null;

    return {
      status: {
        id: status,
        displayName: getStatusName(status),
      },
      primaryImage: {
        file: null,
        url: primaryImageURL,
      },
      collection: {
        id: collection.id,
        displayName: collection.displayName,
      },
      location: locationForTabel,
      ...rest,
    } as BookForTable;
  });

  if (mode === "add")
    return (
      <div className="mx-auto w-full pt-3">
        <h1 className="font-Inter mb-4 flex-grow text-center text-2xl font-semibold lg:mb-1">
          Добавление
        </h1>
        <ClientHydration
          fallback={
            <Loader2 className="mx-auto mt-12 h-12 w-12 animate-spin" />
          }
        >
          <CreateTable
            columns={columns}
            moderatorsColumns={moderatorsColumns}
            data={dataForCreate}
            hasObjectsToUpdate
          />
        </ClientHydration>
      </div>
    );

  return (
    <div className="mx-auto w-full pt-3">
      <h1 className="font-Inter mb-4 flex-grow text-center text-2xl font-semibold lg:mb-1">
        Редактирование
      </h1>
      <ClientHydration
        fallback={<Loader2 className="mx-auto mt-12 h-12 w-12 animate-spin" />}
      >
        <UpdateTable
          columns={updateColumns}
          moderatorsColumns={moderatorsUpdateColumns}
          data={dataForUpdate}
        />
      </ClientHydration>
    </div>
  );
}
