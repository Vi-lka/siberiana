import type { EntityEnum, OrganizationsForTable } from '@siberiana/schemas';
import { Loader2 } from 'lucide-react';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { ClientHydration } from '~/components/providers/ClientHydration';
import CreateTable from '~/components/tables/CreateTable';
import UpdateTable from '~/components/tables/UpdateTable';
import { getOrganizations } from '~/lib/queries/organizations';
import getOrganiztionTypeName from '~/lib/utils/getOrganiztionTypeName';
import { columns } from './columns';
import { updateColumns } from './updateColumns';

export default async function TablesOrganizations({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {

  const entity: EntityEnum = "organizations";

  const mode = searchParams["mode"] as string | undefined;
  
  const [dataResult] = await Promise.allSettled([
    getOrganizations({
      first: null,
    }),
  ]);

  const defaultAdd: OrganizationsForTable = {
    id: "random" + Math.random().toString(),
    displayName: "",
    type: {
      id: "museum",
      displayName: getOrganiztionTypeName("museum")
    },
    address: "",
    description: "",
    isInAConsortium: {
      id: "no",
      displayName: "Нет"
    },
    externalLink: "",
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

  const dataForUpdate: OrganizationsForTable[] = dataResult.value.edges.map(
    (data) => {
      const node = data.node;
      const {people, type, isInAConsortium, ...rest} = node

      const typeForTable = {
        id: type,
        displayName: getOrganiztionTypeName(type)
      }

      const isInAConsortiumForTable = {
        id: isInAConsortium ? "yes" : "no", 
        displayName: isInAConsortium ? "Да" : "Нет", 
      }

      const peopleForTable = people.length

      return {
          people: peopleForTable,
          type: typeForTable,
          isInAConsortium: isInAConsortiumForTable,
          ...rest
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


