"use client"

import { FormControl, FormField, FormItem, FormMessage, Textarea } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function FormTextArea({
    name,
    className,
    placeholder
}: {
    name: string,
    value: string,
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
                        <Textarea
                            className={cn(
                                "py-0 px-2 m-0 text-xs border-none w-auto overflow-visible",
                                className
                            )}
                            placeholder={placeholder}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") event.preventDefault() // prevent lines
                            }}
                            {...field}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
