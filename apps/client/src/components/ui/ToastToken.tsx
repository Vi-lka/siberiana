"use client"

import { Button, ToastAction, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, useToast } from '@siberiana/ui'
import { Copy, KeyRound } from 'lucide-react'
import React from 'react'

export default function ToastToken({
  tooltipTitle,
  token
}: {
  tooltipTitle: string,
  token: string
}) {

  const { toast } = useToast()
  
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            className='lg:h-12 lg:w-12 h-10 w-10 lg:p-3.5 p-3 bg-accent text-foreground rounded-full hover:bg-input hover:text-background transition-all'
            onClick={() => {
              void navigator.clipboard.writeText(token)
              toast({
                variant: "default",
                title: "Токен скопирован!",
                description: "Копировать снова:",
                className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
                action: (
                  <ToastAction
                    className="px-2 py-6 text-sm hover:bg-background/20 dark:border-foreground"
                    altText={"Copy"}
                    onClick={() => void navigator.clipboard.writeText(token)}
                  >
                    <Copy className="h-8 w-8" />
                  </ToastAction>
                ),
              })
            }}
          >
            <KeyRound className='w-full h-full' />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-accent text-foreground font-OpenSans">
          <p>{tooltipTitle}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
