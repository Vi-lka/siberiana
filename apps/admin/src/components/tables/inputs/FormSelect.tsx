"use client";

import * as React from "react";
import { ErrorMessage } from "@hookform/error-message";
import {
  ChevronsUpDown,
  CircleDot,
  Loader2,
  RotateCcw,
  SearchX,
  X,
} from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { Item } from "@siberiana/schemas";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  PopoverContentForModal,
  PopoverForModal,
  PopoverTriggerForModal,
  ScrollArea,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export function FormSelect({
  itemsData,
  defaultValue,
  formValueName,
  className,
  side = "bottom",
  align = "start",
  isLoading,
  haveDelete = true,
  variant = "padding",
  onClick,
}: {
  itemsData: Array<Item> | null;
  defaultValue?: Item | null;
  formValueName: string;
  className?: string;
  side?: "bottom" | "top" | "right" | "left";
  align?: "end" | "center" | "start";
  isLoading?: boolean;
  haveDelete?: boolean;
  variant?: "padding" | "nopadding";
  onClick?: () => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [items, setItems] = React.useState<Array<Item> | null>([]);
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [inputSearch, setInputSearch] = React.useState<string>("");
  const [isPendingSearch, startTransitionSearch] = React.useTransition();

  const form = useFormContext();
  const selected = form.getValues(formValueName) as Item | null;

  React.useEffect(() => {
    setItems(itemsData);
  }, [itemsData]);

  function handleSearch(input: string) {
    startTransitionSearch(() => {
      setInputSearch(input);
    });
  }

  const onComboboxOpenChange = (value: boolean) => {
    inputRef.current?.blur(); // HACK: otherwise, would scroll automatically to the bottom of page
    setOpenCombobox(value);
  };

  const clearSelect = () => {
    form.setValue(formValueName, null, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    inputRef.current?.blur();
    handleSearch("");
    setOpenCombobox(false);
  };

  const handleSelected = React.useCallback(
    (newValue: Item) => {
      form.setValue(formValueName, newValue, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
      setOpenCombobox(false);
    },
    [form, formValueName],
  );

  const customDirty = defaultValue?.id !== selected?.id;

  return (
    <div className={cn("relative max-w-[280px]", className)}>
      <PopoverForModal open={openCombobox} onOpenChange={onComboboxOpenChange}>
        <div className="flex items-center gap-0.5">
          <PopoverTriggerForModal asChild onClick={onClick}>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openCombobox}
              className={cn(
                "text-foreground relative h-fit w-full justify-between px-2 text-left text-xs font-normal border-transparent",
                variant === "padding" ? "py-8" : "py-3",
                form.getFieldState(formValueName).invalid
                  ? "border-red-600"
                  : form.getFieldState(formValueName).isDirty || customDirty
                  ? "border-green-500"
                  : "",
              )}
            >
              {selected
                ? selected.displayName.length > 0
                  ? selected.displayName
                  : `id: ${selected.id}`
                : "__"}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTriggerForModal>
        </div>
        <PopoverContentForModal
          className={"font-Inter p-0"}
          side={side}
          align={align}
        >
          <Command loop>
            <div className="relative">
              <CommandInput
                ref={inputRef}
                className={cn(
                  "w-5/6",
                  isPendingSearch ? "cursor-wait" : "cursor-text",
                )}
                placeholder="Поиск..."
                value={inputSearch}
                onValueChange={(input) => handleSearch(input)}
              />
              {isPendingSearch ? (
                <div className="absolute right-2 top-[10px]">
                  <Loader2 className="animate-spin" />
                </div>
              ) : inputSearch.length > 0 ? (
                <X
                  className="absolute right-3 top-[14px] z-50 h-4 w-4 cursor-pointer opacity-50 transition-all hover:scale-125 hover:opacity-100"
                  onClick={() => handleSearch("")}
                />
              ) : null}
              {!!selected && haveDelete ? (
                <span
                  className="text-muted-foreground hover:text-foreground my-1 flex cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
                  onClick={clearSelect}
                >
                  <X className="h-5 w-5" /> Удалить
                </span>
              ) : null}
            </div>
            <CommandList>
              <CommandEmpty>
                {!isLoading ? (
                  <div className="flex flex-col items-center gap-1 text-center">
                    <SearchX size={20} />
                    <h2 className="font-OpenSans text-sm font-medium">
                      Не найдено
                    </h2>
                  </div>
                ) : null}
              </CommandEmpty>
              <CommandGroup>
                {isLoading ? (
                  <Loader2 className="mx-auto mb-6 h-12 w-12 animate-spin" />
                ) : (
                  <ScrollArea type="always" classNameViewport="max-h-[220px]">
                    {items?.map((item, index) => {
                      const isActive = selected?.id === item?.id;
                      return (
                        <CommandItem
                          key={index}
                          value={item?.displayName}
                          className={cn(
                            isPendingSearch
                              ? "cursor-wait opacity-30"
                              : "cursor-pointer opacity-100",
                          )}
                          onSelect={() => handleSelected(item)}
                        >
                          <CircleDot
                            className={cn(
                              "mr-2 h-4 w-4",
                              isActive ? "opacity-100" : "opacity-0",
                            )}
                          />
                          <div className="flex-1">{item?.displayName}</div>
                        </CommandItem>
                      );
                    })}
                  </ScrollArea>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContentForModal>
      </PopoverForModal>
      {form.getFieldState(formValueName).isDirty || customDirty ? (
        <RotateCcw
          className="text-muted-foreground hover:text-foreground absolute right-1 top-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
          onClick={() =>
            form.setValue(formValueName, defaultValue, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            })
          }
        />
      ) : null}
      <ErrorMessage
        errors={form.formState.errors}
        name={formValueName}
        render={({ message }) => (
          <p className="text-destructive text-sm font-medium">{message}</p>
        )}
      />
    </div>
  );
}
