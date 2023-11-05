"use client"

import * as React from "react"
import { Button, Form, Input, Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@siberiana/ui';
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
import { CornerRightUp, Loader2, Search } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ArtifactForTable } from "@siberiana/schemas";
import { ArtifactsForm } from "@siberiana/schemas";
import { useRouter } from "next/navigation";

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
  const [isPendingGoToCreate, startTransitionGoToCreate] = React.useTransition()

  const router = useRouter();

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
    autoResetPageIndex: false,
    state: {
      sorting,
      columnFilters,
    },
  }) 

  const form = useForm<z.infer<typeof ArtifactsForm>>({
    resolver: zodResolver(ArtifactsForm),
    mode: 'onChange',
    defaultValues: {
      artifacts: data
    }
  });

  const handleCreateNew = React.useCallback(
    () => {
      const params = new URLSearchParams(window.location.search);
      params.set("mode", "add");
      startTransitionGoToCreate(() => {
        router.push(`artifacts?${params.toString()}`);
      });
    },
    [router],
  );

  // console.log("dirtyFields: ", form.formState.dirtyFields.artifacts)

  function handleSave(dataForm: z.infer<typeof ArtifactsForm>) {
    const noLines = dataForm.artifacts.map(artifact => {
      const displayName = artifact.displayName?.replace(/\n/g, " ")
      const description = artifact.description?.replace(/\n/g, " ")
      const typology = artifact.typology?.replace(/\n/g, " ")
      const chemicalComposition = artifact.chemicalComposition?.replace(/\n/g, " ")

      return {
        id: artifact.id,
        status: artifact.status,
        displayName, 
        description, 
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

    const dirtyFields = form.formState.dirtyFields.artifacts

    noLines.map((item, index) => {
      if(!!dirtyFields && (typeof dirtyFields[index] !== 'undefined')) {
        console.log("dirty: ", item)
      }
      else {
        console.log("no dirty fields found")
      }
    })
  }

  return (
    <div className='flex flex-col gap-3 font-OpenSans'>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(handleSave)}
          className="mt-1 h-full w-full flex flex-col"
        >
          <div className="flex lg:flex-row flex-col-reverse gap-3 lg:items-center w-full justify-between mb-3">
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

            <div className="flex flex-wrap lg:gap-6 gap-3 items-center lg:justify-end justify-between">
              <Button
                disabled={!form.formState.isValid || isPendingGoToCreate}
                type="button"
                variant="link"
                className="p-0 text-sm uppercase gap-1 font-medium"
                onClick={handleCreateNew}
              >
                {isPendingGoToCreate
                  ? <Loader2 className='animate-spin w-6 h-6 mx-8' />
                  : <> Перейти к добавлению <CornerRightUp className="mb-2"/> </>
                }
              </Button>

              <Button
                disabled={!(form.formState.isDirty && form.formState.isValid)}
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
