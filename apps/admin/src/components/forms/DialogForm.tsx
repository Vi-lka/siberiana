import type { ArtifactForTable, EntityEnum } from '@siberiana/schemas';
import { Dialog, DialogContent, DialogHeader, DialogTitle, ScrollArea, Separator, TableCell, TableRow, ToastAction, useToast } from '@siberiana/ui'
import { flexRender  } from '@tanstack/react-table'
import type {Row} from '@tanstack/react-table';
import React from 'react'
import type { Table as TableTanstack } from "@tanstack/react-table";
import { MousePointerClick } from 'lucide-react';
import { useDoubleTap } from 'use-double-tap';
import Artifacts from './edit-content/Artifacts';

interface DialogFormProps<TData> {
  table: TableTanstack<TData>,
  row: Row<TData>,
  dialogType: EntityEnum
}

export default function DialogForm<TData>(props: DialogFormProps<TData>) {
  const [openDialog, setDialogOpen] = React.useState(false);
  const { toast } = useToast()

  let timer: NodeJS.Timeout

  const bind = useDoubleTap((e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    clearTimeout(timer)
    e.preventDefault()
    e.stopPropagation()
    if (e.detail === undefined) return // prevent on select
    else setDialogOpen(true)
  }, undefined, {
    onSingleTap: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      clearTimeout(timer)
      e.preventDefault()
      e.stopPropagation()
      if (e.detail === undefined) return // prevent on select
      else timer = setTimeout(() => {
        toast({
          className: "font-Inter w-fit h-fit p-5 space-x-0 bottom-2 right-2 flex fixed md:max-w-fit md:bottom-4 md:right-4",
          duration: 1500,
          
          action: 
            <ToastAction altText="DoubleClick" className='m-0 px-1 py-2 w-fit h-fit border-none'>
              <MousePointerClick className='w-8 h-8 cursor-pointer' onClick={() => setDialogOpen(true)}/>
              <span className='animate-bounce ml-0.5'><sub>2</sub></span>
            </ToastAction>
        })
      }, 300);
    }
  });

  return (
    <Dialog open={openDialog} onOpenChange={setDialogOpen}>
      <TableRow
        key={props.row.id}
        data-state={props.row.getIsSelected() && "selected"}
        className="cursor-pointer"
        {...bind}
      >
        {props.row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="px-2 py-1">
            {flexRender(
              cell.column.columnDef.cell,
              cell.getContext(),
            )}
          </TableCell>
        ))}
      </TableRow>
      <DialogContent className='font-Inter'>
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="ml-0 mr-auto flex flex-col space-y-1.5 text-left">
            <DialogTitle>Изменить</DialogTitle>
          </div>
        </DialogHeader>
              
        <Separator />
              
        <ScrollArea
          className="pt-3"
          classNameViewport="lg:max-h-[70vh] max-h-[60vh] md:px-4 px-2 pb-2"
        >
          {{ 
            "artifacts": <Artifacts row={props.row as Row<ArtifactForTable>} />,
            "books": <div>books</div>,
            "art": <div>art</div>,
            "protected_area_pictures": <div>protected_area_pictures</div>
          }[props.dialogType]}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
