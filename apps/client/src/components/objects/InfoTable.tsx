"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { ScrollArea, Table, TableBody } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function InfoTable({ children }: { children: React.ReactNode }) {
  const [more, setMore] = React.useState(false);

  return (
    <>
      <ScrollArea
        type="hover"
        classNameViewport={cn(
          `transition-[max-height] duration-300 ease-in-out`,
          more ? "max-h-[100rem]" : "max-h-[300px]",
        )}
      >
        <Table className="font-Inter text-sm">
          <TableBody>{children}</TableBody>
        </Table>
      </ScrollArea>
      <div
        className="font-Inter text-beaver dark:text-beaverLight flex cursor-pointer  items-center gap-1 text-sm uppercase hover:underline"
        onClick={() => setMore((value) => !value)}
      >
        {more ? (
          <>
            <p>Свернуть</p>
            <ChevronUp className="h-6 w-6 stroke-1" />
          </>
        ) : (
          <>
            <p>Все метаданные</p>
            <ChevronDown className="h-6 w-6 stroke-1" />
          </>
        )}
      </div>
    </>
  );
}
