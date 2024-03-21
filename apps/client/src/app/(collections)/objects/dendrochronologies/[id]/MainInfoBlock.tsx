import React from "react";

import type { DendrochronologyById, ObjectsDict } from "@siberiana/schemas";

import { SingleItem } from "~/components/objects/Infoitems";
import InfoTable from "~/components/objects/InfoTable";
import { TableCell, TableRow } from "@siberiana/ui";
import Link from "next/link";

export default function MainInfoBlock({
  dict,
  data,
}: {
  dict: ObjectsDict;
  data: DendrochronologyById;
}) {
  return (
    <div className="w-full">
      <h2 className="text-foreground mb-3 text-lg font-bold uppercase lg:text-xl">
        {dict.mainInfo.title}
      </h2>

      <InfoTable>
        <SingleItem
          label="Датировка"
          value={data.dating}
        />
        <SingleItem label="Данные дендрохронологического анализа" value={data.analysisData} />
        <TableRow>
          <TableCell className="w-2/5 py-3 text-base font-semibold">
            Ссылка на данные
          </TableCell>
          <TableCell className="w-3/5 py-3 font-normal">
            <Link href={data.analysisURL} target="__blank" className="underline underline-offset-4 py-2 px-4 rounded-full hover:text-accent hover:bg-primary transition-all">
              Открыть
            </Link>
          </TableCell>
        </TableRow>
      </InfoTable>
    </div>
  );
}
