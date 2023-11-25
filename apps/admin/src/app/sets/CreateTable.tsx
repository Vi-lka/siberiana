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
import { useSession } from "next-auth/react";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";

import type { SetForTable } from "@siberiana/schemas";
import { SetsForm } from "@siberiana/schemas";
import { toast } from "@siberiana/ui";

import LoadingMutation from "~/components/LoadingMutation";
import DataTable from "~/components/tables/DataTable";
import { useCreateSet } from "~/lib/mutations/additionals";
import getShortDescription from "~/lib/utils/getShortDescription";
import { getSavedData, usePersistForm } from "~/lib/utils/usePersistForm";

const FORM_DATA_KEY = "setsCreate";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: SetForTable[] & TData[];
  hasObjectsToUpdate?: boolean;
}

export default function CreateTable<TData, TValue>({
  columns,
  data,
  hasObjectsToUpdate,
}: DataTableProps<TData, TValue>) {
  const savedResult = getSavedData<SetForTable, TData>({
    data,
    key: FORM_DATA_KEY,
  });

  const [dataState, setDataState] = React.useState<SetForTable[] & TData[]>(
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
  const [isPendingGoToUpdate, startTransitionGoToUpdate] =
    React.useTransition();
  const [isPendingRouter, startTransitionRouter] = React.useTransition();

  const router = useRouter();
  const session = useSession();

  const mutation = useCreateSet(session.data?.access_token);

  const table = useReactTable({
    data: dataState,
    columns,
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
  const form = useForm<z.infer<typeof SetsForm>>({
    resolver: zodResolver(SetsForm),
    mode: "all",
    defaultValues: {
      sets: dataState,
    },
  });
  const control = form.control;
  const { append, remove } = useFieldArray({
    control,
    name: "sets",
  });

  React.useEffect(() => {
    const triggerValidation = async () => {
      await form.trigger("sets");
    };
    triggerValidation().catch(console.error);
  }, [form]);

  usePersistForm<SetForTable[]>({
    value: { data: form.getValues().sets },
    localStorageKey: FORM_DATA_KEY,
    isLoading: loading || isPendingRouter,
  });

  const defaultAdd = {
    id: "random" + Math.random().toString(),
    displayName: "",
    description: "",
    externalLink: "",
    monuments: [],
  } as SetForTable & TData;

  const handleDeleteSaved = () => {
    startTransitionTable(() => {
      setDataState(data);
    });
    startTransitionForm(() => {
      form.reset({ sets: data }, { keepValues: false, keepDirtyValues: false });
    });
    localStorage.removeItem(FORM_DATA_KEY);
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

    const filteredData = form
      .getValues()
      .sets.filter(
        (item) => !selectedRows.some((row) => row.getValue("id") === item.id),
      ) as SetForTable[] & TData[];

    const deleteAll = filteredData.length === 0;

    if (deleteAll) {
      startTransitionTable(() => {
        setDataState(deleteAll ? data : filteredData);
      });
      startTransitionForm(() => {
        form.reset(
          { sets: data },
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
      router.push(`sets?${params.toString()}`);
    });
  }, [router]);

  async function handleSave(dataForm: z.infer<typeof SetsForm>) {
    setLoading(true);

    const noLines = dataForm.sets.map((set) => {
      const { displayName, description, ...rest } = set;

      return {
        displayName: displayName.replace(/\n/g, " "),
        description: description?.replace(/\n/g, " "),
        ...rest,
      };
    });

    const mutationsArray = noLines.map((item) => mutation.mutateAsync(item));

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
        description: "Комплексы добавлены",
        className:
          "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      });
      console.log("results: ", results);

      const params = new URLSearchParams(window.location.search);
      params.delete("mode");
      startTransitionRouter(() => {
        router.refresh();
        router.push(`sets?${params.toString()}`);
      });
      setLoading(false);
      localStorage.removeItem(FORM_DATA_KEY);
    }
  }

  if (loading || isPendingRouter)
    return <LoadingMutation isLoading={false} className="mt-12" />;

  return (
    <DataTable
      table={table}
      columnsLength={columns.length}
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
