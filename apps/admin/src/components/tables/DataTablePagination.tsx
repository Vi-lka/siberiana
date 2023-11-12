"use client";

import { useTransition } from "react";
import type { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";

import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@siberiana/ui";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const [isPending, startTransition] = useTransition();
  return (
    <div className="flex flex-col items-center justify-between gap-0.5 px-2 md:flex-row md:gap-0">
      <div className="text-muted-foreground flex-1 self-start text-xs md:text-sm">
        {table.getFilteredSelectedRowModel().rows.length} из{" "}
        {table.getFilteredRowModel().rows.length} строк выбрано.
      </div>
      <div className="flex flex-col items-center space-x-6 space-y-3 md:flex-row lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-xs font-medium md:text-sm">На страницу</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              startTransition(() => {
                table.setPageSize(Number(value));
              });
            }}
          >
            <SelectTrigger disabled={isPending} className="h-8 w-[70px]">
              {isPending ? (
                <Loader2 className="mx-auto h-6 w-6 animate-spin" />
              ) : (
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              )}
            </SelectTrigger>
            <SelectContent side="top">
              {isPending ? (
                <Loader2 className="mx-auto h-4 w-4 animate-spin" />
              ) : (
                [10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem
                    key={pageSize}
                    value={`${pageSize}`}
                    className=" font-Inter cursor-pointer"
                  >
                    {pageSize}
                  </SelectItem>
                ))
              )}
            </SelectContent>
          </Select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-xs font-medium md:text-sm">
          Стр {table.getState().pagination.pageIndex + 1} из{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              startTransition(() => {
                table.setPageIndex(0);
              })
            }
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            {isPending ? (
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              <ChevronsLeft className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              startTransition(() => {
                table.previousPage();
              })
            }
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            {isPending ? (
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              <ChevronLeftIcon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() =>
              startTransition(() => {
                table.nextPage();
              })
            }
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            {isPending ? (
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              <ChevronRightIcon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() =>
              startTransition(() => {
                table.setPageIndex(table.getPageCount() - 1);
              })
            }
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            {isPending ? (
              <Loader2 className="mx-auto h-4 w-4 animate-spin" />
            ) : (
              <ChevronsRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
