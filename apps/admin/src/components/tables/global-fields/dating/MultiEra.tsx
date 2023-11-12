"use client";

import React from "react";

import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  PopoverContentForModal,
  PopoverForModal,
  PopoverTriggerForModal,
  ScrollArea,
} from "@siberiana/ui";
import { ERA } from "~/lib/utils/getDating";
import type { Dating } from "@siberiana/schemas";

export default function MultiEra({
    selected,
    handleNewValue,
  }: {
    selected: Dating;
    handleNewValue: (newValue: Dating) => void;
  }){
  const [openFirst, setOpenFirst] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);

  const firstEra = ERA.find(item => item.start === selected.datingStart)
  const secondEra = ERA.find(item => item.end === selected.datingEnd)

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="p-3">
        <span>Эпоха - Эпоха</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="flex items-center">
        <div className="flex items-center gap-2 p-1">
          <PopoverForModal open={openFirst} onOpenChange={setOpenFirst}>
            <PopoverTriggerForModal asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-fit justify-start whitespace-nowrap py-6"
              >
                {firstEra ? firstEra.label : "Эпоха..."}
              </Button>
            </PopoverTriggerForModal>
            <PopoverContentForModal
              className="font-Inter p-0"
              side="right"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Поиск..." autoFocus={false} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup className="max-w-[16.5rem]">
                    <ScrollArea type="always" classNameViewport="max-h-[260px]">
                        {ERA.map((item, index) => {
                          return (
                            <CommandItem
                              key={index}
                              value={item.label}
                              className="h-fit w-full cursor-pointer justify-start px-2 py-3 text-left"
                              onSelect={() => {
                                handleNewValue({
                                  datingStart: item.start,
                                  datingEnd: selected.datingEnd,
                                });
                                setOpenFirst(false)
                              }}
                            >
                              <p className="flex-1">{item.label}</p>
                            </CommandItem>
                          );
                        })}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContentForModal>
          </PopoverForModal>
        </div>

        <span className="text-lg font-semibold">-</span>

        <div className="flex items-center gap-2 p-1">
          <PopoverForModal open={openSecond} onOpenChange={setOpenSecond}>
            <PopoverTriggerForModal asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-fit justify-start whitespace-nowrap py-6"
              >
                {secondEra ? secondEra.label : "Эпоха..."}
              </Button>
            </PopoverTriggerForModal>
            <PopoverContentForModal
              className="font-Inter p-0"
              side="right"
              align="start"
            >
              <Command>
                <CommandInput placeholder="Поиск..." autoFocus={false} />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup className="max-w-[16.5rem]">
                    <ScrollArea type="always" classNameViewport="max-h-[260px]">
                        {ERA.map((item, index) => {
                          return (
                            <CommandItem
                              key={index}
                              value={item.label}
                              className="h-fit w-full cursor-pointer justify-start px-2 py-3 text-left"
                              onSelect={() => {
                                handleNewValue({
                                    datingStart: selected.datingStart,
                                    datingEnd: item.end,
                                  });
                                  setOpenSecond(false)
                              }}
                            >
                              <p className="flex-1">{item.label}</p>
                            </CommandItem>
                          );
                        })}
                    </ScrollArea>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContentForModal>
          </PopoverForModal>
        </div>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
