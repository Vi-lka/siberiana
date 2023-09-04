"use client"

import { Toggle, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@siberiana/ui'
import { Loader2 } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import resetPaginationts from '~/lib/utils/resetPagination'

export default function ToggleFilter({
    tooltip,
    param,
    children,
}: {
    tooltip: string,
    param: string,
    children: React.ReactNode,
}) {

    const [isPending, startTransition] = React.useTransition()

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const currentParam = searchParams.get(param) ?? undefined

    const handleToggleParams = React.useCallback(
        (pressed: boolean) => {
          const params = new URLSearchParams(window.location.search);

          // reset pagination(page) to prevent zero results
          resetPaginationts(params)

          if (pressed === true) {
            params.set(param, pressed.toString());
          } else {
            params.delete(param);
          }
          
          startTransition(() => {
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
          });
        },
        [param, pathname, router],
    );

    if (isPending) return <Loader2 className='animate-spin md:mr-3 md:ml-0 ml-3' />

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <Toggle 
          aria-label={tooltip}
          pressed={Boolean(currentParam)}
          onPressedChange={handleToggleParams}
          asChild
        >
          <TooltipTrigger>
            {children}
          </TooltipTrigger>
        </Toggle>

        <TooltipContent side="bottom" className="bg-accent text-foreground font-OpenSans">
            <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
