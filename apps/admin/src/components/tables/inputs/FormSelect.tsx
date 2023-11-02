"use client";

import * as React from "react";
import { ChevronsUpDown, CircleDot, Loader2, SearchX, X } from "lucide-react";
import { 
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
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";
import { useFormContext } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

export type Item = {
  id: string,
  displayName: string,
};

export function FormSelect({
  itemsData,
  formValueName,
  className,
  side = "bottom",
  align = "start",
  isLoading,
  haveDelete = true,
  onClick
}: {
  itemsData: Array<Item> | null,
  formValueName: string,
  className?: string,
  side?: "bottom" | "top" | "right" | "left",
  align?: "end" | "center" | "start",
  isLoading?: boolean,
  haveDelete?: boolean,
  onClick?: () => void
}) {

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [items, setItems] = React.useState<Array<Item> | null>([]);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState<string>("");
  const [isPendingSearch, startTransitionSearch] = React.useTransition();

  const form = useFormContext();
  const selected = form.getValues(formValueName) as { id: string, displayName: string } | null

  React.useEffect(() => {
    setItems(itemsData)
  }, [itemsData])

  function handleSearch(input: string) {
    startTransitionSearch(() => {
      setInputSearch(input);
    });
  }

  const clearSelect = () => {
    form.setValue(formValueName, null, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
    inputRef.current?.blur();
    handleSearch("")
    setOpenCombobox(false)
  };

  const toggleItem = (item: Item) => {
    handleSelected(item)
    setOpenCombobox(false)
  };

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
    setOpenCombobox(value);
  };

  const handleSelected = React.useCallback(
    (newValue: Item) => {
      form.setValue(formValueName, { id: newValue?.id, displayName: newValue?.displayName }, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
    },
    [form, formValueName],
  );

  return (
    <div className={cn("max-w-[280px] relative", className)}>
      <Popover open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <div className="flex gap-0.5 items-center">
          <PopoverTrigger asChild onClick={onClick}>
            <Button
              variant={form.getFieldState(formValueName).isDirty ? "outline" : "ghost"}
              role="combobox"
              aria-expanded={openCombobox}
              className={cn(
                "justify-between text-foreground font-normal text-xs text-left relative px-2 py-8 w-full h-fit",
                form.getFieldState(formValueName).invalid 
                  ? "border-red-600" 
                  : form.getFieldState(formValueName).isDirty ? "border-green-500" : ""
              )}
            >
                {selected 
                  ? (selected.displayName.length > 0) 
                    ? selected.displayName
                    : `id: ${selected.id}` 
                  : "__"
                }
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
        </div>
        <PopoverContent 
          className={"p-0 font-Inter"}
          side={side} 
          align={align}
        >
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
                value={inputSearch}
                onValueChange={(input) => handleSearch(input)}
              />
              {!!selected && haveDelete
                ? 
                  <span 
                    className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
                    onClick={clearSelect}
                  >
                    <X className="h-5 w-5"/> Удалить
                  </span>
                : null
              }
              {isPendingSearch 
                ? (
                    <div className="absolute top-[10px] right-2">
                      <Loader2 className='animate-spin' />
                    </div>
                  ) 
                : inputSearch.length > 0
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
                {!isLoading
                  ? (
                    <div className='flex flex-col items-center text-center gap-1'>          
                      <SearchX size={20} />
                      <h2 className='font-OpenSans text-sm font-medium'>
                        Не найдено
                      </h2>
                    </div>
                  )
                  : null
                }
              </CommandEmpty>
              <CommandGroup>
                {
                    isLoading 
                    ? <Loader2 className='animate-spin w-12 h-12 mx-auto mb-6' />
                    : (
                        <ScrollArea type="always" classNameViewport="max-h-[220px]">
                            {
                              items?.map((item, index) => {
                                const isActive = selected?.id === item?.id
                                return (
                                  <CommandItem
                                    key={index}
                                    value={item?.displayName}
                                    className={cn(
                                      (isPendingSearch)
                                        ? "opacity-30 cursor-wait"
                                        : "opacity-100 cursor-pointer"
                                    )}
                                    onSelect={() => toggleItem(item)}
                                  >
                                    <CircleDot
                                      className={cn(
                                        "mr-2 h-4 w-4",
                                        isActive ? "opacity-100" : "opacity-0"
                                      )}
                                    />
                                    <div className="flex-1">{item?.displayName}</div>
                                  </CommandItem>
                                );
                              })
                            }
                        </ScrollArea>
                    )
                }
              </CommandGroup> 
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <ErrorMessage
        errors={form.formState.errors}
        name={formValueName}
        render={({ message }) => <p className="text-destructive text-sm font-medium">{message}</p>}
      />
    </div>
  );
}