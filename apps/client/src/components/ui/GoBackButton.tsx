"use client"

import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@siberiana/ui'
import { ArrowLeftToLine } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function GoBackButton() {
    const router = useRouter()

    return (
        <TooltipProvider>
            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <Button
                        variant={'ghost'}
                        className='flex items-center gap-1 md:p-2 p-1 h-fit w-fit'
                        onClick={() => router.back()}
                    >
                        <ArrowLeftToLine className='lg:w-6 lg:h-6 sm:w-5 sm:h-5 w-7 h-7' />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-accent text-foreground font-OpenSans font-normal cursor-help">
                    Назад
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
