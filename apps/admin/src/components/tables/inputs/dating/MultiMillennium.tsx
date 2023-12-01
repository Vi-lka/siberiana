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
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import { PREFIXES } from "~/lib/utils/getDating";
import type { DatingType, Prefix } from "~/lib/utils/getDating";

export default function MultiMillennium(props: {
  prefix: {
    first: Prefix | undefined;
    second: Prefix | undefined;
  };
  century: {
    first: string;
    second: string;
  };
  onSelectPrefix: (
    prefix: Prefix | undefined,
    isFirst: boolean,
    type: DatingType,
  ) => void;
  onChangeCentury: (value: number, isFirst: boolean, type: DatingType) => void;
}) {
  const [openFirst, setOpenFirst] = React.useState(false);
  const [openSecond, setOpenSecond] = React.useState(false);

  const prefixesForMulti = PREFIXES.slice(0, 3);

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="p-3">
        <span>Тыс. - Тыс.</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="flex flex-col items-center">
        <div className="flex items-center gap-2 p-1">
          <PopoverForModal open={openFirst} onOpenChange={setOpenFirst}>
            <PopoverTriggerForModal asChild>
              <Button
                variant="outline"
                size="sm"
                className="w-fit justify-start whitespace-nowrap py-6"
              >
                {props.prefix.first ? props.prefix.first.label : "Префикс..."}
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
                    {props.prefix.first ? (
                      <span
                        className="text-muted-foreground hover:text-foreground my-1 flex cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
                        onClick={() =>
                          props.onSelectPrefix(undefined, true, "millennium")
                        }
                      >
                        <X className="h-5 w-5" /> Удалить
                      </span>
                    ) : null}
                    <ScrollArea type="always" classNameViewport="max-h-[260px]">
                      {prefixesForMulti.map((prefix, index) => {
                        const isActive =
                          props.prefix.first &&
                          prefix?.label === props.prefix.first.label;
                        // const isActive = false
                        return (
                          <CommandItem
                            key={index}
                            value={prefix.label}
                            className="h-fit w-full cursor-pointer justify-start px-2 py-2 text-left"
                            onSelect={() => {
                              props.onSelectPrefix(prefix, true, "millennium");
                              setOpenFirst(false);
                              setOpenSecond(false);
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
              placeholder={props.century.first}
              // placeholder={"1"}
              className="m-0 max-h-8 w-auto max-w-[4rem] overflow-visible truncate border-solid px-2 py-6 text-sm"
              onChange={(e) =>
                props.onChangeCentury(
                  Number(e.target.value),
                  true,
                  "millennium",
                )
              }
            />
          </div>
          <span className="whitespace-nowrap">тыс.</span>

          <span className="whitespace-nowrap">
            {Number(props.century.first) >= 0 ? "н.э." : "до н.э."}
          </span>
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
                {props.prefix.second ? props.prefix.second.label : "Префикс..."}
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
                    {props.prefix.second ? (
                      <span
                        className="text-muted-foreground hover:text-foreground my-1 flex cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
                        onClick={() =>
                          props.onSelectPrefix(undefined, false, "millennium")
                        }
                      >
                        <X className="h-5 w-5" /> Удалить
                      </span>
                    ) : null}
                    <ScrollArea type="always" classNameViewport="max-h-[260px]">
                      {prefixesForMulti.map((prefix, index) => {
                        const isActive =
                          props.prefix.second &&
                          prefix?.label === props.prefix.second.label;
                        // const isActive = false
                        return (
                          <CommandItem
                            key={index}
                            value={prefix.label}
                            className="h-fit w-full cursor-pointer justify-start px-2 py-2 text-left"
                            onSelect={() => {
                              props.onSelectPrefix(prefix, false, "millennium");
                              setOpenFirst(false);
                              setOpenSecond(false);
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
              placeholder={props.century.second}
              // placeholder={"1"}
              className="m-0 max-h-8 w-auto max-w-[4rem] overflow-visible truncate border-solid px-2 py-6 text-sm"
              onChange={(e) =>
                props.onChangeCentury(
                  Number(e.target.value),
                  false,
                  "millennium",
                )
              }
            />
          </div>
          <span className="whitespace-nowrap">тыс.</span>

          <span className="whitespace-nowrap">
            {Number(props.century.second) >= 0 ? "н.э." : "до н.э."}
          </span>
        </div>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
