"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Filter, Loader2, SearchX, X, XCircle } from "lucide-react";
import { 
    Badge, 
    Button, 
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Popover,
    PopoverContent,
    PopoverTrigger,
    ScrollArea,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type Item = {
  value: string,
  label: string,
  color?: string,
};

const badgeStyle = (color: string | undefined) => ({
  borderColor: `${color}20`,
  backgroundColor: `${color}30`,
  color,
});

export function MultiSelect({
  values,
  param,
  placeholder,
  className,
  badges = false,
  icon = false,
  side = "bottom",
  align = "start"
}: {
  values: Array<Item>,
  param: string,
  placeholder: string,
  className?: string,
  badges?: boolean,
  icon?: boolean,
  side?: "bottom" | "top" | "right" | "left",
  align?: "end" | "center" | "start"
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [items, _] = React.useState<Array<Item>>(values);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>("");
  const [isPendingSearch, startTransitionSearch] = React.useTransition();
  const [isPendingRouter, startTransitionRouter] = React.useTransition();

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const currentParams = searchParams.get(param) ?? undefined

  let selectedValues = [] as Item[]
  values.forEach(option => {
    if (currentParams?.split('_').includes(option.value.toString())) {
      selectedValues = [...selectedValues, option]
    }
  })

  function handleSearch(input: string) {
    startTransitionSearch(() => {
      setInputValue(input);
    });
  }

  const clearItems = () => {
    handleSelectedParams([]);
    inputRef.current?.blur();
    handleSearch("")
  };

  const toggleItem = (item: Item) => {
    let newValues = [] as Item[]

    // includes() doesn't work with object, so we do this:
    const contains = selectedValues.some(elem => elem.value === item.value);

    contains
        ? newValues = selectedValues.filter((elem) =>  elem.value !== item.value)
        : newValues = [...selectedValues, item]

    handleSelectedParams(newValues)
    // inputRef.current?.focus();
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
    setOpenCombobox(value);
  };

  const handleSelectedParams = React.useCallback(
    (newValues: Array<Item>) => {

      const params = new URLSearchParams(window.location.search);

      let values = [] as string[]

      // reset pagination(page) to prevent zero results
      params.set("page", '1')

      if (newValues.length > 0) {

        newValues.forEach(option => {
            values = [...values, option.value.toString()]
        })

        params.set(param, values.join('_'));

      } else {

        params.delete(param);
      
      }

      startTransitionRouter(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [param, pathname, router],
  );

  function TriggerButton() {
    return(
      <>
        {isPendingRouter 
          ? <Loader2 className='animate-spin' />
          : (
            <span className="truncate text-muted-foreground">
              {selectedValues.length === 0 && placeholder}
              {selectedValues.length === 1 && selectedValues[0].label}
              {selectedValues.length >= 2 &&
                `${selectedValues.length} Выбрано`}
            </span>
          ) 
        }
        {(selectedValues.length > 0) 
          ? <X className="ml-2 h-4 w-4 shrink-0 opacity-50 hover:opacity-100 hover:scale-125 z-50 transition-all" onClick={clearItems}/>
          : <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        }
      </>
    )
  }

  function TriggerIcon() {
    return(
      <>
        {isPendingRouter 
          ? <Loader2 className='animate-spin w-12' />
          : (
            <TooltipProvider>
              <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                  <div className="flex p-2">
                    <Filter />
                    <span className="text-muted-foreground text-sm">
                      {selectedValues.length > 0 && `${selectedValues.length}`}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-accent text-foreground font-OpenSans font-normal cursor-help">
                  <p>{placeholder}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        }
      </>
    )
  }

  return (
    <div className={cn("max-w-[280px] relative", className)}>
      {icon && (selectedValues.length > 0)
        ? 
          <span 
            className="absolute top-2 ml-[50px] md:text-xs text-[11px] text-muted-foreground flex flex-col items-center cursor-pointer underline hover:text-foreground hover:scale-125 transition-all" 
            onClick={clearItems}
          >
            <X className="h-5 w-5"/>
          </span>
        : null
      }
      <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <PopoverTrigger asChild>
          <Button
            variant={icon ? "ghost" : "outline"}
            role="combobox"
            aria-expanded={openCombobox}
            className={cn(
              "justify-between text-foreground relative",
              icon && "p-0"
            )}
          >
            {icon 
              ? <TriggerIcon />
              : <TriggerButton />
            }
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 font-Inter md:min-w-[400px]" side={side} align={align}>
          <Command loop>
            <div className='relative'>
              <CommandInput
                ref={inputRef}
                className={cn("w-5/6",
                  isPendingSearch 
                    ? "cursor-wait"
                    : "cursor-text"
                )}
                placeholder="Поиск..."
                value={inputValue}
                onValueChange={(input) => handleSearch(input)}
              />
              {isPendingSearch 
                ? (
                    <div className="absolute top-[10px] right-2">
                      <Loader2 className='animate-spin' />
                    </div>
                  ) 
                : inputValue.length > 0
                    ? (
                        <X 
                          className="absolute top-[14px] right-3 h-4 w-4 opacity-50 hover:opacity-100 hover:scale-125 z-50 transition-all cursor-pointer" 
                          onClick={() => handleSearch("")}
                        />
                      )
                    : null 
                }
            </div>
            <CommandList>
                <CommandEmpty>
                    <div className='flex flex-col items-center text-center gap-1'>
                        <SearchX size={20} />
                        <h2 className='font-OpenSans text-sm font-medium'>
                            Не найдено
                        </h2>
                    </div>
                </CommandEmpty>
                <CommandGroup>
                  <ScrollArea className="h-[240px]">
                    {items.map((item) => {
                        // includes() doesn't work with object, so we do this:
                        const isActive = selectedValues.some(elem => elem.value === item.value);
                        return (
                          <CommandItem
                            key={item.value}
                            value={item.value}
                            className={cn(
                              (isPendingRouter || isPendingSearch)
                                ? "opacity-30 cursor-wait"
                                : "opacity-100 cursor-pointer"
                            )}
                            onSelect={() => toggleItem(item)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                isActive ? "opacity-100" : "opacity-0"
                              )}
                            />
                            <div className="flex-1">{item.label}</div>
                            {/* <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: item.color }}
                            /> */}
                          </CommandItem>
                        );
                    })}
                  </ScrollArea>              
                </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {badges ? (
        <div className="relative h-fit max-h-40 overflow-y-auto mt-3">
          {selectedValues.length > 1 ? selectedValues.map((item) => (
            <Badge
              key={item.value}
              variant="outline"
              style={badgeStyle(item.color)}
              className="mr-2 mb-2"
            >
              {item.label} <XCircle className="ml-1 w-5 h-5 cursor-pointer" onClick={() => toggleItem(item)} />
            </Badge>
          )) : null}
        </div>
      ): null}
    </div>
  );
}