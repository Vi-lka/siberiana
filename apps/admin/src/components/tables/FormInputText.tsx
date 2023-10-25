"use client"

import { FormControl, FormField, FormItem, FormMessage, Input } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import React from 'react'
import { useFormContext } from 'react-hook-form'

export default function FormInputText({
    name,
    className,
    type,
    placeholder
}: {
    name: string,
    value: string,
    className?: string,
    type?: React.HTMLInputTypeAttribute,
    placeholder?: string
}) {

    const form = useFormContext();

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormControl>
                        <Input
                            type={type}
                            className={cn(
                                "",
                                className
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
