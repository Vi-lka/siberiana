import React from "react";
import { flexRender } from "@tanstack/react-table";
import type { Row, Table as TableTanstack } from "@tanstack/react-table";
import { Loader2, MousePointerClick } from "lucide-react";
import { useDoubleTap } from "use-double-tap";

import type {
  ArtifactForTable,
  BookForTable,
  BookGenreForTable,
  CountriesForTable,
  CultureForTable,
  DistrictsForTable,
  EntityEnum,
  EthnosForTable,
  LocationsForTable,
  MaterialForTable,
  ModelForTable,
  MonumentForTable,
  OrganizationsForTable,
  PeriodicalForTable,
  PersonsForTable,
  ProjectsForTable,
  PublicationsForTable,
  RegionsForTable,
  SetForTable,
  SettlementsForTable,
  TechniqueForTable,
} from "@siberiana/schemas";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  ScrollArea,
  Separator,
  TableCell,
  TableRow,
  ToastAction,
  useToast,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import Artifacts from "./Artifacts";
import BookGenres from "./BookGenres";
import Books from "./Books";
import Cultures from "./Cultures";
import Materials from "./Materials";
import Models from "./Models";
import Monuments from "./Monuments";
import Periodicals from "./Periodicals";
import Sets from "./Sets";
import Techniques from "./Techniques";
import Ethnos from "./Ethnos";
import Locations from "./Locations";
import Countries from "./Countries";
import Regions from "./Regions";
import Districts from "./Districts";
import Settlements from "./Settlements";
import Persons from "./Persons";
import Organizations from "./Organizations";
import Publications from "./Publications";
import Projects from "./Projects";

interface DialogFormProps<TData> {
  table: TableTanstack<TData>;
  row: Row<TData>;
  dialogType: EntityEnum;
}

export default function DialogForm<TData>(props: DialogFormProps<TData>) {
  const [openDialog, setDialogOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const { toast } = useToast();

  const handleOpen = (open: boolean) => {
    startTransition(() => {
      setDialogOpen(open);
    });
  };

  let timer: NodeJS.Timeout;

  const bind = useDoubleTap(
    (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
      clearTimeout(timer);
      e.preventDefault();
      e.stopPropagation();
      if (e.detail === undefined) return; // prevent on select
      else handleOpen(true);
    },
    undefined,
    {
      onSingleTap: (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
        clearTimeout(timer);
        e.preventDefault();
        e.stopPropagation();
        if (e.detail === undefined) return; // prevent on select
        else
          timer = setTimeout(() => {
            toast({
              className:
                "font-Inter w-fit h-fit p-5 space-x-0 bottom-2 right-2 flex fixed md:max-w-fit md:bottom-4 md:right-4",
              duration: 1500,

              action: (
                <ToastAction
                  altText="DoubleClick"
                  className="m-0 h-fit w-fit border-none px-1 py-2"
                >
                  <MousePointerClick
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => handleOpen(true)}
                  />
                  <span className="ml-0.5 animate-bounce">
                    <sub>2</sub>
                  </span>
                </ToastAction>
              ),
            });
          }, 300);
      },
    },
  );

  return (
    <Dialog open={openDialog} onOpenChange={handleOpen}>
      <TableRow
        key={props.row.id}
        data-state={props.row.getIsSelected() && "selected"}
        className={cn(isPending ? "bg-muted cursor-wait" : "cursor-pointer")}
        {...bind}
      >
        {props.row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} className="px-2 py-1">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
      {isPending ? (
        <tr className="relative">
          <td>
            <Loader2 className="absolute -top-6 h-6 w-6 animate-spin" />
          </td>
        </tr>
      ) : (
        <DialogContent className="font-Inter lg:max-w-4xl xl:max-w-6xl">
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
            {
              {
                artifacts: (
                  <Artifacts row={props.row as Row<ArtifactForTable>} />
                ),
                cultures: <Cultures row={props.row as Row<CultureForTable>} />,
                ethnosSlice: <Ethnos row={props.row as Row<EthnosForTable>} />,
                materials: (
                  <Materials row={props.row as Row<MaterialForTable>} />
                ),
                techniques: (
                  <Techniques row={props.row as Row<TechniqueForTable>} />
                ),
                sets: <Sets row={props.row as Row<SetForTable>} />,
                monuments: (
                  <Monuments row={props.row as Row<MonumentForTable>} />
                ),
                models: <Models row={props.row as Row<ModelForTable>} />,
                books: <Books row={props.row as Row<BookForTable>} />,
                bookGenres: (
                  <BookGenres row={props.row as Row<BookGenreForTable>} />
                ),
                periodicals: (
                  <Periodicals row={props.row as Row<PeriodicalForTable>} />
                ),
                locations: (
                  <Locations row={props.row as Row<LocationsForTable>} />
                ),
                countries: (
                  <Countries row={props.row as Row<CountriesForTable>} />
                ),
                regions: (
                  <Regions row={props.row as Row<RegionsForTable>} />
                ),
                districts: (
                  <Districts row={props.row as Row<DistrictsForTable>} />
                ),
                settlements: (
                  <Settlements row={props.row as Row<SettlementsForTable>} />
                ),
                persons: (
                  <Persons row={props.row as Row<PersonsForTable>} />
                ),
                organizations: (
                  <Organizations row={props.row as Row<OrganizationsForTable>} />
                ),
                publications: (
                  <Publications row={props.row as Row<PublicationsForTable>} />
                ),
                projects: (
                  <Projects row={props.row as Row<ProjectsForTable>} />
                )
              }[props.dialogType]
            }
          </ScrollArea>
        </DialogContent>
      )}
    </Dialog>
  );
}
