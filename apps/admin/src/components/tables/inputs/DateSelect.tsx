"use client";

import React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CalendarIcon, RotateCcw, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import {
  Button,
  Calendar,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  PopoverContentForModal,
  PopoverForModal,
  PopoverTriggerForModal,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function DateSelect({
  name,
  placeholder,
  fromYear,
  defaultValue,
  className,
  align = "center",
  side = "bottom",
}: {
  name: string;
  placeholder: string;
  fromYear?: number;
  defaultValue?: Date | string | null;
  className?: string;
  align?: "center" | "end" | "start";
  side?: "top" | "right" | "bottom" | "left";
}) {
  const [open, setOpenChange] = React.useState(false);

  const form = useFormContext();

  const dateNow = new Date();

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="relative flex flex-col">
          <PopoverForModal open={open} onOpenChange={setOpenChange}>
            <PopoverTriggerForModal asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-max max-w-[240px] px-3 py-8 text-left font-normal border-transparent",
                    className,
                    !field.value && "text-muted-foreground",
                    form.getFieldState(name).invalid
                      ? "border-red-600"
                      : form.getFieldState(name).isDirty
                      ? "border-green-500"
                      : "",
                  )}
                >
                  {field.value ? (
                    format(new Date(field.value as string), "PPP", {
                      locale: ru,
                    })
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTriggerForModal>
            <PopoverContentForModal
              className="font-Inter w-auto p-0"
              align={align}
              side={side}
            >
              {!!field.value ? (
                <span
                  className="text-muted-foreground hover:text-foreground my-1 flex cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
                  onClick={() => {
                    setOpenChange(false);
                    form.setValue(name, null, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    });
                  }}
                >
                  <X className="h-5 w-5" /> Удалить
                </span>
              ) : null}
              <Calendar
                mode="single"
                captionLayout="dropdown-buttons"
                selected={new Date(field.value as string)}
                onSelect={(e: any) => {
                  field.onChange(e);
                  setOpenChange(false);
                }}
                disabled={(date) => date > dateNow}
                fromYear={!!fromYear ? fromYear : 1900}
                toYear={dateNow.getFullYear()}
                initialFocus
                className="pt-0.5"
              />
            </PopoverContentForModal>
          </PopoverForModal>
          {form.getFieldState(name).isDirty ? (
            <RotateCcw
              className="text-muted-foreground hover:text-foreground absolute -top-1 right-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
              onClick={() => {
                setOpenChange(false);
                form.setValue(name, defaultValue, {
                  shouldDirty: true,
                  shouldValidate: true,
                  shouldTouch: true,
                });
              }}
            />
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
