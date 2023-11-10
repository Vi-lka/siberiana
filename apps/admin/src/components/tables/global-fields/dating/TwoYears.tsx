"use client"

import { DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, Input, Label } from '@siberiana/ui'
import React from 'react'

export default function TwoYears(props: {
    id: string,
    title: string,
    placeholderStart: string,
    placeholderEnd: string,
    postfix: string,
    onChangeStart: React.ChangeEventHandler<HTMLInputElement>,
    onChangeEnd: React.ChangeEventHandler<HTMLInputElement>,
    prefix?: string,
}) {
    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className='p-3'>
                <span>{props.title}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="flex gap-1 p-4 items-end">
                {props.prefix 
                    ? <span className='whitespace-nowrap'>{props.prefix}</span> 
                    : null
                }
                <div className="flex flex-col w-full max-w-sm gap-1">
                    <Label htmlFor={`yearStart${props.id}`}>Начало:</Label>
                    <Input 
                        type="number" 
                        id={`yearStart${props.id}`}
                        placeholder={props.placeholderStart}
                        className="p-4 m-0 max-w-[6rem] max-h-8 text-sm border-solid w-auto overflow-visible truncate"
                        onChange={props.onChangeStart}
                    />
                </div>
                <span className='font-semibold text-lg'>-</span>
                <div className="flex flex-col w-full max-w-sm gap-1">
                    <Label htmlFor={`yearEnd${props.id}`}>Конец:</Label>
                    <Input 
                        type="number" 
                        id={`yearEnd${props.id}`}
                        placeholder={props.placeholderEnd}
                        className="p-4 m-0 max-w-[6rem] max-h-8 text-sm border-solid w-auto overflow-visible truncate"
                        onChange={props.onChangeEnd}
                    />
                </div>
                <span className='whitespace-nowrap'>{props.postfix}</span>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    )
}
