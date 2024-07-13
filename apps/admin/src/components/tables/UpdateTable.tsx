"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { EntityEnum } from "@siberiana/schemas";
import { toast } from "@siberiana/ui";

import LoadingMutation from "~/components/LoadingMutation";
import DataTable from "~/components/tables/DataTable";
import { getEntityType } from "~/lib/utils/getEntity";
import getShortDescription from "~/lib/utils/getShortDescription";
import { useDeleteMutation, useUpdateMutation } from "~/lib/utils/useMutations";

interface DataTableProps<TData, TValue> {
  entity: EntityEnum;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  moderatorsColumns?: ColumnDef<TData, TValue>[];
}

export default function UpdateTable<TData, TValue>({
  entity,
  columns,
  data,
  moderatorsColumns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [isPendingGoToCreate, startTransitionGoToCreate] =
    React.useTransition();
  const [isPendingRefresh, startTransitionRefresh] = React.useTransition();

  const router = useRouter();
  const session = useSession();

  const deleteMutation = useDeleteMutation(entity, session.data?.access_token);
  const updateMutation = useUpdateMutation(entity, session.data?.access_token);

  const isModerator = session.data?.user.roles?.includes("moderator");

  const allowColumns: ColumnDef<TData, TValue>[] = isModerator
    ? moderatorsColumns
      ? moderatorsColumns
      : columns
    : columns;

  const table = useReactTable({
    data,
    columns: allowColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  const ZodType = getEntityType(entity);
  type ZodTypeInfer = z.infer<typeof ZodType>;

  const form = useForm<ZodTypeInfer>({
    resolver: zodResolver(ZodType),
    mode: "onChange",
    defaultValues: {
      [entity]: data,
    },
  });

  const formData: Array<TData & { id: string }> =
    form.getValues()[entity as keyof ZodTypeInfer];

  const handleGoToCreate = React.useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("mode", "add");
    startTransitionGoToCreate(() => {
      router.push(`${entity}?${params.toString()}`);
    });
  }, [entity, router]);

  async function handleDelete() {
    setLoading(true);

    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const dataToDelete = formData.filter((item) =>
      selectedRows.some((row) => row.getValue("id") === item.id),
    );
    const idsToDelete = dataToDelete.map((item) => item.id);

    const mutationsArray = idsToDelete.map((id) =>
      deleteMutation.mutateAsync(id),
    );

    const results = await Promise.allSettled(mutationsArray);

    const rejected = results.find((elem) => elem.status === "rejected") as
      | PromiseRejectedResult
      | undefined;

    if (rejected) {
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: getShortDescription((rejected.reason as Error).message),
        className: "font-Inter",
      });
      console.log(rejected.reason);
      setLoading(false);
    } else {
      toast({
        title: "Успешно!",
        description: "Объекты удалены",
        className:
          "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      });
      console.log("results: ", results);
      table.toggleAllPageRowsSelected(false);
      startTransitionRefresh(() => {
        router.refresh();
      });
      setLoading(false);
    }
  }

  async function handleUpdate(dataForm: ZodTypeInfer) {
    setLoading(true);

    const entityKey = entity as keyof ZodTypeInfer;

    const allData: Array<TData> = dataForm[entityKey];

    const dirtyFields: Array<TData> = form.formState.dirtyFields[entityKey];

    const dirtyFieldsArray = allData
      .map((item, index) => {
        if (!!dirtyFields && typeof dirtyFields[index] !== "undefined") {
          return { new: item, old: data[index] };
        }
      })
      .filter((item) => item !== undefined) as {
      new: TData & { id: string };
      old: TData & { id: string };
    }[];

    const mutationsArray = dirtyFieldsArray.map(
      (item) =>
        updateMutation?.updateMutation.mutateAsync({
          id: item.new.id,
          newValue: item.new,
          oldValue: item.old,
        }),
    );

    const results = await Promise.allSettled(mutationsArray);

    const rejected = results.find((elem) => elem.status === "rejected") as
      | PromiseRejectedResult
      | undefined;

    if (rejected) {
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: getShortDescription((rejected.reason as Error).message),
        className: "font-Inter",
      });
      console.log(rejected.reason);
      setLoading(false);
    } else {
      toast({
        title: "Успешно!",
        description: "Объекты изменены",
        className:
          "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      });
      console.log("results: ", results);
      table.toggleAllPageRowsSelected(false);
      startTransitionRefresh(() => {
        router.refresh();
      });
      setLoading(false);
    }
  }

  if (loading || isPendingRefresh)
    return (
      <LoadingMutation
        isLoadingFile={!!updateMutation?.isLoadingFiles}
        progress={updateMutation?.progressFiles}
        className="mt-12"
      />
    );

  return (
    <DataTable
      table={table}
      columnsLength={allowColumns.length}
      form={form}
      isLoading={loading}
      isPendingChangeMode={isPendingGoToCreate}
      submitTitle="Сохранить"
      changeModeTitle="Перейти к добавлению"
      handleSubmit={handleUpdate}
      handleDelete={handleDelete}
      handleChangeMode={handleGoToCreate}
      isHasAdd={false}
      isChangeModeAvailable
      dialog
      dialogType={entity}
    />
  );
}
