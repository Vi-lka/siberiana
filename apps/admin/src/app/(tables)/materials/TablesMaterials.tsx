import React from "react";
import { Loader2 } from "lucide-react";

import type { MaterialForTable } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import { ClientHydration } from "~/components/providers/ClientHydration";
import { getMaterials } from "~/lib/queries/artifacts";
import { columns } from "./columns";
import CreateTable from "./CreateTable";
import { updateColumns } from "./updateColumns";
import UpdateTable from "./UpdateTable";

export default async function TablesMaterials({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const mode = searchParams["mode"] as string | undefined;

  const [dataResult] = await Promise.allSettled([
    getMaterials({
      first: null,
    }),
  ]);

  const dataForCreate = [
    {
      id: "random" + Math.random().toString(),
      displayName: "",
      description: "",
      externalLink: "",
    },
  ] as MaterialForTable[];

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
          place="Materials"
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
    } as MaterialForTable;
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
