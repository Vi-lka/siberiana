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

import type { CultureForTable } from "@siberiana/schemas";
import { CulturesForm } from "@siberiana/schemas";
import { toast } from "@siberiana/ui";

import LoadingMutation from "~/components/LoadingMutation";
import DataTable from "~/components/tables/DataTable";
import { useCreateCulture } from "~/lib/mutations/additionals";
import getShortDescription from "~/lib/utils/getShortDescription";
import { getSavedData, usePersistForm } from "~/lib/utils/usePersistForm";

const FORM_DATA_KEY = "culturesCreate";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: CultureForTable[] & TData[];
  hasObjectsToUpdate?: boolean;
}

export default function CreateTable<TData, TValue>({
  columns,
  data,
  hasObjectsToUpdate,
}: DataTableProps<TData, TValue>) {
  const savedResult = getSavedData<CultureForTable, TData>({
    data,
    key: FORM_DATA_KEY,
  });

  const [dataState, setDataState] = React.useState<CultureForTable[] & TData[]>(
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

  const mutation = useCreateCulture(session.data?.access_token);

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
  const form = useForm<z.infer<typeof CulturesForm>>({
    resolver: zodResolver(CulturesForm),
    mode: "all",
    defaultValues: {
      cultures: dataState,
    },
  });
  const control = form.control;
  const { append, remove } = useFieldArray({
    control,
    name: "cultures",
  });

  React.useEffect(() => {
    const triggerValidation = async () => {
      await form.trigger("cultures");
    };
    triggerValidation().catch(console.error);
  }, [form]);

  usePersistForm<CultureForTable[]>({
    value: { data: form.getValues().cultures },
    localStorageKey: FORM_DATA_KEY,
    isLoading: loading || isPendingRouter,
  });

  const defaultAdd = {
    id: "random" + Math.random().toString(),
    displayName: "",
    description: "",
    externalLink: "",
  } as CultureForTable & TData;

  const handleDeleteSaved = () => {
    startTransitionTable(() => {
      setDataState(data);
    });
    startTransitionForm(() => {
      form.reset(
        { cultures: data },
        { keepValues: false, keepDirtyValues: false },
      );
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
      .cultures.filter(
        (item) => !selectedRows.some((row) => row.getValue("id") === item.id),
      ) as CultureForTable[] & TData[];

    const deleteAll = filteredData.length === 0;

    if (deleteAll) {
      startTransitionTable(() => {
        setDataState(deleteAll ? data : filteredData);
      });
      startTransitionForm(() => {
        form.reset(
          { cultures: data },
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
      router.push(`cultures?${params.toString()}`);
    });
  }, [router]);

  async function handleSave(dataForm: z.infer<typeof CulturesForm>) {
    setLoading(true);

    const noLines = dataForm.cultures.map((culture) => {
      const { displayName, description, ...rest } = culture;

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
        description: "Культуры добавлены",
        className:
          "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      });
      console.log("results: ", results);

      const params = new URLSearchParams(window.location.search);
      params.delete("mode");
      startTransitionRouter(() => {
        router.refresh();
        router.push(`cultures?${params.toString()}`);
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