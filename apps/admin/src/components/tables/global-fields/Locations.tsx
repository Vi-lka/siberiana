"use client"

import type { LocationEnum } from '@siberiana/schemas'
import React from 'react'
import ErrorToast from '~/components/errors/ErrorToast'
import { useLocationsQuery } from '~/lib/queries/client/global'
import { Button, Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, ScrollArea } from '@siberiana/ui'
import { ChevronsUpDown, CircleDot, Loader2, SearchX, X } from 'lucide-react'
import { cn } from '@siberiana/ui/src/lib/utils'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'

type Location = {
  id: string;
  type: LocationEnum;
  displayName: string;
}

export default function Locations({ 
  defaultLocation,
  formValueName,
  className,
}: { 
  defaultLocation: Location | null,
  formValueName: string,
  className?: string,
}) {

  const [openCombobox, setOpenCombobox] = React.useState(false);
  // const [open, setOpen] = React.useState(false)

  const defaultLable = !!defaultLocation 
    ? defaultLocation.displayName.length > 0
      ? defaultLocation.displayName
      : `id: ${defaultLocation.id}`
    : "__"

  const form = useFormContext();
  const selected = form.getValues(formValueName) as Location | null

  const clearSelect = () => {
    form.setValue(formValueName, null, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
    setOpenCombobox(false)
  };

  const handleSelected = React.useCallback(
    (newValue: Location) => {
      form.setValue(formValueName, newValue, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
      setOpenCombobox(false)
    },
    [form, formValueName],
  );

  const { data, isFetching, isPending, isError, error } = useLocationsQuery() 
  if (isError && !!error){
    return (
      <>
        {defaultLable}
        <ErrorToast
          error={error.message}
          place="Локация"
        />
      </>
    );
  }
  
  const countriesData = data && data.countries.totalCount > 0
    ? data.countries.edges.map(({ node }) => {
      const id = node.id
      const displayName = node.displayName
      const type = "country"
      return { id, displayName, type } as Location
    })
    : null
  const regionsData = data && data.regions.totalCount > 0
    ? data.regions.edges.map(({ node }) => {
      const id = node.id
      const displayName = node.displayName
      const type = "region"
      return { id, displayName, type } as Location
    })
    : null
  const districtsData = data && data.districts.totalCount > 0
    ? data.districts.edges.map(({ node }) => {
      const id = node.id
      const displayName = node.displayName
      const type = "district"
      return { id, displayName, type } as Location
    })
    : null
  const settlementsData = data && data.settlements.totalCount > 0
    ? data.settlements.edges.map(({ node }) => {
      const id = node.id
      const displayName = node.displayName
      const type = "settlement"
      return { id, displayName, type } as Location
    })
    : null
  const locationsData = data && data.locations.totalCount > 0
    ? data.locations.edges.map(({ node }) => {
      const id = node.id
      const displayName = node.displayName
      const type = "location"
      return { id, displayName, type } as Location
    })
    : null

  const customDirty = defaultLocation?.id !== selected?.id

  return (
    <div className={cn("h-full w-full", className)}>
      <DropdownMenu open={openCombobox} onOpenChange={setOpenCombobox}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={(form.getFieldState(formValueName).isDirty || customDirty) ? "outline" : "ghost"}
            role="combobox"
            aria-expanded={openCombobox}
            className={cn(
              "justify-between text-foreground font-normal text-xs text-left relative px-2 py-8 w-full h-fit",
              form.getFieldState(formValueName).invalid 
                ? "border-red-600" 
                : (form.getFieldState(formValueName).isDirty || customDirty) ? "border-green-500" : ""
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
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' align="start" className="w-[200px] font-Inter">
          <DropdownMenuLabel>Выберите:</DropdownMenuLabel>
          <DropdownMenuSeparator/>
          {!!selected
            ? 
              <span 
                className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
                onClick={clearSelect}
              >
                <X className="h-5 w-5"/> Удалить
              </span>
            : null
          }
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
      <ErrorMessage
        errors={form.formState.errors}
        name={formValueName}
        render={({ message }) => <p className="text-destructive text-sm font-medium">{message}</p>}
      />
    </div>
  )
}


function DropdownItem(props: {
  data: Location[] | null,
  selected: Location | null,
  isLoading: boolean,
  handleSelected: (newValue: Location) => void,
  children: React.ReactNode,
}) {
  const [inputSearch, setInputSearch] = React.useState<string>("");
  const [isPendingSearch, startTransitionSearch] = React.useTransition();

  function handleSearch(input: string) {
    startTransitionSearch(() => {
      setInputSearch(input);
    });
  }

  const containsSelected = (!!props.data && props.data.some(elem => elem.id === props.selected?.id))

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <CircleDot
          className={cn(
            "mr-2 h-4 w-4",
            containsSelected ? "opacity-100" : "opacity-0"
          )}
        />
        {props.children}
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="p-0">
        <Command loop>
          <div className='relative'>
            <CommandInput
              className={cn("w-5/6",
              isPendingSearch 
                  ? "cursor-wait"
                  : "cursor-text"
              )}
              placeholder="Поиск..."
              value={inputSearch}
              onValueChange={(input) => handleSearch(input)}
            />
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
              {!props.isLoading
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
            {props.isLoading
              ? <Loader2 className='animate-spin w-12 h-12 mx-auto mb-6 mt-6' />
              : (
                <ScrollArea type="always" classNameViewport="max-h-[220px]">
                  {
                    props.data?.map((item, index) => {
                      const isActive = props.selected?.id === item.id
                      return (
                        <CommandItem
                          key={index}
                          value={item.id}
                          className={cn(
                            (isPendingSearch)
                              ? "opacity-30 cursor-wait"
                              : "opacity-100 cursor-pointer"
                          )}
                          onSelect={() => props.handleSelected(item)}
                        >
                          <CircleDot
                            className={cn(
                              "mr-2 h-4 w-4",
                              isActive ? "opacity-100" : "opacity-0"
                            )}
                          />
                          <div className="flex-1">
                            {item.displayName.length > 0
                              ? item.displayName
                              : `id: ${item.id}` 
                            }
                          </div>
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
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  )
}
