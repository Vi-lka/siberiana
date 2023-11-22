import type { CollectionTypeEnum } from '@siberiana/schemas';
import { Dialog, DialogContent, TableCell, TableRow } from '@siberiana/ui'
import { flexRender  } from '@tanstack/react-table'
import type {Row} from '@tanstack/react-table';
import React from 'react'
import type { Table as TableTanstack } from "@tanstack/react-table";

interface DialogFormProps<TData> {
    table: TableTanstack<TData>,
    row: Row<TData>,
    dialogType: CollectionTypeEnum
}

export default function DialogForm<TData>(props: DialogFormProps<TData>) {
    const [openDialog, setDialogOpen] = React.useState(false);

    const handleDialog = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        e.preventDefault()
        e.stopPropagation()

        setDialogOpen(true)
    }

    return (
        <Dialog open={openDialog} onOpenChange={setDialogOpen}>
            <TableRow
              key={props.row.id}
              data-state={props.row.getIsSelected() && "selected"}
              onClick={handleDialog}
              className="cursor-pointer"
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
            <DialogContent>
              {props.dialogType}
            </DialogContent>
        </Dialog>
    )
}
