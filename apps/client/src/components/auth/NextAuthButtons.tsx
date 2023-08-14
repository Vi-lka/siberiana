"use client"

import type { AuthDictType } from '@siberiana/schemas'
import React from 'react'
import ButtonComponent from '../ui/ButtonComponent'
import { signIn, signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { cn } from '@siberiana/ui/src/lib/utils'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@siberiana/ui'

type Props = {
  dict: AuthDictType,
  className?: string,
}

export const SignInButton = ({
    dict,
    className,
}: Props) => {
  return (
    <ButtonComponent 
      className={className}
      onClick={() => void signIn("keycloak")}
    >
      {dict.signIn}
    </ButtonComponent>
  )
}

export const SignOutButton = ({
  dict,
  className,
  variant
}: Props & {variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "hidden" | null}) => {
  return (
    <ButtonComponent 
      className={className}
      variant={variant}
      onClick={() => void signOut()}
    >
      {dict.signOut}
    </ButtonComponent>
  )
}

export const SignOutIcon = ({
  dict,
  className,
}: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'bg-accent text-foreground rounded-full hover:bg-input hover:text-background transition-all',
              className
            )}
            onClick={() => void signOut()}
          >
            <LogOut  className='w-full h-full' />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-accent text-foreground font-OpenSans">
          <p>{dict.signOut}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}