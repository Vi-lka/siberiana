"use client"

import type { ArtifactForTable} from '@siberiana/schemas';
import { ArtifactsForm } from '@siberiana/schemas'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Form, Input, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, toast } from '@siberiana/ui'
import type { ColumnDef, ColumnFiltersState, SortingState} from '@tanstack/react-table';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table'
import { CornerRightUp, Loader2, MoreHorizontal, Plus, Search } from 'lucide-react'
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import type { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import { DataTablePagination } from '~/components/tables/DataTablePagination'
import getStatusName from '~/lib/utils/getStatusName'
import { useRouter } from 'next/navigation';
import { useCreateArtifact } from '~/lib/mutations/objects';
import { useSession } from 'next-auth/react';
import getShortDescription from '~/lib/utils/getShortDescription';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  moderatorsColumns: ColumnDef<TData, TValue>[],
  data: ArtifactForTable[] & TData[],
  userRoles?: string[],
  hasObjectsToUpdate?: boolean
}

export default function CreateTable<TData, TValue>({
  columns,
  moderatorsColumns,
  data,
  userRoles,
  hasObjectsToUpdate,
}: DataTableProps<TData, TValue>) {
  const [dataState, setDataState] = React.useState<ArtifactForTable[] & TData[]>(data)
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(false)
  
  const [isPendingTable, startTransitionTable] = React.useTransition()
  const [isPendingForm, startTransitionForm] = React.useTransition()
  const [isPendingGoToUpdate, startTransitionGoToUpdate] = React.useTransition()

  const router = useRouter()
  const session = useSession()

  const mutation = useCreateArtifact(session.data?.access_token)

  const isModerator = userRoles?.includes("moderator")

  const allowСolumns: ColumnDef<TData, TValue>[] = isModerator ? moderatorsColumns : columns

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
  })
  const form = useForm<z.infer<typeof ArtifactsForm>>({
    resolver: zodResolver(ArtifactsForm),
    mode: 'onChange',
    defaultValues: {
      artifacts: dataState
    }
  });
  const control = form.control
  const { append, remove } = useFieldArray({
    control,
    name: "artifacts",
  });

  const statusForModerator = {
    id: "listed",
    displayName: getStatusName("listed")
  }
  const statusForAdmin = {
    id: "draft",
    displayName: getStatusName("draft")
  }
  const defaultAdd = {
    id: "random" + Math.random().toString(),
    status: isModerator ? statusForModerator : statusForAdmin,
    displayName: "",
    description: "",
    primaryImageURL: "",
    chemicalComposition: "",
    typology: "",
    weight: "",
    culturalAffiliation: null,
    set: null,
    monument: null,
    location: null,
    mediums: [],
    techniques: [],
    authors: [],
    publications: [],
    projects: [],
    collection: dataState[0].collection,
  } as ArtifactForTable & TData

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

    const filteredData = form.getValues().artifacts.filter(
      item => !selectedRows.some(row => row.getValue("id") === item.id)
    ) as ArtifactForTable[] & TData[]

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
      // form.reset({artifacts: filteredData}, { keepValues: false, keepDirtyValues: false, keepIsValid: true })
    })

    table.toggleAllPageRowsSelected(false)
  }

  const handleGoToUpdate = React.useCallback(
    () => {
      const params = new URLSearchParams(window.location.search);
      params.delete("mode")
      startTransitionGoToUpdate(() => {
        router.push(`artifacts?${params.toString()}`);
      });
    },
    [router],
  );

  // console.log("DATA_STATE: ", dataState)
  // console.log("TABLE: ", table.getRowModel().rows[0].original)
  // console.log("FORM: ", form.getValues().artifacts)

  async function handleSave(dataForm: z.infer<typeof ArtifactsForm>) {
    setLoading(true)

    const noLines = dataForm.artifacts.map(artifact => {
      const displayName = artifact.displayName?.replace(/\n/g, " ")
      const description = artifact.description?.replace(/\n/g, " ")
      const typology = artifact.typology?.replace(/\n/g, " ")
      const chemicalComposition = artifact.chemicalComposition?.replace(/\n/g, " ")

      return {
        id: artifact.id,
        status: artifact.status,
        collection: artifact.collection,
        displayName, 
        description, 
        primaryImageURL: artifact.primaryImageURL,
        typology,
        chemicalComposition,
        culturalAffiliation: artifact.culturalAffiliation,
        set: artifact.set,
        monument: artifact.monument,
        mediums: artifact.mediums,
        techniques: artifact.techniques,
        authors: artifact.authors,
        publications: artifact.publications,
        projects: artifact.projects,
        admissionDate: artifact.admissionDate,
        location: artifact.location,
      }
    })

    const mutationsArray = noLines.map(item => mutation.mutateAsync(item))

    const results = await Promise.allSettled(mutationsArray)

    const rejected = results.find(elem => elem.status === "rejected") as PromiseRejectedResult;

    if (rejected) {
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: <p>{getShortDescription(rejected.reason as string)}</p>,
        className: "font-Inter"
      })
      console.log(rejected.reason)
    } else {
      setLoading(false)
      toast({
        title: "Успешно!",
        description: "Артефакт создан",
        className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      })
      console.log("results: ", results)

      const params = new URLSearchParams(window.location.search);
      params.delete("mode")
      router.refresh()
      router.push(`artifacts?${params.toString()}`)
    }
  }

  if (loading) return  <Loader2 className="animate-spin w-12 h-12 mx-auto mt-12"/>

  return (
    <div className='flex flex-col gap-3 font-OpenSans'>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(handleSave)}
          className="mt-1 h-full w-full flex flex-col"
        >

          <div className="flex lg:flex-row flex-col-reverse gap-3 lg:items-center w-full justify-between mb-3">
            <div className='flex flex-wrap gap-3'>
              <div className="flex items-center gap-1">
                <Search className="w-4 h-4 stroke-muted-foreground" />
                <Input
                  placeholder="Поиск..."
                  value={(table.getColumn("displayName")?.getFilterValue() as string) ?? ""}
                  onChange={(event) =>
                    table.getColumn("displayName")?.setFilterValue(event.target.value)
                  }
                  className="lg:max-w-xs h-8"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    disabled={isPendingTable || isPendingForm}
                    className="flex h-10 w-10 p-0 data-[state=open]:bg-muted"
                  >
                    {isPendingTable || isPendingForm
                      ? <Loader2 className='animate-spin w-6 h-6 mx-8' />
                      : <MoreHorizontal className="h-6 w-6" />
                    }
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[160px] font-Inter">
                  <DropdownMenuLabel>Выбранные</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      disabled={(table.getFilteredSelectedRowModel().rows.length === 0) || isPendingTable || isPendingForm} 
                      className='cursor-pointer destructive group border-destructive bg-destructive text-destructive-foreground'
                      onClick={handleDelete}
                    >Удалить</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap lg:gap-6 gap-3 items-center lg:justify-end justify-between">
              {hasObjectsToUpdate
                ? (
                  <Button
                    disabled={isPendingGoToUpdate}
                    type="button"
                    variant="link"
                    className="p-0 text-sm uppercase gap-1 font-medium"
                    onClick={handleGoToUpdate}
                  >
                    {isPendingGoToUpdate
                      ? <Loader2 className='animate-spin w-6 h-6 mx-8' />
                      : <> Перейти к редактированию <CornerRightUp className="mb-2"/> </>
                    }
                  </Button>
                )
                : null
              }

              <Button
                disabled={isPendingTable || isPendingForm}
                type="button"
                className="p-2 text-sm uppercase gap-1 mr-0 ml-auto"
                onClick={handleAdd}
              >
                {isPendingTable || isPendingForm
                  ? <Loader2 className='animate-spin w-6 h-6 mx-8' />
                  : <> <Plus className="w-5 h-5"/> Объект </>
                }
              </Button>

              <Button
                disabled={!(form.formState.isDirty && form.formState.isValid)}
                type="submit"
                className="px-6 text-sm uppercase mr-0 ml-auto"
              >
                Добавить
              </Button>
            </div>
          </div>
              
          <div className="border rounded-lg shadow-md">
            {isPendingTable || isPendingForm
              ? <Skeleton className="w-full h-[65vh] flex items-center justify-center">
                  <Loader2 className="animate-spin w-12 h-12 mx-auto"/>
                </Skeleton>
              : (
                <Table>
                  <TableHeader className='font-OpenSans'>
                    {table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </TableHead>
                          )
                        })}
                      </TableRow>
                    ))}
                  </TableHeader>
                  <TableBody className='font-Inter text-xs'>
                    {table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={allowСolumns.length} className="h-24 text-center">
                          No results.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )
            }
          </div>
        </form>
      </Form>
      <DataTablePagination table={table} />
    </div>
  )
}