"use client"

import type { AccountDictType } from '@siberiana/schemas';
import { Avatar, AvatarFallback, Button, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Skeleton } from '@siberiana/ui'
import type { Session } from 'next-auth';
import React from 'react'
import Link from 'next/link';
import { ClientHydration } from '../providers/ClientHydration';
import { signOut } from 'next-auth/react';
import { useAtom } from 'jotai';
import { tabAccountAtom } from '~/lib/utils/atoms';
import { useLocale } from '~/lib/utils/useLocale';

export default function AccountBar({ 
    dict,
    session
}: { 
    dict: AccountDictType,
    session: Session | null
}) {
    const locale = useLocale();

    const matchesName = session?.user.name.match(/\b(\w)/g)
    const acronymName = matchesName?.join('')

    const [_, setTab] = useAtom(tabAccountAtom)

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
                            {acronymName ? acronymName : "USER"}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
            </ClientHydration>

            <DropdownMenuContent className="w-56 font-Inter text-foreground">
                <DropdownMenuLabel>{dict.barTitle}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <Link href={`/${locale}/account`}>
                        <DropdownMenuItem className='cursor-pointer'>{dict.profile}</DropdownMenuItem>
                    </Link>
                    <Link href={`/${locale}/account/settings`}>
                        <DropdownMenuItem className='cursor-pointer'>{dict.settings}</DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <Link href={`/${locale}/account`}>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setTab("favourites")}>
                            {dict.favourites}
                        </DropdownMenuItem>
                    </Link>

                    <Link href={`/${locale}/account`}>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setTab("collections")}>
                            {dict.collections}
                        </DropdownMenuItem>    
                    </Link>

                    <Link href={`/${locale}/account`}>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => setTab("publications")}>
                            {dict.publications}
                        </DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem className='cursor-pointer p-0'>
                    <Button 
                      className="px-2 py-1.5 block w-full h-fit text-left font-normal" 
                      variant='ghost'
                      onClick={() => void signOut()}
                    >
                      {dict.signOut}
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
