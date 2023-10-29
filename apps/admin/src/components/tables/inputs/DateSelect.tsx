"use client"

import { Button, Calendar, FormControl, FormField, FormItem, FormMessage, Popover, PopoverContent, PopoverTrigger } from '@siberiana/ui';
import { cn } from '@siberiana/ui/src/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon } from 'lucide-react';
import React from 'react'
import { useFormContext } from 'react-hook-form';

export default function DateSelect({
    name,
    placeholder
}: {
    name: string,
    placeholder: string
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
                          !field.value && "text-muted-foreground"
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
                  <PopoverContent className="w-auto p-0 font-Inter" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={new Date(field.value as string)}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > dateNow
                      }
                      fromYear={1960}
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
