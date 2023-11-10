"use client"

import type { Dating } from '@siberiana/schemas'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, ScrollArea } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { CircleDot } from 'lucide-react'
import React from 'react'
import { ERA } from '~/lib/utils/getDating'

export default function Era({
  selected,
  handleNewValue,
}: {
  selected: Dating
  handleNewValue: (newValue: Dating) => void
}) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className='p-3'>
        <span>Эпоха</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <Command>
          <CommandInput placeholder="Поиск..." autoFocus={false}/>
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className='max-w-[16.5rem]'>
              <ScrollArea type="always" classNameViewport="max-h-[260px]">
                {ERA.map((item, index) => {
                  const isActive = (selected.datingStart === item.start && selected.datingEnd === item.end)
                  return (
                    <CommandItem
                      key={index}
                      value={item.label}
                      className="w-full text-left justify-start h-fit px-2 py-3 cursor-pointer"
                      onSelect={() => {
                        handleNewValue({datingStart: item.start, datingEnd: item.end})
                      }}
                    >
                      <CircleDot
                        className={cn(
                          "mr-2 h-4 w-4",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                      <p className='flex-1'>
                        {item.label}
                      </p>
                    </CommandItem>
                  )
                })}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
