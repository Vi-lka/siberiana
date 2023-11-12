"use client";

import React from "react";
import { RotateCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function FormInputText({
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
        <FormItem className="relative h-full">
          <FormControl>
            <Input
              className={cn(
                "m-0 w-auto max-w-[8rem] overflow-visible truncate border-solid border-transparent px-2 py-6 text-xs",
                className,
                form.getFieldState(name).invalid
                  ? "border-red-500"
                  : form.getFieldState(name).isDirty ||
                    field.value !== defaultValue
                  ? "border-green-400"
                  : "",
              )}
              placeholder={placeholder}
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
