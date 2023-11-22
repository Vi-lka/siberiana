import React from "react";
import type { Table as TableTanstack } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";
import {
  CornerRightUp,
  ListRestart,
  Loader2,
  MoreHorizontal,
  Plus,
  Search,
} from "lucide-react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { FormProvider } from "react-hook-form";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siberiana/ui";

import { DataTablePagination } from "./DataTablePagination";
import type { EntityEnum } from "@siberiana/schemas";
import DialogForm from "../forms/DialogForm";

interface DataTableProps<TData, TFieldValues extends FieldValues> {
  table: TableTanstack<TData>;
  columnsLength: number;
  form: UseFormReturn<TFieldValues, any, undefined>;
  isLoading: boolean;
  isChangeModeAvailable: boolean;
  isPendingChangeMode: boolean;
  submitTitle: string;
  changeModeTitle: string;
  handleSubmit(dataForm: FieldValues): Promise<void>;
  handleChangeMode: () => void;
}

type HasAdd = {
  isHasAdd: true;
  handleAdd: () => void;
  handleDelete: () => void;
  handleDeleteSaved: () => void;
};
type NoHasAdd = {
  isHasAdd: false;
  handleDelete: () => Promise<void>;
};

type DialogForm = {
  dialog: true,
  dialogType: EntityEnum
};
type TableForm = {
  dialog?: false,
};

export default function DataTable<TData, TFieldValues extends FieldValues>(
  props: 
    DataTableProps<TData, TFieldValues> 
    & (HasAdd | NoHasAdd) & (DialogForm | TableForm),
) {
  const [isPendingSearch, startTransitionSearch] = React.useTransition();

  const submitButtonDisabled = props.isHasAdd
    ? !props.form.formState.isValid || props.isLoading
    : !props.form.formState.isValid ||
      !props.form.formState.isDirty ||
      props.isLoading;

  return (
    <div className="font-OpenSans flex flex-col gap-3">
      <FormProvider {...props.form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={props.form.handleSubmit((data) => props.handleSubmit(data))}
          className="mt-1 flex h-full w-full flex-col"
        >
          <div className="mb-3 flex w-full flex-col-reverse justify-between gap-3 lg:flex-row lg:items-center">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5">
                {isPendingSearch ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Search className="stroke-muted-foreground h-5 w-5" />
                )}
                <Input
                  placeholder="Название..."
                  onChange={(event) =>
                    startTransitionSearch(() => {
                      props.table
                        .getColumn("displayName")
                        ?.setFilterValue(event.target.value);
                    })
                  }
                  className="h-8 lg:max-w-xs"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    disabled={props.isLoading}
                    className="data-[state=open]:bg-muted flex h-10 w-10 p-0"
                  >
                    {props.isLoading ? (
                      <Loader2 className="mx-8 h-6 w-6 animate-spin" />
                    ) : (
                      <MoreHorizontal className="h-6 w-6" />
                    )}
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="font-Inter w-[160px]"
                >
                  <DropdownMenuLabel>Выбранные</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      disabled={
                        props.table.getFilteredSelectedRowModel().rows
                          .length === 0 || props.isLoading
                      }
                      className="destructive border-destructive bg-destructive text-destructive-foreground group cursor-pointer"
                      onClick={() => void props.handleDelete()}
                    >
                      Удалить
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {props.isHasAdd ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        disabled={props.isLoading}
                        className="flex h-10 w-10 p-0"
                        onClick={props.handleDeleteSaved}
                      >
                        {props.isLoading ? (
                          <Loader2 className="mx-8 h-6 w-6 animate-spin" />
                        ) : (
                          <ListRestart className="h-6 w-6" />
                        )}
                        <span className="sr-only">Delete saved data</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Очистить историю изменений</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 lg:justify-end lg:gap-6">
              {props.isChangeModeAvailable ? (
                <Button
                  disabled={props.isPendingChangeMode || props.isLoading}
                  type="button"
                  variant="link"
                  className="gap-1 p-0 text-sm font-medium uppercase"
                  onClick={props.handleChangeMode}
                >
                  {props.isPendingChangeMode ? (
                    <Loader2 className="mx-8 h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      {" "}
                      {
                        props.changeModeTitle
                      } <CornerRightUp className="mb-2" />{" "}
                    </>
                  )}
                </Button>
              ) : null}

              {props.isHasAdd ? (
                <Button
                  disabled={props.isLoading}
                  type="button"
                  className="ml-auto mr-0 gap-1 p-2 text-sm uppercase"
                  onClick={props.handleAdd}
                >
                  {props.isLoading ? (
                    <Loader2 className="mx-8 h-6 w-6 animate-spin" />
                  ) : (
                    <>
                      {" "}
                      <Plus className="h-5 w-5" /> Объект{" "}
                    </>
                  )}
                </Button>
              ) : null}

              <Button
                disabled={submitButtonDisabled}
                type="submit"
                className="ml-auto mr-0 px-6 text-sm uppercase"
              >
                {props.submitTitle}
              </Button>
            </div>
          </div>

          <div className="rounded-lg border shadow-md">
            {props.isLoading ? (
              <Skeleton className="flex h-[65vh] w-full items-center justify-center">
                <Loader2 className="mx-auto h-12 w-12 animate-spin" />
              </Skeleton>
            ) : (
              <Table>
                <TableHeader className="font-OpenSans">
                  {props.table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id} className="py-2">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext(),
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody className="font-Inter text-xs">
                  {props.table.getRowModel().rows?.length ? (
                    props.table.getRowModel().rows.map((row) => (
                      props.dialog 
                        ? <DialogForm key={row.id} table={props.table} row={row} dialogType={props.dialogType} />
                        : (
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                          >
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id} className="px-2 py-1">
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        )
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={props.columnsLength}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </div>
        </form>
      </FormProvider>
      <DataTablePagination table={props.table} columnsLength={props.columnsLength} />
    </div>
  );
}
