"use client"

import { Button, Calendar, FormControl, FormField, FormItem, FormMessage, Popover, PopoverContent, PopoverTrigger } from '@siberiana/ui';
import { cn } from '@siberiana/ui/src/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon, X } from 'lucide-react';
import React from 'react'
import { useFormContext } from 'react-hook-form';

export default function DateSelect({
    name,
    placeholder,
    fromYear,
    defaultValue,
}: {
    name: string,
    placeholder: string,
    fromYear?: number,
    defaultValue?: Date | null,
}) {

    const form = useFormContext();

    const dateNow = new Date()

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "max-w-[240px] px-3 text-left font-normal w-max",
                          !field.value && "text-muted-foreground",
                          form.getFieldState(name).invalid 
                            ? "border-red-600" 
                            : (form.getFieldState(name).isDirty || field.value !== defaultValue)? "border-green-500" : ""
                        )}
                      >
                        {field.value ? (
                          format(new Date(field.value as string), "PPP", {locale: ru})
                        ) : (
                          <span>{placeholder}</span>
                        )}
                        <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  {!!field.value
                    ? (
                      <X 
                        className="h-5 w-5 opacity-50 hover:opacity-100 hover:scale-125 z-20 transition-all cursor-pointer mx-auto" 
                        onClick={() => form.setValue(name, null, {shouldDirty: true, shouldValidate: true, shouldTouch: true})}
                      />
                    )
                    : null
                  }
                  <PopoverContent className="w-auto p-0 font-Inter" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={new Date(field.value as string)}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > dateNow
                      }
                      fromYear={!!fromYear ? fromYear : 1900}
                      toYear={dateNow.getFullYear()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
        />
    )
}
