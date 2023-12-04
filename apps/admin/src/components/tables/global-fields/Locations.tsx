"use client";

import React from "react";
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

import type { LocationEnum } from "@siberiana/schemas";
import {
  Button,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  ScrollArea,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import ErrorToast from "~/components/errors/ErrorToast";
import { useLocationsQuery } from "~/lib/queries/client/global";

type Location = {
  id: string;
  type: LocationEnum;
  displayName: string;
};

export default function Locations({
  defaultLocation,
  formValueName,
  className,
}: {
  defaultLocation: Location | null;
  formValueName: string;
  className?: string;
}) {
  const [openCombobox, setOpenCombobox] = React.useState(false);

  const defaultLable = !!defaultLocation
    ? defaultLocation.displayName.length > 0
      ? defaultLocation.displayName
      : `id: ${defaultLocation.id}`
    : "__";

  const form = useFormContext();
  const selected = form.getValues(formValueName) as Location | null;

  const clearSelect = () => {
    form.setValue(formValueName, null, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    setOpenCombobox(false);
  };

  const handleSelected = React.useCallback(
    (newValue: Location) => {
      form.setValue(formValueName, newValue, {
        shouldDirty: true,
        shouldValidate: true,
        shouldTouch: true,
      });
      setOpenCombobox(false);
    },
    [form, formValueName],
  );

  const { data, isFetching, isPending, isError, error } = useLocationsQuery();
  if (isError && !!error) {
    return (
      <>
        {defaultLable}
        <ErrorToast error={error.message} place="Локация" />
      </>
    );
  }

  const countriesData =
    data && data.countries.totalCount > 0
      ? data.countries.edges.map(({ node }) => {
          const id = node.id;
          const displayName = node.displayName;
          const type = "country";
          return { id, displayName, type } as Location;
        })
      : null;
  const regionsData =
    data && data.regions.totalCount > 0
      ? data.regions.edges.map(({ node }) => {
          const id = node.id;
          const displayName = node.displayName;
          const type = "region";
          return { id, displayName, type } as Location;
        })
      : null;
  const districtsData =
    data && data.districts.totalCount > 0
      ? data.districts.edges.map(({ node }) => {
          const id = node.id;
          const displayName = node.displayName;
          const type = "district";
          return { id, displayName, type } as Location;
        })
      : null;
  const settlementsData =
    data && data.settlements.totalCount > 0
      ? data.settlements.edges.map(({ node }) => {
          const id = node.id;
          const displayName = node.displayName;
          const type = "settlement";
          return { id, displayName, type } as Location;
        })
      : null;
  const locationsData =
    data && data.locations.totalCount > 0
      ? data.locations.edges.map(({ node }) => {
          const id = node.id;
          const displayName = node.displayName;
          const type = "location";
          return { id, displayName, type } as Location;
        })
      : null;

  const customDirty = defaultLocation?.id !== selected?.id;

  return (
    <div className={cn("relative h-full w-full", className)}>
      <DropdownMenu open={openCombobox} onOpenChange={setOpenCombobox}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className={cn(
              "text-foreground relative h-fit w-full justify-between px-2 py-8 text-left text-xs font-normal border-transparent",
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
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          className="font-Inter w-[200px]"
        >
          <DropdownMenuLabel>Выберите:</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {!!selected ? (
            <span
              className="text-muted-foreground hover:text-foreground my-1 flex cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
              onClick={clearSelect}
            >
              <X className="h-5 w-5" /> Удалить
            </span>
          ) : null}
          <DropdownMenuGroup>
            <DropdownItem
              data={countriesData}
              selected={selected}
              isLoading={isFetching || isPending}
              handleSelected={handleSelected}
            >
              <span>Страна</span>
            </DropdownItem>
            <DropdownItem
              data={regionsData}
              selected={selected}
              isLoading={isFetching || isPending}
              handleSelected={handleSelected}
            >
              <span>Регион</span>
            </DropdownItem>
            <DropdownItem
              data={districtsData}
              selected={selected}
              isLoading={isFetching || isPending}
              handleSelected={handleSelected}
            >
              <span>Район</span>
            </DropdownItem>
            <DropdownItem
              data={settlementsData}
              selected={selected}
              isLoading={isFetching || isPending}
              handleSelected={handleSelected}
            >
              <span>Нас. Пункт</span>
            </DropdownItem>
            <DropdownItem
              data={locationsData}
              selected={selected}
              isLoading={isFetching || isPending}
              handleSelected={handleSelected}
            >
              <span>Место/Локация</span>
            </DropdownItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {form.getFieldState(formValueName).isDirty || customDirty ? (
        <RotateCcw
          className="text-muted-foreground hover:text-foreground absolute right-1 top-1 z-50 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
          onClick={() => {
            form.setValue(formValueName, defaultLocation, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
          }}
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

function DropdownItem(props: {
  data: Location[] | null;
  selected: Location | null;
  isLoading: boolean;
  handleSelected: (newValue: Location) => void;
  children: React.ReactNode;
}) {
  const [inputSearch, setInputSearch] = React.useState<string>("");
  const [isPendingSearch, startTransitionSearch] = React.useTransition();

  function handleSearch(input: string) {
    startTransitionSearch(() => {
      setInputSearch(input);
    });
  }

  const containsSelected =
    !!props.data && props.data.some((elem) => elem.id === props.selected?.id);

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <CircleDot
          className={cn(
            "mr-2 h-4 w-4",
            containsSelected ? "opacity-100" : "opacity-0",
          )}
        />
        {props.children}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="p-0">
        <Command loop>
          <div className="relative">
            <CommandInput
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
          </div>
          <CommandList>
            <CommandEmpty>
              {!props.isLoading ? (
                <div className="flex flex-col items-center gap-1 text-center">
                  <SearchX size={20} />
                  <h2 className="font-OpenSans text-sm font-medium">
                    Не найдено
                  </h2>
                </div>
              ) : null}
            </CommandEmpty>
            <CommandGroup>
              {props.isLoading ? (
                <Loader2 className="mx-auto mb-6 mt-6 h-12 w-12 animate-spin" />
              ) : (
                <ScrollArea type="always" classNameViewport="max-h-[220px]">
                  {props.data?.map((item, index) => {
                    const isActive = props.selected?.id === item.id;
                    return (
                      <CommandItem
                        key={index}
                        value={item.displayName}
                        className={cn(
                          isPendingSearch
                            ? "cursor-wait opacity-30"
                            : "cursor-pointer opacity-100",
                        )}
                        onSelect={() => props.handleSelected(item)}
                      >
                        <CircleDot
                          className={cn(
                            "mr-2 h-4 w-4",
                            isActive ? "opacity-100" : "opacity-0",
                          )}
                        />
                        <div className="flex-1">
                          {item.displayName.length > 0
                            ? item.displayName
                            : `id: ${item.id}`}
                        </div>
                      </CommandItem>
                    );
                  })}
                </ScrollArea>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
