"use client"

import { Avatar, AvatarFallback, Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Skeleton } from '@siberiana/ui'
import React from 'react'
import { ClientHydration } from '../providers/ClientHydration';
import { signOut } from 'next-auth/react';

export default function AccountBar({ 
    name
}: { 
    name: string
}) {

    const matchesName = name?.match(/[\wа-я]+/ig)
    const acronymName = !!matchesName 
        ? matchesName.map(match => {
            return match[0].toUpperCase()
        })
        : "USER"

  return (
    <div className='font-Inter text-sm'>
        <DropdownMenu>
            <ClientHydration fallback={
                <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"/>
            }>
                <DropdownMenuTrigger className='rounded-full'>
                    <Avatar className='hover:ring hover:ring-offset-2 ring-ring ring-offset-background transition-all'>
                        {/* <AvatarImage src={image} /> */}
                        <AvatarFallback className='font-semibold'>
                            {acronymName}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
            </ClientHydration>

            <DropdownMenuContent className="w-56 font-Inter text-foreground">
                <DropdownMenuLabel>Мой аккаунт</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* <DropdownMenuGroup>
                    <Link href={`/account`}>
                        <DropdownMenuItem className='cursor-pointer'>{dict.profile}</DropdownMenuItem>
                    </Link>
                    <Link href={`/account/settings`}>
                        <DropdownMenuItem className='cursor-pointer'>{dict.settings}</DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup> */}
                <DropdownMenuSeparator />

                <DropdownMenuItem className='cursor-pointer p-0'>
                    <Button 
                      className="px-2 py-1.5 block w-full h-fit text-left font-normal" 
                      variant='ghost'
                      onClick={() => void signOut()}
                    >
                      Выйти
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
