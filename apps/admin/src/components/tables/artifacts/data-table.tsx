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
import type {ColumnDef, ColumnFiltersState, SortingState} from '@tanstack/react-table';
import { DataTablePagination } from '../DataTablePagination';
import { Search } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ArtifactById} from "@siberiana/schemas";
import { ArtifactsTable } from "@siberiana/schemas";
import Status from "../global-fields/Status";
import getStatusName from "~/lib/utils/getStatusName";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: ArtifactById[] & TData[],
  userRoles?: string[],
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  userRoles,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])

  const isModer = userRoles?.includes("moderator")

  const allowСolumns: ColumnDef<TData, TValue>[] = isModer
    ? [
      ...columns,
      {
        accessorKey: "status",
        header: () => <div className="text-center">Статус</div>,
        cell: ({ row }) => {
          return <Status rowIndex={row.index} />
        },
      },
    ]
    : columns

  const table = useReactTable({
    data,
    columns: allowСolumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  }) 

  const form = useForm<z.infer<typeof ArtifactsTable>>({
    resolver: zodResolver(ArtifactsTable),
    mode: 'onChange',
    defaultValues: {
      artifacts: data.map(artifact => {
        const {
          status,
          ...rest // assigns remaining
        } = artifact;

        const statusForTable = {
          id: status,
          displayName: getStatusName(status)
        }

        return { 
          status: statusForTable,
          ...rest
        }
      })
    }
  });

  function handleSave(dataForm: z.infer<typeof ArtifactsTable>) {

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

    console.log(noLines);
  }

  return (
    <div className='flex flex-col gap-3 font-OpenSans'>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(handleSave)}
          className="mt-1 h-full w-full flex flex-col"
        >
          <div className="flex gap-3 items-center w-full justify-between mb-3">
            <div className="flex items-center gap-1">
              <Search className="w-4 h-4 stroke-muted-foreground" />
              <Input
                placeholder="Поиск..."
                value={(table.getColumn("displayName")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("displayName")?.setFilterValue(event.target.value)
                }
                className="max-w-xs h-8"
              />
            </div>

            <Button
              disabled={!(form.formState.isDirty && form.formState.isValid)}
              type="submit"
              className="p-2 text-sm uppercase"
            >
              Сохранить
            </Button>
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
