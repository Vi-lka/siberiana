"use client"

import { Button, Calendar, FormControl, FormField, FormItem, FormMessage, Popover, PopoverContent, PopoverTrigger } from '@siberiana/ui';
import { cn } from '@siberiana/ui/src/lib/utils';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { CalendarIcon, RotateCcw, X } from 'lucide-react';
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

    const [open, setOpenChange] = React.useState(false);

    const form = useFormContext();

    const dateNow = new Date()

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
              <FormItem className="flex flex-col relative">
                <Popover open={open} onOpenChange={setOpenChange}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "max-w-[240px] px-3 py-8 text-left font-normal w-max",
                          !field.value && "text-muted-foreground",
                          form.getFieldState(name).invalid 
                            ? "border-red-600" 
                            : (form.getFieldState(name).isDirty)? "border-green-500" : ""
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
                    {!!field.value
                      ? (
                        <span 
                          className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
                          onClick={() => {
                            setOpenChange(false)
                            form.setValue(name, null, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
                          }}
                        >
                          <X className="h-5 w-5"/> Удалить
                        </span>
                      )
                      : null
                    }
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={new Date(field.value as string)}
                      onSelect={(e: any) => {
                        field.onChange(e)
                        setOpenChange(false)
                      }}
                      disabled={(date) =>
                        date > dateNow
                      }
                      fromYear={!!fromYear ? fromYear : 1900}
                      toYear={dateNow.getFullYear()}
                      initialFocus
                      className='pt-0.5'
                    />
                  </PopoverContent>
                </Popover>
                {(form.getFieldState(name).isDirty)
                    ? (
                        <RotateCcw 
                            className='w-3.5 h-3.5 absolute -top-1 right-1 text-muted-foreground hover:text-foreground hover:scale-150 cursor-pointer transition-all' 
                            onClick={() => {
                              setOpenChange(false)
                              form.setValue(name, defaultValue, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
                            }}
                        />
                    )
                    : null
                }
                <FormMessage />
              </FormItem>
            )}
        />
    )
}
