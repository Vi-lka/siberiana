"use client"

import type { MaterialForTable } from '@siberiana/schemas';
import { MaterialsForm } from '@siberiana/schemas';
import { toast } from '@siberiana/ui'
import type { ColumnDef, ColumnFiltersState, SortingState} from '@tanstack/react-table';
import { getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import getShortDescription from '~/lib/utils/getShortDescription';
import { useCreateMaterial } from '~/lib/mutations/additionals';
import DataTable from '~/components/tables/DataTable';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  data: MaterialForTable[] & TData[],
  hasObjectsToUpdate?: boolean
}

export default function CreateTable<TData, TValue>({
  columns,
  data,
  hasObjectsToUpdate,
}: DataTableProps<TData, TValue>) {
  const [dataState, setDataState] = React.useState<MaterialForTable[] & TData[]>(data)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  
  const [isPendingTable, startTransitionTable] = React.useTransition()
  const [isPendingForm, startTransitionForm] = React.useTransition()
  const [isPendingGoToUpdate, startTransitionGoToUpdate] = React.useTransition()
  const [isPendingRouter, startTransitionRouter] = React.useTransition()

  const router = useRouter()
  const session = useSession()

  const mutation = useCreateMaterial(session.data?.access_token)

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
  })
  const form = useForm<z.infer<typeof MaterialsForm>>({
    resolver: zodResolver(MaterialsForm),
    mode: 'onChange',
    defaultValues: {
      materials: dataState
    }
  });
  const control = form.control
  const { append, remove } = useFieldArray({
    control,
    name: "materials",
  });

  const defaultAdd = {
    id: "random" + Math.random().toString(),
    displayName: "",
    description: "",
    externalLink: ""
  } as MaterialForTable & TData

  const handleAdd = () => {
    startTransitionTable(() => {
      setDataState((prev) => [
        ...prev,
        defaultAdd,
      ])
    })
    startTransitionForm(() => {
      append(defaultAdd) // only append, prepend doesn't work correctly with table
    })
    form.reset({}, { keepValues: true, keepDirtyValues: false }) // dosn't need default dirty because all new data is dirty
  }

  const handleDelete = () => {
    const selectedRows = table.getFilteredSelectedRowModel().rows

    const filteredData = form.getValues().materials.filter(
      item => !selectedRows.some(row => row.getValue("id") === item.id)
    ) as MaterialForTable[] & TData[]

    if (filteredData.length === 0) {
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: <p>А есть смысл оставлять таблицу пустой?</p>,
        className: "font-Inter"
      })
      return
    }

    startTransitionTable(() => {
      setDataState(filteredData)
    })
    startTransitionForm(() => {
      let i = 0
      for (const row of selectedRows) {
        remove(row.index - i)
        i++
      }
    })
    form.reset({}, { keepValues: true, keepDirtyValues: false }) // dosn't need default dirty because all new data is dirty

    table.toggleAllPageRowsSelected(false)
  }

  const handleGoToUpdate = React.useCallback(
    () => {
      const params = new URLSearchParams(window.location.search);
      params.delete("mode")
      startTransitionGoToUpdate(() => {
        router.push(`materials?${params.toString()}`);
      });
    },
    [router],
  );

  async function handleSave(dataForm: z.infer<typeof MaterialsForm>) {
    setLoading(true)

    const noLines = dataForm.materials.map(material => {
      const {
        displayName,
        description,
        ...rest
      } = material

      return {
        displayName: displayName.replace(/\n/g, " "), 
        description: description?.replace(/\n/g, " "), 
        ...rest,
      }
    })

    const mutationsArray = noLines.map(item => mutation.mutateAsync(item))

    const results = await Promise.allSettled(mutationsArray)

    const rejected = results.find(elem => elem.status === "rejected") as PromiseRejectedResult;

    if (rejected) {
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: <p>{getShortDescription(rejected.reason as string)}</p>,
        className: "font-Inter"
      })
      console.log(rejected.reason)
      setLoading(false)
    } else {
      toast({
        title: "Успешно!",
        description: "Материалы добавлены",
        className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      })
      console.log("results: ", results)

      const params = new URLSearchParams(window.location.search);
      params.delete("mode")
      startTransitionRouter(() => {
        router.refresh()
        router.push(`materials?${params.toString()}`)
      })
      setLoading(false)
    }
  }

  if (loading || isPendingRouter) return  <Loader2 className="animate-spin w-12 h-12 mx-auto mt-12"/>

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
      isChangeModeAvailable={!!hasObjectsToUpdate}
    />
  )
}