"use client"

import type { SortDataType, SortDictType } from '@siberiana/schemas'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@siberiana/ui'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import ButtonComponent from './ButtonComponent'

export default function Sort({ 
    dict,
    data,
}: {
    dict: SortDictType,
    data: SortDataType[],
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
              router.push(`${pathname}?${params.toString()}`);
            });
          } else {
            params.delete("sort");
          }
        },
        [pathname, router],
    );

    if (isPending) return <Loader2 className='animate-spin' />

  return (
    <Select
      value={sort}
      onValueChange={handleSortParams}
    >
      <SelectTrigger className="w-fit border-none">
        <SelectValue placeholder={dict.placeholder} />
      </SelectTrigger>
      <SelectContent side="top">
        {data.map((elem) => (
          <SelectItem key={elem.val} value={`${elem.val}`} className='font-Inter cursor-pointer'>
            {elem.text}
          </SelectItem>
        ))}
        {sort ? (
            <ButtonComponent 
                className='w-full h-8 px-2 py-0 mt-4 rounded-sm font-Inter font-normal text-xs uppercase'
                onClick={() => {
                    const params = new URLSearchParams(window.location.search);
                    params.delete("sort");
                    startTransition(() => {
                        router.push(`${pathname}?${params.toString()}`);
                    });
                }}
            >
                {dict.reset}
            </ButtonComponent>
        ) : null}
      </SelectContent>
    </Select>
  )
}
