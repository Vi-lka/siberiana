"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Textarea,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function FormTextArea({
  name,
  defaultValue,
  className,
  placeholder,
}: {
  name: string;
  defaultValue?: string;
  className?: string;
  placeholder?: string;
}) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative h-full w-full">
          <FormControl>
            <Textarea
              className={cn(
                "m-0 w-full min-w-[12rem] overflow-visible border-solid border-transparent px-2 py-0 pr-4 text-xs",
                className,
                form.getFieldState(name).invalid
                  ? "border-red-600"
                  : form.getFieldState(name).isDirty ||
                    field.value !== defaultValue
                  ? "border-green-500"
                  : "",
              )}
              placeholder={placeholder}
              onKeyDown={(event) => {
                if (event.key === "Enter") event.preventDefault(); // prevent lines
              }}
              {...field}
            />
          </FormControl>
          {form.getFieldState(name).isDirty || field.value !== defaultValue ? (
            <RotateCcw
              className="text-muted-foreground hover:text-foreground absolute -top-1 right-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
              onClick={() =>
                form.setValue(name, defaultValue, {
                  shouldDirty: true,
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
            />
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
