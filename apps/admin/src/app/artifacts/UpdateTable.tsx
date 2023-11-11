"use client"

import * as React from "react"
import { toast } from '@siberiana/ui';
import { 
  useReactTable, 
  getCoreRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  getFilteredRowModel
} from '@tanstack/react-table'
import type { ColumnDef, ColumnFiltersState, SortingState} from '@tanstack/react-table';
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ArtifactForTable } from "@siberiana/schemas";
import { ArtifactsForm } from "@siberiana/schemas";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDeleteArtifact, useUpdateArtifact } from "~/lib/mutations/objects";
import getShortDescription from "~/lib/utils/getShortDescription";
import DataTable from "~/components/tables/DataTable";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  moderatorsColumns: ColumnDef<TData, TValue>[],
  data: ArtifactForTable[] & TData[],
  userRoles?: string[],
}

export default function UpdateTable<TData, TValue>({
  columns,
  moderatorsColumns,
  data,
  userRoles,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(false)

  const [isPendingGoToCreate, startTransitionGoToCreate] = React.useTransition()
  const [isPendingRefresh, startTransitionRefresh] = React.useTransition()

  const router = useRouter()
  const session = useSession()

  const deleteMutation = useDeleteArtifact(session.data?.access_token)
  const updateMutation = useUpdateArtifact(session.data?.access_token)

  const isModerator = userRoles?.includes("moderator")

  const allowСolumns: ColumnDef<TData, TValue>[] = isModerator ? moderatorsColumns : columns

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
  }) 

  const form = useForm<z.infer<typeof ArtifactsForm>>({
    resolver: zodResolver(ArtifactsForm),
    mode: 'onChange',
    defaultValues: {
      artifacts: data
    }
  });

  const handleGoToCreate = React.useCallback(
    () => {
      const params = new URLSearchParams(window.location.search);
      params.set("mode", "add");
      startTransitionGoToCreate(() => {
        router.push(`artifacts?${params.toString()}`);
      });
    },
    [router],
  );

  async function handleDelete() {
    setLoading(true)

    const selectedRows = table.getFilteredSelectedRowModel().rows
    const dataToDelete = form.getValues().artifacts.filter(
      item => selectedRows.some(row => row.getValue("id") === item.id)
    ) as ArtifactForTable[] & TData[]
    const idsToDelete = dataToDelete.map(item => item.id)

    const mutationsArray = idsToDelete.map(id => deleteMutation.mutateAsync(id))

    const results = await Promise.allSettled(mutationsArray)

    const rejected = results.find(elem => elem.status === "rejected") as PromiseRejectedResult;

    if (rejected) {
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: getShortDescription((rejected.reason as Error).message),
        className: "font-Inter"
      })
      console.log(rejected.reason)
      setLoading(false)
    } else {
      toast({
        title: "Успешно!",
        description: "Артефакты удалены",
        className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      })
      console.log("results: ", results)
      table.toggleAllPageRowsSelected(false)
      startTransitionRefresh(() => {
        router.refresh()
      })
      setLoading(false)
    }
  }

  async function handleUpdate(dataForm: z.infer<typeof ArtifactsForm>) {
    setLoading(true)

    const noLines = dataForm.artifacts.map(artifact => {
      const {
        displayName,
        description,
        typology,
        chemicalComposition,
        ...rest
      } = artifact

      return {
        displayName: displayName.replace(/\n/g, " "),
        description: description?.replace(/\n/g, " "),
        typology: typology?.replace(/\n/g, " "),
        chemicalComposition: chemicalComposition?.replace(/\n/g, " "),
        ...rest
      }
    })

    const dirtyFields = form.formState.dirtyFields.artifacts

    const dirtyFieldsArray = noLines.map((item, index) => {
      if (!!dirtyFields && (typeof dirtyFields[index] !== 'undefined')) {
        return { new: item, old: data[index] }
      }
    }).filter((item) => item !== undefined) as {
      new: ArtifactForTable, 
      old: ArtifactForTable
    }[]

    const mutationsArray = dirtyFieldsArray.map(
      item => updateMutation.mutateAsync({
        id: item.new.id,
        newValue: item.new,
        oldValue: item.old
      })
    )

    const results = await Promise.allSettled(mutationsArray)

    const rejected = results.find(elem => elem.status === "rejected") as PromiseRejectedResult;

    if (rejected) {
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: getShortDescription((rejected.reason as Error).message),
        className: "font-Inter"
      })
      console.log(rejected.reason)
      setLoading(false)
    } else {
      toast({
        title: "Успешно!",
        description: "Артефакты изменены",
        className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      })
      console.log("results: ", results)
      table.toggleAllPageRowsSelected(false)
      startTransitionRefresh(() => {
        router.refresh()
      })
      setLoading(false)
    }
  }

  if (loading || isPendingRefresh) return  <Loader2 className="animate-spin w-12 h-12 mx-auto mt-12"/>

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
  )
}
