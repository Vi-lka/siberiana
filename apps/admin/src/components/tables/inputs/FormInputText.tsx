"use client"

import { FormControl, FormField, FormItem, FormMessage, Input } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function FormInputText({
    name,
    className,
    placeholder
}: {
    name: string,
    className?: string,
    placeholder?: string
}) {

    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className='h-full'>
                    <FormControl>
                        <Input
                            className={cn(
                                "py-0 px-2 m-0 max-w-[8rem] text-xs border-solid border-transparent w-auto overflow-visible truncate",
                                className,
                                form.getFieldState(name).invalid 
                                    ? "border-red-500" 
                                    : form.getFieldState(name).isDirty ? "border-green-400" : ""
                            )}
                            placeholder={placeholder}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
