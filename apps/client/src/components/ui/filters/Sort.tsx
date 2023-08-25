"use client"

import type { SortDataType, SortDictType } from '@siberiana/schemas'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Separator } from '@siberiana/ui'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import ButtonComponent from '../ButtonComponent'

export default function Sort({ 
    dict,
    data,
    defaultValue,
    side = "bottom",
    align = "end"
}: {
    dict: SortDictType,
    data: SortDataType[],
    defaultValue?: string,
    side?: "bottom" | "top" | "right" | "left",
    align?: "end" | "center" | "start"
}) {

  const [isPending, startTransition] = React.useTransition()

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const sort = searchParams.get('sort') ?? undefined

  const handleSortParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set("sort", value);
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        params.delete("sort");
      }
    },
    [pathname, router],
  );

  if (isPending) return <Loader2 className='animate-spin w-5 h-10' /> 

  return (
    <Select
      defaultValue={defaultValue}
      value={sort}
      onValueChange={handleSortParams}
    >
      <div className="flex">
        <SelectTrigger className="w-fit border-none font-Inter">
          <SelectValue placeholder={dict.placeholder} />
        </SelectTrigger>
      </div>
      <SelectContent side={side} align={align}>
        {data.map((elem, index) => (
          elem.val 
            ? (
              <SelectItem 
                key={index} 
                value={`${elem.val}`} 
                className='font-Inter cursor-pointer'
                // Prevent propagation: https://github.com/radix-ui/primitives/issues/1658#issuecomment-1664079551
                ref={(ref) => {
                  if (!ref) return;
                  ref.ontouchstart = (e) => {
                    e.preventDefault();
                  }
                }}
              >
                {elem.text}
              </SelectItem>
            ) 
            : <Separator key={index} className='my-1' />
        ))}
        {sort && (sort !== defaultValue) 
          ? (
            <ButtonComponent 
                className='w-full h-8 px-2 py-0 mt-4 rounded-sm font-Inter font-normal text-xs uppercase z-[100]'
                onClick={() => {
                    const params = new URLSearchParams(window.location.search);
                    params.delete("sort");
                    startTransition(() => {
                        router.push(`${pathname}?${params.toString()}`, { scroll: false });
                    });
                }}
            >
                {dict.reset}
            </ButtonComponent>
          ) 
          : null}
      </SelectContent>
    </Select>
  )
}
