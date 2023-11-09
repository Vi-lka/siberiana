"use client"

import React from 'react'
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, Input, PopoverForModal, PopoverContentForModal, PopoverTriggerForModal, ScrollArea, Toggle } from '@siberiana/ui'
import { PREFIXES  } from '~/lib/utils/getDating'
import type {Prefix} from '~/lib/utils/getDating';
import { CircleDot, X } from 'lucide-react';
import { cn } from '@siberiana/ui/src/lib/utils';

export default function Century(props: {
    prefix: Prefix | undefined,
    century: string,
    isAD: boolean,
    onSelectPrefix: (prefix: Prefix | undefined) => void,
    onChangeCentury: React.ChangeEventHandler<HTMLInputElement>,
    onIsADChange: (pressed: boolean) => void
}) {

    const [open, setOpen] = React.useState(false);

    return (
        <DropdownMenuSub>
            <DropdownMenuSubTrigger className='p-3'>
                <span>Век</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent className="flex gap-2 p-4 items-center">
                <PopoverForModal open={open} onOpenChange={setOpen}>
                    <PopoverTriggerForModal asChild>
                        <Button
                            variant="outline"
                            size="sm"
                            className="w-fit justify-start py-6 whitespace-nowrap"
                        >
                            {props.prefix 
                                ? props.prefix.label 
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
                                        {props.prefix
                                          ? 
                                            <span 
                                              className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
                                              onClick={() => props.onSelectPrefix(undefined)}
                                            >
                                              <X className="h-5 w-5"/> Удалить
                                            </span>
                                          : null
                                        }
                                        <ScrollArea type="always" classNameViewport="max-h-[260px]">
                                            {PREFIXES.map((prefix, index) => {
                                                const isActive = props.prefix && (prefix?.label === props.prefix.label)
                                                return (
                                                    <CommandItem
                                                        key={index}
                                                        value={prefix.label}
                                                        className='w-full text-left justify-start h-fit px-2 py-2 cursor-pointer'
                                                        onSelect={() => {
                                                            props.onSelectPrefix(prefix)
                                                            setOpen(false)
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
                        // placeholder={props.century}
                        placeholder={"1"}
                        className="px-2 py-6 m-0 max-w-[4rem] max-h-8 text-sm border-solid w-auto overflow-visible truncate"
                        onChange={props.onChangeCentury}
                    />
                </div>
                <span className='whitespace-nowrap'>
                    {!!props.prefix
                        ? "века"
                        : "век"
                    }
                </span>

                <Toggle 
                    aria-label="Toggle AD" 
                    variant="outline"
                    className='whitespace-nowrap py-6'
                    pressed={props.isAD} 
                    onPressedChange={props.onIsADChange}
                >
                  {props.isAD
                    ? "н.э."
                    : "до н.э."
                  }
                </Toggle>
            </DropdownMenuSubContent>
        </DropdownMenuSub>
    )
}
