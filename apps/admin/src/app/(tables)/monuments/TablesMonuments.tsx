import React from "react";
import { Loader2 } from "lucide-react";

import type { MonumentForTable } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import { ClientHydration } from "~/components/providers/ClientHydration";
import { getMonuments } from "~/lib/queries/artifacts";
import { columns } from "./columns";
import CreateTable from "./CreateTable";
import UpdateTable from "./UpdateTable";
import { updateColumns } from "./updateColumns";

export default async function TablesMonuments({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const mode = searchParams["mode"] as string | undefined;

  const [dataResult] = await Promise.allSettled([
    getMonuments({
      first: null,
    }),
  ]);

  const dataForCreate = [
    {
      id: "random" + Math.random().toString(),
      displayName: "",
      description: "",
      externalLink: "",
      sets: [],
    },
  ] as MonumentForTable[];

  if (dataResult.status === "rejected") {
    if ((dataResult.reason as Error).message === "NEXT_NOT_FOUND") {
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
            <CreateTable columns={columns} data={dataForCreate} />
          </ClientHydration>
        </div>
      );
    } else
      return (
        <ErrorHandler
          error={dataResult.reason as unknown}
          place="Monuments"
          notFound
          goBack
        />
      );
  }

  const dataForUpdate = dataResult.value.edges.map((data) => {
    const node = data.node;
    const {
      artifacts,
      ...rest // assigns remaining
    } = node;

    const artifactsForTable = artifacts.length;

    return {
      artifacts: artifactsForTable,
      ...rest,
    } as MonumentForTable;
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
        <UpdateTable columns={updateColumns} data={dataForUpdate} />
      </ClientHydration>
    </div>
  );
}
