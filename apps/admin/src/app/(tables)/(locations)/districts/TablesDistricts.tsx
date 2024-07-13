import type { DistrictsForTable, EntityEnum } from '@siberiana/schemas';
import { Loader2 } from 'lucide-react';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { ClientHydration } from '~/components/providers/ClientHydration';
import CreateTable from '~/components/tables/CreateTable';
import UpdateTable from '~/components/tables/UpdateTable';
import { getDistricts } from '~/lib/queries/locations';
import { columns } from './columns';
import { updateColumns } from './updateColumns';

export default async function TablesDistricts({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
})  {
    const entity: EntityEnum = "districts";
  
    const mode = searchParams["mode"] as string | undefined;
  
    const [dataResult] = await Promise.allSettled([
      getDistricts({
        first: null,
      }),
    ]);
  
    const defaultAdd: DistrictsForTable = {
      id: "random" + Math.random().toString(),
      displayName: "",
      description: "",
      externalLink: "",
      region: null,
    };
  
    const dataForCreate = [defaultAdd];
  
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
  
    const dataForUpdate: DistrictsForTable[] = dataResult.value.edges.map(
      (data) => {
        const node = data.node;
        const {
          artifacts,
          books,
          locations,
          settlements,
          ...rest // assigns remaining
        } = node;
  
        const artifactsForTable = artifacts.length;
        const booksForTable = books.length;
        const locationsForTable = locations.length;
        const settlementsForTable = settlements.length;
  
        return {
          artifacts: artifactsForTable,
          books: booksForTable,
          locations: locationsForTable,
          settlements: settlementsForTable,
          ...rest,
        };
      },
    );
  
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

