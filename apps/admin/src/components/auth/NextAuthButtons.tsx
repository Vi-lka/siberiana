"use client"

import React from 'react'
import { signIn, signOut } from 'next-auth/react'
import { LogOut } from 'lucide-react'
import { cn } from '@siberiana/ui/src/lib/utils'
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@siberiana/ui'

type Props = {
  className?: string,
}

export const SignInButton = ({
  className,
}: Props) => {
  return (
    <Button 
      className={className}
      onClick={() => void signIn("keycloak", {callbackUrl: process.env.NEXTAUTH_URL_ADMIN})}
    >
      Войти
    </Button>
  )
}

export const SignOutButton = ({
  className,
  variant
}: Props & {variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "hidden" | null}) => {
  return (
    <Button 
      className={className}
      variant={variant}
      onClick={() => void signOut({callbackUrl: process.env.NEXTAUTH_URL_ADMIN})}
    >
      Выйти
    </Button>
  )
}

export const SignOutIcon = ({
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
            onClick={() => void signOut({callbackUrl: process.env.NEXTAUTH_URL_ADMIN})}
          >
            <LogOut  className='w-full h-full' />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="bg-accent text-foreground font-OpenSans">
          <p>Выйти</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
