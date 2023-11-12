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
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import type { CultureForTable } from "@siberiana/schemas";
import { CulturesForm } from "@siberiana/schemas";
import { toast } from "@siberiana/ui";

import DataTable from "~/components/tables/DataTable";
import {
  useDeleteCulture,
  useUpdateCulture,
} from "~/lib/mutations/additionals";
import getShortDescription from "~/lib/utils/getShortDescription";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: CultureForTable[] & TData[];
}

export default function UpdateTable<TData, TValue>({
  columns,
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

  const deleteMutation = useDeleteCulture(session.data?.access_token);
  const updateMutation = useUpdateCulture(session.data?.access_token);

  const table = useReactTable({
    data: data,
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
    mode: "onChange",
    defaultValues: {
      cultures: data,
    },
  });

  const handleGoToCreate = React.useCallback(() => {
    const params = new URLSearchParams(window.location.search);
    params.set("mode", "add");
    startTransitionGoToCreate(() => {
      router.push(`cultures?${params.toString()}`);
    });
  }, [router]);

  async function handleDelete() {
    setLoading(true);

    const selectedRows = table.getFilteredSelectedRowModel().rows;
    const dataToDelete = form
      .getValues()
      .cultures.filter((item) =>
        selectedRows.some((row) => row.getValue("id") === item.id),
      ) as CultureForTable[] & TData[];
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
        description: <p>{getShortDescription(rejected.reason as string)}</p>,
        className: "font-Inter",
      });
      console.log(rejected.reason);
      setLoading(false);
    } else {
      toast({
        title: "Успешно!",
        description: "Культуры удалены",
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

  async function handleUpdate(dataForm: z.infer<typeof CulturesForm>) {
    setLoading(true);

    const noLines = dataForm.cultures.map((culture) => {
      const { displayName, description, ...rest } = culture;

      return {
        displayName: displayName.replace(/\n/g, " "),
        description: description?.replace(/\n/g, " "),
        ...rest,
      };
    });

    const dirtyFields = form.formState.dirtyFields.cultures;

    const dirtyFieldsArray = noLines
      .map((item, index) => {
        if (!!dirtyFields && typeof dirtyFields[index] !== "undefined") {
          return { new: item };
        }
      })
      .filter((item) => item !== undefined) as {
      new: CultureForTable;
    }[];

    const mutationsArray = dirtyFieldsArray.map((item) =>
      updateMutation.mutateAsync({
        id: item.new.id,
        newValue: item.new,
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
        description: rejected.reason as string,
        className: "font-Inter",
      });
      console.log(rejected.reason);
      setLoading(false);
    } else {
      toast({
        title: "Успешно!",
        description: "Культуры изменены",
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
    return <Loader2 className="mx-auto mt-12 h-12 w-12 animate-spin" />;

  return (
    <DataTable
      table={table}
      columnsLength={columns.length}
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
