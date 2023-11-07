"use client"

import * as React from "react"
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Form, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, toast } from '@siberiana/ui';
import { 
  useReactTable, 
  getCoreRowModel, 
  flexRender, 
  getPaginationRowModel, 
  getSortedRowModel, 
  getFilteredRowModel
} from '@tanstack/react-table'
import type { ColumnDef, ColumnFiltersState, SortingState} from '@tanstack/react-table';
import { DataTablePagination } from '../../components/tables/DataTablePagination';
import { CornerRightUp, Loader2, MoreHorizontal, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ArtifactForTable } from "@siberiana/schemas";
import { ArtifactsForm } from "@siberiana/schemas";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useDeleteArtifact, useUpdateArtifact } from "~/lib/mutations/objects";
import getShortDescription from "~/lib/utils/getShortDescription";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[],
  moderatorsColumns: ColumnDef<TData, TValue>[],
  data: ArtifactForTable[] & TData[],
  userRoles?: string[],
}

export default function DataTable<TData, TValue>({
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
        description: "Артефакты удалены",
        className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      })
      console.log("results: ", results)
      table.toggleAllPageRowsSelected(false)
      router.refresh()
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
      
      const displayNameReplace = displayName?.replace(/\n/g, " ")
      const descriptionReplace = description?.replace(/\n/g, " ")
      const typologyReplace = typology?.replace(/\n/g, " ")
      const chemicalCompositionReplace = chemicalComposition?.replace(/\n/g, " ")

      return {
        displayName: displayNameReplace,
        description: descriptionReplace,
        typology: typologyReplace,
        chemicalComposition: chemicalCompositionReplace,
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
      setLoading(false)
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: rejected.reason as string,
        className: "font-Inter"
      })
      console.log(rejected.reason)
    } else {
      setLoading(false)
      toast({
        title: "Успешно!",
        description: "Артефакты изменены",
        className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      })
      console.log("results: ", results)
      table.toggleAllPageRowsSelected(false)
      router.refresh()
    }
  }

  if (loading) return  <Loader2 className="animate-spin w-12 h-12 mx-auto mt-12"/>

  return (
    <div className='flex flex-col gap-3 font-OpenSans'>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(handleUpdate)}
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
                    disabled={loading}
                    className="flex h-10 w-10 p-0 data-[state=open]:bg-muted"
                  >
                    {loading
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
                      disabled={(table.getFilteredSelectedRowModel().rows.length === 0) || loading} 
                      className='cursor-pointer destructive group border-destructive bg-destructive text-destructive-foreground'
                      onClick={() => void handleDelete()}
                    >Удалить</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex flex-wrap lg:gap-6 gap-3 items-center lg:justify-end justify-between">
              <Button
                disabled={!form.formState.isValid || isPendingGoToCreate || loading}
                type="button"
                variant="link"
                className="p-0 text-sm uppercase gap-1 font-medium"
                onClick={handleGoToCreate}
              >
                {isPendingGoToCreate
                  ? <Loader2 className='animate-spin w-6 h-6 mx-8' />
                  : <> Перейти к добавлению <CornerRightUp className="mb-2"/> </>
                }
              </Button>

              <Button
                disabled={!(form.formState.isDirty && form.formState.isValid) || loading}
                type="submit"
                className="px-6 text-sm uppercase mr-0 ml-auto"
              >
                Сохранить
              </Button>
            </div>
          </div>

          <div className="border rounded-lg shadow-md">
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
          </div>
        </form>
      </Form>
      <DataTablePagination table={table} />
    </div>
  )
}
