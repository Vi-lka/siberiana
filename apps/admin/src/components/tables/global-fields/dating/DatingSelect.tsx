"use client"

import React from 'react'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, ScrollArea } from '@siberiana/ui'
import { ChevronsUpDown, Loader2, X } from 'lucide-react'
import { cn } from '@siberiana/ui/src/lib/utils'
import { useFormContext } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message'
import type { Dating } from "@siberiana/schemas"
import type { Prefix } from '~/lib/utils/getDating';
import { PREFIXES, getDating } from '~/lib/utils/getDating'
import OneYear from './OneYear'
import TwoYears from './TwoYears'
import Era from './Era'
import Century from './Century'

export default function DatingSelect({ 
  formValueName,
  className,
}: { 
  formValueName: string,
  className?: string,
}) {

  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const form = useFormContext();
  const selected = form.getValues(formValueName) as Dating
  const selectedLable = getDating(selected.datingStart, selected.datingEnd)

  const [values, setValues] = React.useState(selected);

  const zeroObj = {
    datingStart: 0,
    datingEnd: 0
  }

  const [isAD, setIsAD] = React.useState(selected.datingStart >= 0 ? true : false);

  const selectedCentury = 
    Math.abs(Math.abs(selected.datingStart) - Math.abs(selected.datingEnd)) <= 99
      ? isAD ? Math.floor(selected.datingEnd / 100).toString() : Math.floor(selected.datingStart / 100).toString()
      : ''

  const selectedPrefix = PREFIXES.find((prefix) => 
    prefix.start === (values.datingStart % 100).toString() 
    && 
    prefix.end === (values.datingEnd % 100).toString() 
  );
  
  const [century, setCentury] = React.useState<string>(selectedCentury);
  const [prefix, setPrefix] = React.useState<Prefix | undefined>(selectedPrefix);

  const clear = () => {
    setValues(zeroObj)
    setCentury('')
    setPrefix(undefined)
    form.setValue(formValueName, zeroObj, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
    setOpenCombobox(false)
  };

  const handleNewValue = React.useCallback(
    (newValue: Dating) => {
      startTransition(() => {
        form.setValue(formValueName, newValue, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
      })
      setOpenCombobox(false)
    },
    [form, formValueName]
  );

  const handleOpen = (open: boolean) => {
    setOpenCombobox(open)
    if (!open) handleNewValue(values)
  }

  const onSelectPrefix = (prefix: Prefix | undefined) => {
    setPrefix(prefix)

    const start = Number(century) < 11 
      ? "0"+(Number(century) - 1).toString() 
      : (Number(century) - 1).toString()

    if (prefix) {
      const valueStart = isAD ? Number(start + prefix.start) : -Number(start + prefix.start)
      const valueEnd = isAD ? Number(start + prefix.end) : -Number(start + prefix.end)
      setValues({
        datingStart: valueStart,
        datingEnd: valueEnd
      })
    }
  }

  const onChangeCentury = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCentury(e.target.value)

    const start = Number(e.target.value) < 11 
      ? "0"+(Number(e.target.value) - 1).toString() 
      : (Number(e.target.value) - 1).toString()

    if (prefix) {
      const valueStart = isAD ? Number(start + prefix.start) : -Number(start + prefix.start)
      const valueEnd = isAD ? Number(start + prefix.end) : -Number(start + prefix.end)
      setValues({
        datingStart: valueStart,
        datingEnd: valueEnd
      })
    } else {
      const valueStart = isAD ? Number(start + "01") : -Number(start + "01")
      const valueEnd = isAD ? Number(e.target.value + "00") : -Number(e.target.value + "00")
      setValues({
        datingStart: valueStart,
        datingEnd: valueEnd
      })
    }
  }

  const onIsADChange = (pressed: boolean) => {
    setIsAD(pressed)
    setValues({
      datingStart: -values.datingStart,
      datingEnd: -values.datingEnd
    })
  }

  return (
    <div className={cn("h-full w-full", className)}>
      <DropdownMenu open={openCombobox} onOpenChange={handleOpen}>
        <DropdownMenuTrigger asChild>
          <Button 
            variant={form.getFieldState(formValueName).isDirty ? "outline" : "ghost"}
            role="combobox"
            aria-expanded={openCombobox}
            className={cn(
              "justify-between text-foreground font-normal text-xs text-left relative px-2 py-8 w-max h-fit max-w-[12rem]",
              form.getFieldState(formValueName).invalid 
                ? "border-red-600" 
                : form.getFieldState(formValueName).isDirty ? "border-green-500" : ""
            )}
          >
            {isPending 
                ? <Loader2 className='animate-spin w-5 h-5' /> 
                : (<>
                    {selectedLable}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />   
                </>)
            }
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side='bottom' align="start" className="w-[200px] font-Inter">
          <DropdownMenuLabel className='flex items-center justify-between'>
            Выберите:
            {isPending ? <Loader2 className='animate-spin w-5 h-5' /> : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator/>
          {isPending 
            ? <Loader2 className='animate-spin w-8 h-8' />
            : (<>
                {!(selected.datingStart === 0 && selected.datingEnd === 0)
                  ? 
                    <span 
                      className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
                      onClick={clear}
                    >
                      <X className="h-5 w-5"/> Удалить
                    </span>
                  : null
                }
                <ScrollArea type="always" classNameViewport="max-h-72">
                    <DropdownMenuGroup>
                      <OneYear
                        title='XXXX год'
                        placeholder={values.datingStart.toString()}
                        postfix='год'
                        onChange={(e) => {
                          setValues({
                            datingStart: Number(e.target.value),
                            datingEnd: 0,
                          })
                        }}
                      />
                      <OneYear
                        title='около XXXX года'
                        placeholder={values.datingStart.toString()}
                        prefix='около'
                        postfix='года'
                        onChange={(e) => {
                          setValues({
                            datingStart: Number(e.target.value),
                            datingEnd: Number(e.target.value),
                          })
                        }}
                      />
                      <OneYear
                        title='не ранее XXXX года'
                        placeholder={values.datingStart.toString()}
                        prefix='не ранее'
                        postfix='года'
                        onChange={(e) => {
                          setValues({
                            datingStart: Number(e.target.value),
                            datingEnd: 999999,
                          })
                        }}
                      />
                      <OneYear
                        title='XXXX-e годы'
                        placeholder={`${Math.floor(values.datingStart/10)*10}`}
                        postfix='-е годы'
                        onChange={(e) => {
                          setValues({
                            datingStart: Math.floor(Number(e.target.value)/10)*10,
                            datingEnd: Math.floor(Number(e.target.value)/10)*10 + 9,
                          })
                        }}
                      />
                      <TwoYears
                        id='yy'
                        title='XXXX-XXXX гг.'
                        placeholderStart={values.datingStart.toString()}
                        placeholderEnd={values.datingEnd.toString()}
                        postfix='гг.'
                        onChangeStart={(e) => {
                          setValues({
                            ...values,
                            datingStart: Number(e.target.value)
                          })
                        }}
                        onChangeEnd={(e) => {
                          setValues({
                            ...values,
                            datingEnd: Number(e.target.value)
                          })
                        }}
                      />
                      <TwoYears
                        id='yy-e'
                        title='XXXX-XXXX-e годы'
                        placeholderStart={`${Math.floor(values.datingStart/10)*10}`}
                        placeholderEnd={`${Math.floor(values.datingEnd/10)*10}`}
                        postfix='-е годы'
                        onChangeStart={(e) => {
                          setValues({
                            ...values,
                            datingStart: Math.floor(Number(e.target.value)/10)*10,
                          })
                        }}
                        onChangeEnd={(e) => {
                          setValues({
                            ...values,
                            datingEnd: Math.floor(Number(e.target.value)/10)*10+9,
                          })
                        }}
                      />
                      <Century 
                        prefix={prefix}
                        century={century}
                        isAD={isAD}
                        onSelectPrefix={onSelectPrefix}
                        onChangeCentury={onChangeCentury}
                        onIsADChange={onIsADChange}
                      />
                      <Era
                        selected={selected}
                        handleNewValue={(newValue) => {
                          setValues({
                            datingStart: newValue.datingStart,
                            datingEnd: newValue.datingEnd,
                          })
                          handleNewValue(newValue)
                        }}
                      />
                    </DropdownMenuGroup>
                </ScrollArea>
            </>)
          }
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