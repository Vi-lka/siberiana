"use client"

import React from 'react'
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, Input, PopoverForModal, PopoverContentForModal, PopoverTriggerForModal, ScrollArea, Toggle } from '@siberiana/ui'
import { PREFIXES  } from '~/lib/utils/getDating'
import type {Prefix} from '~/lib/utils/getDating';
import { CircleDot, X } from 'lucide-react';
import { cn } from '@siberiana/ui/src/lib/utils';

export default function MultiCentury(props: {
    prefix: {
        first: Prefix | undefined,
        second: Prefix | undefined
    },
    century: {
        first: string,
        second: string
    },
    isAD: {
        first: boolean,
        second: boolean
    },
    onSelectPrefix: (prefix: Prefix | undefined, isFirst: boolean) => void,
    onChangeCentury: (value: number, isFirst: boolean) => void
    onIsADChange: (pressed: boolean, isFirst: boolean) => void
}) {

    const [openFirst, setOpenFirst] = React.useState(false);
    const [openSecond, setOpenSecond] = React.useState(false);

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className='p-3'>
                <span>Век - Век</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="flex flex-col items-center">
                <div className="flex gap-2 p-1 items-center">
                    <PopoverForModal open={openFirst} onOpenChange={setOpenFirst}>
                        <PopoverTriggerForModal asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-fit justify-start py-6 whitespace-nowrap"
                            >
                                {props.prefix.first
                                    ? props.prefix.first.label 
                                    : "Префикс..."
                                }
                            </Button>
                        </PopoverTriggerForModal>
                        <PopoverContentForModal className="p-0 font-Inter" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Поиск..." autoFocus={false}/>
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup>
                                            {props.prefix.first
                                              ? 
                                                <span 
                                                  className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
                                                  onClick={() => props.onSelectPrefix(undefined, true)}
                                                >
                                                  <X className="h-5 w-5"/> Удалить
                                                </span>
                                              : null
                                            }
                                            <ScrollArea type="always" classNameViewport="max-h-[260px]">
                                                {PREFIXES.map((prefix, index) => {
                                                    const isActive = props.prefix.first && (prefix?.label === props.prefix.first.label)
                                                    // const isActive = false
                                                    return (
                                                        <CommandItem
                                                            key={index}
                                                            value={prefix.label}
                                                            className='w-full text-left justify-start h-fit px-2 py-2 cursor-pointer'
                                                            onSelect={() => {
                                                                props.onSelectPrefix(prefix, true)
                                                                setOpenFirst(false)
                                                                setOpenSecond(false)
                                                            }}
                                                        >
                                                            <CircleDot
                                                              className={cn(
                                                                "mr-2 h-4 w-4",
                                                                isActive ? "opacity-100" : "opacity-0"
                                                              )}
                                                            />
                                                            <p className='flex-1'>
                                                              {prefix.label}
                                                            </p>
                                                        </CommandItem>
                                                    )
                                                })}
                                            </ScrollArea>
                                        </CommandGroup>
                                    </CommandList>
                            </Command>
                        </PopoverContentForModal>
                    </PopoverForModal>

                    <div className="flex w-full max-w-sm items-center gap-1">
                        <Input 
                            type="number"
                            // placeholder={props.century.first}
                            placeholder={"1"}
                            className="px-2 py-6 m-0 max-w-[4rem] max-h-8 text-sm border-solid w-auto overflow-visible truncate"
                            onChange={(e) => props.onChangeCentury(Number(e.target.value), true)}
                        />
                    </div>
                    <span className='whitespace-nowrap'>
                        {!!props.prefix.first
                            ? "века"
                            : "век"
                        }
                    </span>

                    <Toggle 
                        aria-label="Toggle AD" 
                        variant="outline"
                        className='whitespace-nowrap py-6'
                        pressed={props.isAD.first} 
                        onPressedChange={(pressed) => props.onIsADChange(pressed, true)}
                    >
                      {props.isAD.first
                        ? "н.э."
                        : "до н.э."
                      }
                    </Toggle>
                </div>

                <span className='font-semibold text-lg'>-</span>

                <div className="flex gap-2 p-1 items-center">
                    <PopoverForModal open={openSecond} onOpenChange={setOpenSecond}>
                        <PopoverTriggerForModal asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="w-fit justify-start py-6 whitespace-nowrap"
                            >
                                {props.prefix.second
                                    ? props.prefix.second.label 
                                    : "Префикс..."
                                }
                            </Button>
                        </PopoverTriggerForModal>
                        <PopoverContentForModal className="p-0 font-Inter" side="right" align="start">
                            <Command>
                                <CommandInput placeholder="Поиск..." autoFocus={false}/>
                                    <CommandList>
                                        <CommandEmpty>No results found.</CommandEmpty>
                                        <CommandGroup>
                                            {props.prefix.second
                                              ? 
                                                <span 
                                                  className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
                                                  onClick={() => props.onSelectPrefix(undefined, false)}
                                                >
                                                  <X className="h-5 w-5"/> Удалить
                                                </span>
                                              : null
                                            }
                                            <ScrollArea type="always" classNameViewport="max-h-[260px]">
                                                {PREFIXES.map((prefix, index) => {
                                                    const isActive = props.prefix.second && (prefix?.label === props.prefix.second.label)
                                                    // const isActive = false
                                                    return (
                                                        <CommandItem
                                                            key={index}
                                                            value={prefix.label}
                                                            className='w-full text-left justify-start h-fit px-2 py-2 cursor-pointer'
                                                            onSelect={() => {
                                                                props.onSelectPrefix(prefix, false)
                                                                setOpenFirst(false)
                                                                setOpenSecond(false)
                                                            }}
                                                        >
                                                            <CircleDot
                                                              className={cn(
                                                                "mr-2 h-4 w-4",
                                                                isActive ? "opacity-100" : "opacity-0"
                                                              )}
                                                            />
                                                            <p className='flex-1'>
                                                              {prefix.label}
                                                            </p>
                                                        </CommandItem>
                                                    )
                                                })}
                                            </ScrollArea>
                                        </CommandGroup>
                                    </CommandList>
                            </Command>
                        </PopoverContentForModal>
                    </PopoverForModal>

                    <div className="flex w-full max-w-sm items-center gap-1">
                        <Input 
                            type="number"
                            // placeholder={props.century.second}
                            placeholder={"1"}
                            className="px-2 py-6 m-0 max-w-[4rem] max-h-8 text-sm border-solid w-auto overflow-visible truncate"
                            onChange={(e) => props.onChangeCentury(Number(e.target.value), false)}
                        />
                    </div>
                    <span className='whitespace-nowrap'>
                        {!!props.prefix.second
                            ? "века"
                            : "век"
                        }
                    </span>

                    <Toggle 
                        aria-label="Toggle AD" 
                        variant="outline"
                        className='whitespace-nowrap py-6'
                        pressed={props.isAD.second} 
                        onPressedChange={(pressed) => props.onIsADChange(pressed, false)}
                    >
                      {props.isAD.second
                        ? "н.э."
                        : "до н.э."
                      }
                    </Toggle>
                </div>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    )
}
