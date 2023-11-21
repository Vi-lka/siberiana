"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { Table, TableBody } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function InfoTable({ children }: { children: React.ReactNode }) {
  const [more, setMore] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const tableRef = React.createRef<HTMLTableElement>();

  React.useEffect(() => {
    setHeight(tableRef.current ? tableRef.current.clientHeight : 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={cn(
        `transition-[max-height] duration-300 ease-in-out overflow-hidden`,
        more ? "max-h-[100rem]" : "max-h-[320px]",
      )}>
        <Table ref={tableRef} className="font-Inter text-sm">
          <TableBody>{children}</TableBody>
        </Table>
      </div>
      <div
        className="font-Inter text-beaver dark:text-beaverLight flex cursor-pointer  items-center gap-1 text-sm uppercase hover:underline"
        onClick={() => setMore((value) => !value)}
      >
        {height > 320
          ? more 
            ? (
              <>
                <p>Свернуть</p>
                <ChevronUp className="h-6 w-6 stroke-1" />
              </>
            ) : (
              <>
                <p>Все метаданные</p>
                <ChevronDown className="h-6 w-6 stroke-1" />
              </>
            )
          : null  
        }
      </div>
    </>
  );
}
