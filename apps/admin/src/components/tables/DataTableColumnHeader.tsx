import { useTransition } from "react";
import type { Column } from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronsUpDown,
  Loader2,
  XCircle,
} from "lucide-react";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const [isPending, startTransition] = useTransition();

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div
      className={cn("flex items-center justify-center space-x-2", className)}
    >
      {isPending ? (
        <Loader2 className="mx-auto h-4 w-4 animate-spin" />
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="data-[state=open]:bg-accent -ml-3 h-8 text-center"
            >
              <span>{title}</span>
              {column.getIsSorted() === "desc" ? (
                <ArrowDownIcon className="ml-2 h-4 w-4" />
              ) : column.getIsSorted() === "asc" ? (
                <ArrowUpIcon className="ml-2 h-4 w-4" />
              ) : (
                <ChevronsUpDown className="ml-2 h-4 w-4" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="font-Inter">
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                startTransition(() => {
                  column.toggleSorting(false);
                });
              }}
            >
              <ArrowUpIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
              Asc
            </DropdownMenuItem>
            <DropdownMenuItem
              className="cursor-pointer"
              onClick={() => {
                startTransition(() => {
                  column.toggleSorting(true);
                });
              }}
            >
              <ArrowDownIcon className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
              Desc
            </DropdownMenuItem>
            {column.getIsSorted() ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    startTransition(() => {
                      column.clearSorting();
                    });
                  }}
                >
                  <XCircle className="text-muted-foreground/70 mr-2 h-3.5 w-3.5" />
                  Reset
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
}
