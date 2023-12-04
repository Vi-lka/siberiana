import React from "react";
import { RotateCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { cn } from "@siberiana/ui/src/lib/utils";

import getShortDescription from "~/lib/utils/getShortDescription";

export default function LargeTextCell({
  name,
  defaultValue,
  className,
}: {
  name: string;
  defaultValue: string | undefined;
  className?: string;
}) {
  const form = useFormContext();

  const value = form.getValues(name) as string | undefined;

  const customDirty = value !== defaultValue;

  return (
    <div
      className={cn(
        "relative rounded-md border-[1px] border-transparent px-2 py-6",
        className,
        form.getFieldState(name).invalid
          ? "border-red-500"
          : form.getFieldState(name).isDirty || customDirty
            ? "border-green-400"
            : "",
      )}
    >
      <p className="w-max max-w-xs">
        {value ? getShortDescription(value) : "__"}
      </p>
      {form.getFieldState(name).isDirty || customDirty ? (
        <RotateCcw
          className="text-muted-foreground hover:text-foreground absolute right-1 top-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.setValue(name, defaultValue, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
          }}
        />
      ) : null}
    </div>
  );
}
