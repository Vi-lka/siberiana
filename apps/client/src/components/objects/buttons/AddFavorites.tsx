"use client"

import React from 'react'
import { Heart } from 'lucide-react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent, Button } from '@siberiana/ui'

export default function AddFavorites({
    session,
}: {
    session: boolean,
}) {
    
    return (
        <TooltipProvider>
            <Tooltip delayDuration={300}>
                <TooltipTrigger asChild>
                    <Button 
                        className='p-3.5 w-12 h-12 rounded-full hover:bg-beaver hover:text-beaverLight dark:bg-accent dark:text-beaverLight dark:hover:text-darkBlue dark:hover:bg-beaverLight'
                        onClick={() => console.log(session)}
                    >
                        <Heart />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-accent text-foreground font-OpenSans font-normal cursor-help">
                    Добавить в избранное
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}
