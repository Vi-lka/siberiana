import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Input, Skeleton, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@siberiana/ui'
import type { Table as TableTanstack } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table'
import { CornerRightUp, ListRestart, Loader2, MoreHorizontal, Plus, Search } from 'lucide-react'
import React from 'react'
import type { UseFormReturn } from 'react-hook-form';
import type { FieldValues } from 'react-hook-form';
import { FormProvider } from 'react-hook-form'
import { DataTablePagination } from './DataTablePagination'

interface DataTableProps<TData, TFieldValues extends FieldValues> {
  table: TableTanstack<TData>,
  columnsLength: number,
  form: UseFormReturn<TFieldValues, any, undefined>,
  isLoading: boolean,
  isChangeModeAvailable: boolean,
  isPendingChangeMode: boolean,
  submitTitle: string,
  changeModeTitle: string,
  handleSubmit(dataForm: FieldValues): Promise<void>,
  handleChangeMode: () => void,
}
 
type HasAdd = {
  isHasAdd: true,
  handleAdd: () => void
  handleDelete: () => void,
  handleDeleteSaved: () => void,
}
type NoHasAdd = {
  isHasAdd: false,
  handleDelete: () => Promise<void>,
}

export default function DataTable<TData, TFieldValues extends FieldValues>
(props:
  DataTableProps<TData, TFieldValues> 
  & (HasAdd | NoHasAdd)
) {

  const [isPendingSearch, startTransitionSearch] = React.useTransition()

  const submitButtonDisabled = props.isHasAdd 
    ? (!props.form.formState.isValid || props.isLoading)
    : (!props.form.formState.isValid || !props.form.formState.isDirty || props.isLoading)

  return (
    <div className='flex flex-col gap-3 font-OpenSans'>
     <FormProvider {...props.form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={props.form.handleSubmit((data) => props.handleSubmit(data))}
          className="mt-1 h-full w-full flex flex-col"
        >
          <div className="flex lg:flex-row flex-col-reverse gap-3 lg:items-center w-full justify-between mb-3">
            <div className='flex flex-wrap gap-3'>
              <div className="flex items-center gap-1.5">
                {isPendingSearch
                  ? <Loader2 className='animate-spin w-5 h-5' />
                  : <Search className="w-5 h-5 stroke-muted-foreground" />
                }
                <Input
                  placeholder="Поиск..."
                  onChange={(event) =>
                    startTransitionSearch(() => {
                      props.table.getColumn("displayName")?.setFilterValue(event.target.value)
                    })
                  }
                  className="lg:max-w-xs h-8"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    disabled={props.isLoading}
                    className="flex h-10 w-10 p-0 data-[state=open]:bg-muted"
                  >
                    {props.isLoading
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
                      disabled={(props.table.getFilteredSelectedRowModel().rows.length === 0) || props.isLoading} 
                      className='cursor-pointer destructive group border-destructive bg-destructive text-destructive-foreground'
                      onClick={() => void props.handleDelete()}
                    >Удалить</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>

              {props.isHasAdd
                ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          disabled={props.isLoading}
                          className="flex h-10 w-10 p-0 data-[state=open]:bg-muted"
                          onClick={props.handleDeleteSaved}
                        >
                          {props.isLoading
                            ? <Loader2 className='animate-spin w-6 h-6 mx-8' />
                            : <ListRestart className="h-6 w-6" />
                          }
                          <span className="sr-only">Delete saved data</span>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Очистить историю изменений</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )
                : null
              }
            </div>

            <div className="flex flex-wrap lg:gap-6 gap-3 items-center lg:justify-end justify-between">
              {props.isChangeModeAvailable
                ? (
                  <Button
                    disabled={props.isPendingChangeMode || props.isLoading}
                    type="button"
                    variant="link"
                    className="p-0 text-sm uppercase gap-1 font-medium"
                    onClick={props.handleChangeMode}
                  >
                    {props.isPendingChangeMode
                      ? <Loader2 className='animate-spin w-6 h-6 mx-8' />
                      : <> {props.changeModeTitle} <CornerRightUp className="mb-2"/> </>
                    }
                  </Button>
                )
                : null
              }

              {props.isHasAdd
                ? (
                  <Button
                    disabled={props.isLoading}
                    type="button"
                    className="p-2 text-sm uppercase gap-1 mr-0 ml-auto"
                    onClick={props.handleAdd}
                  >
                    {props.isLoading
                      ? <Loader2 className='animate-spin w-6 h-6 mx-8' />
                      : <> <Plus className="w-5 h-5"/> Объект </>
                    }
                  </Button>
                )
                : null
              }

              <Button
                disabled={submitButtonDisabled}
                type="submit"
                className="px-6 text-sm uppercase mr-0 ml-auto"
              >
                {props.submitTitle}
              </Button>
            </div>
          </div>

          <div className="border rounded-lg shadow-md">
            {props.isLoading
              ? <Skeleton className="w-full h-[65vh] flex items-center justify-center">
                  <Loader2 className="animate-spin w-12 h-12 mx-auto"/>
                </Skeleton>
              : (
                <Table>
                  <TableHeader className='font-OpenSans'>
                    {props.table.getHeaderGroups().map((headerGroup) => (
                      <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                          return (
                            <TableHead key={header.id} className="py-2">
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
                    {props.table.getRowModel().rows?.length ? (
                      props.table.getRowModel().rows.map((row) => (
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className="py-1 px-2">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={props.columnsLength} className="h-24 text-center">
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
      </FormProvider>
      <DataTablePagination table={props.table} />
    </div>
  )
}
