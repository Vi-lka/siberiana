"use client"

import { DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, Input } from '@siberiana/ui'
import React from 'react'

export default function OneYear(props: {
    title: string,
    placeholder: string,
    postfix: string,
    onChange: React.ChangeEventHandler<HTMLInputElement>,
    prefix?: string,
}) {
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className='p-3'>
                <span>{props.title}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="flex gap-2 p-4 items-center">
                {props.prefix 
                    ? <span className='whitespace-nowrap'>{props.prefix}</span> 
                    : null
                }
                <div className="flex w-full max-w-sm items-center gap-1">
                    <Input 
                        type="number"
                        placeholder={props.placeholder}
                        className="p-4 m-0 max-w-[6rem] max-h-8 text-sm border-solid w-auto overflow-visible truncate"
                        onChange={props.onChange}
                    />
                </div>
                <span className='whitespace-nowrap'>{props.postfix}</span>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    )
}
