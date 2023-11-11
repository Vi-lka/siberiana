"use client"

import { FormControl, FormField, FormItem, FormMessage, Input } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { RotateCcw } from 'lucide-react'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function FormInputText({
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
                <FormItem className='h-full relative'>
                    <FormControl>
                        <Input
                            className={cn(
                                "py-6 px-2 m-0 max-w-[8rem] text-xs border-solid border-transparent w-auto overflow-visible truncate",
                                className,
                                form.getFieldState(name).invalid 
                                    ? "border-red-500" 
                                    : (form.getFieldState(name).isDirty || field.value !== defaultValue) ? "border-green-400" : ""
                            )}
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    {(form.getFieldState(name).isDirty || field.value !== defaultValue)
                        ? (
                            <RotateCcw 
                                className='w-3.5 h-3.5 absolute -top-1 right-1 text-muted-foreground hover:text-foreground hover:scale-150 cursor-pointer transition-all' 
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
