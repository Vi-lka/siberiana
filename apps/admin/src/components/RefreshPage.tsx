"use client"

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React from 'react'

export default function RefreshPage({
    side = "left",
    className,
}: {
    side?: "top" | "right" | "bottom" | "left",
    className?: string,
}) {

    const [isPending, startTransition] = React.useTransition();
    const router = useRouter();
    
    const handleRefresh = () => {
        startTransition(() => {
            router.refresh()
        })
    }

    return (
        <TooltipProvider>
            <Tooltip delayDuration={150}>
                <TooltipTrigger asChild>
                    <Button 
                        variant="ghost"
                        disabled={isPending}
                        className={cn(
                            "w-fit h-fit p-3 mr-3 md:flex hidden", 
                            isPending ? "animate-spin" : "",
                            className
                        )}
                        onClick={handleRefresh}
                    >
                      <RefreshCcw className='h-6 w-6' />
                      <span className="sr-only">Refresh page</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side={side}>
                    <p className='font-OpenSans'>Перезагрузить</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
