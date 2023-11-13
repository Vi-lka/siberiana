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
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useFieldArray, useForm } from "react-hook-form";
import type { z } from "zod";

import type { ModelForTable } from "@siberiana/schemas";
import { ModelsForm } from "@siberiana/schemas";
import { toast } from "@siberiana/ui";

import DataTable from "~/components/tables/DataTable";
import { useCreateModel } from "~/lib/mutations/additionals";
import getShortDescription from "~/lib/utils/getShortDescription";
import { getSavedData, usePersistForm } from "~/lib/utils/usePersistForm";
import getStatusName from "~/lib/utils/getStatusName";

const FORM_DATA_KEY = "modelsCreate";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  moderatorsColumns: ColumnDef<TData, TValue>[];
  data: ModelForTable[] & TData[];
  hasObjectsToUpdate?: boolean;
}

export default function CreateTable<TData, TValue>({
  columns,
  moderatorsColumns,
  data,
  hasObjectsToUpdate,
}: DataTableProps<TData, TValue>) {
  const savedResult = getSavedData<ModelForTable, TData>({
    data,
    key: FORM_DATA_KEY,
  });

  const [dataState, setDataState] = React.useState<ModelForTable[] & TData[]>(
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

  const mutation = useCreateModel(session.data?.access_token);

  const isModerator = session.data?.user.roles?.includes("moderator");

  const allowСolumns: ColumnDef<TData, TValue>[] = isModerator
    ? moderatorsColumns
    : columns;

  const table = useReactTable({
    data: dataState,
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
    mode: "all",
    defaultValues: {
      models: dataState,
    },
  });
  const control = form.control;
  const { append, remove } = useFieldArray({
    control,
    name: "models",
  });

  React.useEffect(() => {
    const triggerValidation = async () => {
      await form.trigger("models");
    };
    triggerValidation().catch(console.error);
  }, [form]);

  usePersistForm<ModelForTable[]>({
    value: { data: form.getValues().models },
    localStorageKey: FORM_DATA_KEY,
    isLoading: loading || isPendingRouter,
  });

  const statusForModerator = {
    id: "listed",
    displayName: getStatusName("listed"),
  };
  const statusForAdmin = {
    id: "draft",
    displayName: getStatusName("draft"),
  };
  const defaultAdd = {
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
    petroglyphs: []
  } as ModelForTable & TData;

  const handleDeleteSaved = () => {
    startTransitionTable(() => {
      setDataState(data);
    });
    startTransitionForm(() => {
      form.reset(
        { models: data },
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
      .models.filter(
        (item) => !selectedRows.some((row) => row.getValue("id") === item.id),
      ) as ModelForTable[] & TData[];

    if (filteredData.length === 0) {
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: <p>А есть смысл оставлять таблицу пустой?</p>,
        className: "font-Inter",
      });
      return;
    }

    startTransitionTable(() => {
      setDataState(filteredData);
    });
    startTransitionForm(() => {
      let i = 0;
      for (const row of selectedRows) {
        remove(row.index - i);
        i++;
      }
    });
    form.reset({}, { keepValues: true, keepDirtyValues: false }); // dosn't need default dirty because all new data is dirty

    table.toggleAllPageRowsSelected(false);
  };

  const handleGoToUpdate = React.useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.delete("mode");
    startTransitionGoToUpdate(() => {
      router.push(`models?${params.toString()}`);
    });
  }, [router]);

  async function handleSave(dataForm: z.infer<typeof ModelsForm>) {
    setLoading(true);

    const noLines = dataForm.models.map((model) => {
      const { displayName, description, ...rest } = model;

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
        description: "Модели добавлены",
        className:
          "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      });
      console.log("results: ", results);

      const params = new URLSearchParams(window.location.search);
      params.delete("mode");
      startTransitionRouter(() => {
        router.refresh();
        router.push(`models?${params.toString()}`);
      });
      setLoading(false);
      localStorage.removeItem(FORM_DATA_KEY);
    }
  }

  if (loading || isPendingRouter)
    return <Loader2 className="mx-auto mt-12 h-12 w-12 animate-spin" />;

  return (
    <DataTable
      table={table}
      columnsLength={allowСolumns.length}
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