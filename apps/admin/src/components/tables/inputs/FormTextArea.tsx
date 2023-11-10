"use client"

import { FormControl, FormField, FormItem, FormMessage, Textarea } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { RotateCcw } from 'lucide-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function FormTextArea({
    name,
    defaultValue,
    className,
    placeholder
}: {
    name: string,
    defaultValue?: string,
    className?: string,
    placeholder?: string
}) {

    const form = useFormContext();
    
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='w-full h-full relative'>
                    <FormControl>
                        <Textarea
                            className={cn(
                                "w-full py-0 px-2 pr-4 m-0 text-xs border-solid border-transparent min-w-[12rem] overflow-visible",
                                className,
                                form.getFieldState(name).invalid 
                                    ? "border-red-600" 
                                    : (form.getFieldState(name).isDirty || field.value !== defaultValue) ? "border-green-500" : ""
                            )}
                            placeholder={placeholder}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") event.preventDefault() // prevent lines
                            }}
                            {...field}
                        />
                    </FormControl>
                    {(form.getFieldState(name).isDirty || field.value !== defaultValue)
                        ? (
                            <RotateCcw 
                                className='w-3.5 h-3.5 absolute -top-1 right-1 z-50 text-muted-foreground hover:text-foreground hover:scale-150 cursor-pointer transition-all' 
                                onClick={() => form.setValue(name, defaultValue, {shouldDirty: true, shouldValidate: true, shouldTouch: true})}
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
