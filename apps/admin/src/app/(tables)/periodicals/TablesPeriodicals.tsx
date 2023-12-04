import React from "react";
import { Loader2 } from "lucide-react";
import type { EntityEnum, PeriodicalForTable } from "@siberiana/schemas";
import ErrorHandler from "~/components/errors/ErrorHandler";
import { ClientHydration } from "~/components/providers/ClientHydration";
import { columns } from "./columns";
import { updateColumns } from "./updateColumns";
import { getPeriodicals } from "~/lib/queries/books";
import CreateTable from "~/components/tables/CreateTable";
import UpdateTable from "~/components/tables/UpdateTable";

export default async function TablesPeriodicals({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const entity: EntityEnum = "periodicals"

  const mode = searchParams["mode"] as string | undefined;

  const [ dataResult ] = await Promise.allSettled([
    getPeriodicals({
      first: null,
    }),
  ]);

  const defaultAdd: PeriodicalForTable = {
    id: "random" + Math.random().toString(),
    displayName: "",
    description: "",
    externalLink: "",
  }

  const dataForCreate = [ defaultAdd ]

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
              entity={entity}
              columns={columns} 
              data={dataForCreate} 
              defaultAdd={defaultAdd}
            />
          </ClientHydration>
        </div>
      );
    } else
      return (
        <ErrorHandler
          error={dataResult.reason as unknown}
          place={entity}
          notFound
          goBack
        />
      );
  }

  const dataForUpdate: PeriodicalForTable[] = dataResult.value.edges.map((data) => {
    const node = data.node;
    const {
        books,
      ...rest // assigns remaining
    } = node;

    const booksForTable = books.length;

    return {
      books: booksForTable,
      ...rest,
    };
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
            entity={entity}
            columns={columns}
            data={dataForCreate}
            defaultAdd={defaultAdd}
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
          entity={entity}
          columns={updateColumns} 
          data={dataForUpdate} 
        />
      </ClientHydration>
    </div>
  );
}
