"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
} from "@tanstack/react-table";
import {
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";

import { toast } from "@siberiana/ui";

import LoadingMutation from "~/components/LoadingMutation";
import DataTable from "~/components/tables/DataTable";

import getShortDescription from "~/lib/utils/getShortDescription";
import { getSavedData, usePersistForm } from "~/lib/utils/usePersistForm";
import { getEntityType } from "~/lib/utils/getEntity";
import { useSession } from "next-auth/react";
import { useCreateMutation } from "~/lib/utils/useMutations";
import type { EntityEnum } from "@siberiana/schemas";

interface DataTableProps<TData, TValue> {
  entity: EntityEnum;
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  defaultAdd: TData;
  moderatorsColumns?: ColumnDef<TData, TValue>[];
  hasObjectsToUpdate?: boolean;
}

export default function CreateTable<TData, TValue>({
  entity,
  columns,
  data,
  defaultAdd,
  moderatorsColumns,
  hasObjectsToUpdate,
}: DataTableProps<TData, TValue>) {

  const formDataKey = `${entity}Create`

  const savedResult = getSavedData<TData>({
    data,
    key: formDataKey,
  });

  const [dataState, setDataState] = React.useState<TData[]>(
    savedResult.data,
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  const [isPendingTable, startTransitionTable] = React.useTransition();
  const [isPendingForm, startTransitionForm] = React.useTransition();
  const [isPendingGoToUpdate, startTransitionGoToUpdate] = React.useTransition();
  const [isPendingRouter, startTransitionRouter] = React.useTransition();

  const router = useRouter();
  const session = useSession();

  const createMutation = useCreateMutation(entity, session.data?.access_token);

  const isModerator = session.data?.user.roles?.includes("moderator");

  const allowColumns: ColumnDef<TData, TValue>[] = isModerator
    ? moderatorsColumns 
      ? moderatorsColumns : columns
    : columns;

  const table = useReactTable({
    data: dataState,
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

  const ZodType = getEntityType(entity)
  type ZodTypeInfer = z.infer<typeof ZodType>

  const form = useForm<ZodTypeInfer>({
    resolver: zodResolver(ZodType),
    mode: "all",
    defaultValues: {
      [entity]: dataState,
    },
  });
  const control = form.control;
  const { append, remove } = useFieldArray({
    control,
    name: entity as keyof ZodTypeInfer,
  });

  React.useEffect(() => {
    const triggerValidation = async () => {
      await form.trigger(entity);
    };
    triggerValidation().catch(console.error);
  }, [entity, form]);

  const formData: Array<TData & { id?: string }> = form.getValues()[entity as keyof ZodTypeInfer]

  usePersistForm<TData[]>({
    value: { data: formData },
    localStorageKey: formDataKey,
    isLoading: loading || isPendingRouter || !!createMutation?.isLoadingFiles,
  });

  const handleDeleteSaved = () => {
    startTransitionTable(() => {
      setDataState(data);
    });
    startTransitionForm(() => {
      form.reset(
        { [entity]: data },
        { keepValues: false, keepDirtyValues: false },
      );
    });
    localStorage.removeItem(formDataKey);
  };

  const handleAdd = () => {
    startTransitionTable(() => {
      setDataState((prev) => [...prev, defaultAdd]);
    });
    startTransitionForm(() => {
      append(defaultAdd); // only append, prepend doesn't work correctly with table
    });
    form.reset({}, { keepValues: true, keepDirtyValues: false }); // dosn't need default dirty because all new data is dirty
  };

  const handleDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows;

    const filteredData = formData.filter(
      (item) => !selectedRows.some((row) => row.getValue("id") === item.id),
    )

    const deleteAll = filteredData.length === 0;

    if (deleteAll) {
      startTransitionTable(() => {
        setDataState(deleteAll ? data : filteredData);
      });
      startTransitionForm(() => {
        form.reset(
          { [entity]: data },
          { keepValues: false, keepDirtyValues: false },
        );
      });
    } else {
      startTransitionTable(() => {
        setDataState(filteredData);
      });
      startTransitionForm(() => {
        let i = 0;
        for (const row of selectedRows) {
          remove(row.index - i);
          i++;
        }
        form.reset({}, { keepValues: true, keepDirtyValues: false }); // dosn't need default dirty because all new data is dirty
      });
    }

    table.toggleAllPageRowsSelected(false);
  };

  const handleGoToUpdate = React.useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("mode");
    startTransitionGoToUpdate(() => {
      router.push(`${entity}?${params.toString()}`);
    });
  }, [entity, router]);

  async function handleSave(dataForm: ZodTypeInfer) {
    setLoading(true);

    const mutationsArray = createMutation
        ? (dataForm[entity as keyof ZodTypeInfer] as TData[]).map((item) => createMutation.mutation.mutateAsync(item))
        : []

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
        description: "Объекты добавлены",
        className:
          "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      });
      console.log("results: ", results);

      const params = new URLSearchParams(window.location.search);
      params.delete("mode");
      startTransitionRouter(() => {
        router.refresh();
        router.push(`${entity}?${params.toString()}`);
      });
      setLoading(false);
      localStorage.removeItem(formDataKey);
    }
  }

  if (loading || isPendingRouter)
  return (
    <LoadingMutation
      isLoadingFile={!!createMutation?.isLoadingFiles}
      progress={createMutation?.progressFiles}
      className="mt-12"
    />
  );

  return (
    <DataTable
      table={table}
      columnsLength={allowColumns.length}
      form={form}
      isLoading={isPendingTable || isPendingForm}
      isPendingChangeMode={isPendingGoToUpdate}
      submitTitle="Добавить"
      changeModeTitle="Перейти к редактированию"
      handleSubmit={handleSave}
      handleDelete={handleDelete}
      handleChangeMode={handleGoToUpdate}
      isHasAdd
      handleAdd={handleAdd}
      handleDeleteSaved={handleDeleteSaved}
      isChangeModeAvailable={!!hasObjectsToUpdate}
    />
  );
}
