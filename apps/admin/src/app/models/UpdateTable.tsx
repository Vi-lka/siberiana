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

import type { ModelForTable } from "@siberiana/schemas";
import { ModelsForm } from "@siberiana/schemas";
import { toast } from "@siberiana/ui";

import LoadingMutation from "~/components/LoadingMutation";
import DataTable from "~/components/tables/DataTable";
import { useDeleteModel, useUpdateModel } from "~/lib/mutations/additionals";
import getShortDescription from "~/lib/utils/getShortDescription";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  moderatorsColumns: ColumnDef<TData, TValue>[];
  data: ModelForTable[] & TData[];
}

export default function UpdateTable<TData, TValue>({
  columns,
  moderatorsColumns,
  data,
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

  const deleteMutation = useDeleteModel(session.data?.access_token);
  const { updateMutation, progressFiles, isLoadingFiles } = useUpdateModel(
    session.data?.access_token,
  );

  const isModerator = session.data?.user.roles?.includes("moderator");

  const allowСolumns: ColumnDef<TData, TValue>[] = isModerator
    ? moderatorsColumns
    : columns;

  const table = useReactTable({
    data: data,
    columns: allowСolumns,
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

  const form = useForm<z.infer<typeof ModelsForm>>({
    resolver: zodResolver(ModelsForm),
    mode: "onChange",
    defaultValues: {
      models: data,
    },
  });

  const handleGoToCreate = React.useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("mode", "add");
    startTransitionGoToCreate(() => {
      router.push(`models?${params.toString()}`);
    });
  }, [router]);

  async function handleDelete() {
    setLoading(true);

    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const dataToDelete = form
      .getValues()
      .models.filter((item) =>
        selectedRows.some((row) => row.getValue("id") === item.id),
      ) as ModelForTable[] & TData[];
    const idsToDelete = dataToDelete.map((item) => item.id);

    const mutationsArray = idsToDelete.map((id) =>
      deleteMutation.mutateAsync(id),
    );

    const results = await Promise.allSettled(mutationsArray);

    const rejected = results.find(
      (elem) => elem.status === "rejected",
    ) as PromiseRejectedResult;

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
        description: "Модели удалены",
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

  async function handleUpdate(dataForm: z.infer<typeof ModelsForm>) {
    setLoading(true);

    const noLines = dataForm.models.map((model) => {
      const { displayName, description, ...rest } = model;

      return {
        displayName: displayName.replace(/\n/g, " "),
        description: description?.replace(/\n/g, " "),
        ...rest,
      };
    });

    const dirtyFields = form.formState.dirtyFields.models;

    const dirtyFieldsArray = noLines
      .map((item, index) => {
        if (!!dirtyFields && typeof dirtyFields[index] !== "undefined") {
          return { new: item, old: data[index] };
        }
      })
      .filter((item) => item !== undefined) as {
      new: ModelForTable;
      old: ModelForTable;
    }[];

    const mutationsArray = dirtyFieldsArray.map((item) =>
      updateMutation.mutateAsync({
        id: item.new.id,
        newValue: item.new,
        oldValue: item.old,
      }),
    );

    const results = await Promise.allSettled(mutationsArray);

    const rejected = results.find(
      (elem) => elem.status === "rejected",
    ) as PromiseRejectedResult;

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
        description: "Модели изменены",
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
        isLoading={isLoadingFiles}
        progress={progressFiles}
        className="mt-12"
      />
    );

  return (
    <DataTable
      table={table}
      columnsLength={allowСolumns.length}
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
    />
  );
}
