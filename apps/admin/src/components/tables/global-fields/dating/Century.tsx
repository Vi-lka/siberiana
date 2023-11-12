"use client";

import React from "react";
import { CircleDot, X } from "lucide-react";

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
  Input,
  PopoverContentForModal,
  PopoverForModal,
  PopoverTriggerForModal,
  ScrollArea,
  Toggle,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import { PREFIXES } from "~/lib/utils/getDating";
import type { Prefix } from "~/lib/utils/getDating";

export default function Century(props: {
  prefix: Prefix | undefined;
  century: string;
  isAD: boolean;
  onSelectPrefix: (prefix: Prefix | undefined) => void;
  onChangeCentury: React.ChangeEventHandler<HTMLInputElement>;
  onIsADChange: (pressed: boolean) => void;
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="p-3">
        <span>Век</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="flex items-center gap-2 p-4">
        <PopoverForModal open={open} onOpenChange={setOpen}>
          <PopoverTriggerForModal asChild>
            <Button
              variant="outline"
              size="sm"
              className="w-fit justify-start whitespace-nowrap py-6"
            >
              {props.prefix ? props.prefix.label : "Префикс..."}
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
                <CommandGroup>
                  {props.prefix ? (
                    <span
                      className="text-muted-foreground hover:text-foreground my-1 flex cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
                      onClick={() => props.onSelectPrefix(undefined)}
                    >
                      <X className="h-5 w-5" /> Удалить
                    </span>
                  ) : null}
                  <ScrollArea type="always" classNameViewport="max-h-[260px]">
                    {PREFIXES.map((prefix, index) => {
                      const isActive =
                        props.prefix && prefix?.label === props.prefix.label;
                      return (
                        <CommandItem
                          key={index}
                          value={prefix.label}
                          className="h-fit w-full cursor-pointer justify-start px-2 py-2 text-left"
                          onSelect={() => {
                            props.onSelectPrefix(prefix);
                            setOpen(false);
                          }}
                        >
                          <CircleDot
                            className={cn(
                              "mr-2 h-4 w-4",
                              isActive ? "opacity-100" : "opacity-0",
                            )}
                          />
                          <p className="flex-1">{prefix.label}</p>
                        </CommandItem>
                      );
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
            placeholder={props.century}
            // placeholder={"1"}
            className="m-0 max-h-8 w-auto max-w-[4rem] overflow-visible truncate border-solid px-2 py-6 text-sm"
            onChange={props.onChangeCentury}
          />
        </div>
        <span className="whitespace-nowrap">
          {!!props.prefix ? "века" : "век"}
        </span>

        <Toggle
          aria-label="Toggle AD"
          variant="outline"
          className="whitespace-nowrap py-6"
          pressed={props.isAD}
          onPressedChange={props.onIsADChange}
        >
          {props.isAD ? "н.э." : "до н.э."}
        </Toggle>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
