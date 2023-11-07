"use client"

import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@siberiana/ui"
import type { Table } from "@tanstack/react-table"
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight, Loader2 } from "lucide-react"
import { useTransition } from "react"

interface DataTablePaginationProps<TData> {
    table: Table<TData>
}
   
export function DataTablePagination<TData>({
    table,
}: DataTablePaginationProps<TData>) {
    const [isPending, startTransition] = useTransition()
    return (
      <div className="flex md:flex-row flex-col md:gap-0 gap-2 items-center justify-between px-2">
        <div className="flex-1 md:text-sm text-xs text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} из{" "}
          {table.getFilteredRowModel().rows.length} строк выбрано.
        </div>
        <div className="flex items-center md:flex-row flex-col space-x-6 lg:space-x-8 space-y-3">
          <div className="flex items-center space-x-2">
            <p className="md:text-sm text-xs font-medium">На страницу</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                startTransition(() => {
                  table.setPageSize(Number(value))
                });
              }}
            >
              <SelectTrigger disabled={isPending} className="h-8 w-[70px]">
                {isPending
                  ? <Loader2 className='animate-spin w-6 h-6 mx-auto' />
                  : <SelectValue placeholder={table.getState().pagination.pageSize} />
                }
              </SelectTrigger>
              <SelectContent side="top">
                {isPending
                  ? <Loader2 className='animate-spin w-4 h-4 mx-auto' />
                  : [10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`} className=" font-Inter cursor-pointer">
                      {pageSize}
                    </SelectItem>
                  ))
                }
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center md:text-sm text-xs font-medium">
            Стр {table.getState().pagination.pageIndex + 1} из{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => 
                startTransition(() => {
                  table.setPageIndex(0)
                })
              }
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              {isPending
                ? <Loader2 className='animate-spin w-4 h-4 mx-auto' />
                : <ChevronsLeft className="h-4 w-4" />
              }
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => 
                startTransition(() => {
                  table.previousPage()
                })
              }
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              {isPending
                ? <Loader2 className='animate-spin w-4 h-4 mx-auto' />
                : <ChevronLeftIcon className="h-4 w-4" />
              }
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => 
                startTransition(() => {
                  table.nextPage()
                })
              }
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              {isPending
                ? <Loader2 className='animate-spin w-4 h-4 mx-auto' />
                : <ChevronRightIcon className="h-4 w-4" />
              }
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => 
                startTransition(() => {
                  table.setPageIndex(table.getPageCount() - 1)
                })
              }
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              {isPending
                ? <Loader2 className='animate-spin w-4 h-4 mx-auto' />
                : <ChevronsRight className="h-4 w-4" />
              }
            </Button>
          </div>
        </div>
      </div>
    )
  }