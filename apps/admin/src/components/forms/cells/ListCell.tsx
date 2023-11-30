import React from "react";
import { CircleDot, RotateCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { Item } from "@siberiana/schemas";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function ListCell({
  name,
  defaultValues,
  className,
}: {
  name: string;
  defaultValues: Item[];
  className?: string;
}) {
  const form = useFormContext();

  const values = form.getValues(name) as Item[];

  const sortedDefaultValues = defaultValues?.sort((a, b) => {
    return Number(a.id) - Number(b.id);
  });
  const sortedValues = values?.sort((a, b) => {
    return Number(a.id) - Number(b.id);
  });
  const customDirty =
    sortedDefaultValues?.toString() !== sortedValues?.toString();

  if (values.length === 0) return <p className="text-center">__</p>;

  return (
    <ul
      className={cn(
        "relative flex w-max flex-col gap-1 rounded-md border-[1px] border-transparent px-2 py-6",
        className,
        form.getFieldState(name).invalid
          ? "border-red-500"
          : form.getFieldState(name).isDirty || customDirty
          ? "border-green-400"
          : "",
      )}
    >
      {values.map((value) => (
        <li key={value.id} className="flex items-center p-1 text-xs">
          <CircleDot className="mr-1.5 h-3 w-3" />
          <p className="flex-1 break-words">{value.displayName}</p>
        </li>
      ))}
      {form.getFieldState(name).isDirty || customDirty ? (
        <RotateCcw
          className="text-muted-foreground hover:text-foreground absolute right-1 top-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.setValue(name, defaultValues, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
          }}
        />
      ) : null}
    </ul>
  );
}
