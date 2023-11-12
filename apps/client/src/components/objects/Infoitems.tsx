import React from "react";

import type { ProtectedArea } from "@siberiana/schemas";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  TableCell,
  TableRow,
} from "@siberiana/ui";

export function SingleItem({
  label,
  value,
}: {
  label: string;
  value: string | undefined;
}) {
  if (!!value && value.length > 1) {
    return (
      <TableRow>
        <TableCell className="w-2/5 py-3 text-base font-semibold">
          {label}
        </TableCell>
        <TableCell className="w-3/5 py-3 font-normal">{value}</TableCell>
      </TableRow>
    );
  } else return null;
}

export function SingleItemArray({
  label,
  value,
}: {
  label: string;
  value: { displayName: string }[];
}) {
  if (value.length === 0) {
    return null;
  } else if (value.length === 1) {
    return (
      <TableRow>
        <TableCell className="w-2/5 py-3 text-base font-semibold">
          {label}
        </TableCell>
        <TableCell className="w-3/5 py-3 font-normal">
          {value[0].displayName}
        </TableCell>
      </TableRow>
    );
  } else
    return (
      <TableRow>
        <TableCell className="w-2/5 py-3 text-base font-semibold">
          {label}
        </TableCell>
        <TableCell className="flex w-3/5 flex-col gap-2 py-3 font-normal">
          {value.map((el, index) => (
            <p key={index}>{el.displayName}</p>
          ))}
        </TableCell>
      </TableRow>
    );
}

export function SingleItemProtectedArea({
  label,
  value,
}: {
  label: string;
  value: ProtectedArea | null;
}) {
  if (value === null) return null;

  return (
    <TableRow>
      <TableCell className="w-2/5 py-3 text-base font-semibold">
        {label}
      </TableCell>
      <TableCell className="w-3/5 py-3">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="justify-start gap-1 py-0 font-normal">
              {value.displayName}
            </AccordionTrigger>
            <AccordionContent className="text-xs">
              <p className="mb-2 ml-2">{value.description}</p>
              <p className="mb-2 ml-2">
                <span className="font-semibold">Категория ООПТ:</span>{" "}
                {value.protectedAreaCategory?.displayName}
              </p>
              <p className="mb-2 ml-2">
                <span className="font-semibold">Область:</span> {value.area}
              </p>
              <p className="ml-2">
                <span className="font-semibold">Дата создания:</span>{" "}
                {value.establishmentDate?.toLocaleDateString("ru")}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </TableCell>
    </TableRow>
  );
}
