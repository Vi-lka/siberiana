import React from "react";
import { Loader2 } from "lucide-react";
import { getServerSession } from "next-auth";

import type { ModelForTable } from "@siberiana/schemas";

import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import ErrorHandler from "~/components/errors/ErrorHandler";
import { ClientHydration } from "~/components/providers/ClientHydration";
import { getModels } from "~/lib/queries/artifacts";
import getStatusName from "~/lib/utils/getStatusName";
import { columns, moderatorsColumns } from "./columns";
import CreateTable from "./CreateTable";
import { moderatorsUpdateColumns, updateColumns } from "./updateColumns";
import UpdateTable from "./UpdateTable";

export default async function TablesModels({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);

  const roles = session?.user.roles;

  const isModerator = roles?.includes("moderator");

  const mode = searchParams["mode"] as string | undefined;

  const [dataResult] = await Promise.allSettled([
    getModels({
      first: null,
    }),
  ]);

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
      file: {
        file: null,
        url: "",
      },
      description: "",
      externalLink: "",
      artifacts: [],
      petroglyphs: [],
    },
  ] as ModelForTable[];

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
          error={dataResult.reason as unknown}
          place="Cultures"
          notFound
          goBack
        />
      );
  }

  const dataForUpdate = dataResult.value.edges.map((data) => {
    const node = data.node;
    const {
      status,
      fileURL,
      ...rest // assigns remaining
    } = node;

    return {
      status: {
        id: status,
        displayName: getStatusName(status),
      },
      file: {
        file: null,
        url: fileURL,
      },
      ...rest,
    } as ModelForTable;
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
