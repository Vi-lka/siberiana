import { DictionarySchema } from '@siberiana/schemas';
import { Avatar, AvatarFallback, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, Skeleton } from '@siberiana/ui'
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { getDictionary } from '~/lib/utils/getDictionary';
import { SignOutButton } from '../auth/NextAuthButtons';
import Link from 'next/link';
import { ClientHydration } from '../providers/ClientHydration';

export default async function AccountBar({ locale }: { locale: string }) {

    const dict = await getDictionary(locale);

    const dictResult = DictionarySchema.parse(dict);
  
    const session = await getServerSession(authOptions);

    const matchesName = session?.user.name.match(/\b(\w)/g)
    const acronymName = matchesName?.join('')

  return (
    <div className='font-Inter text-sm'>
        <DropdownMenu>
            <ClientHydration fallback={
                <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full"/>
            }>
                <DropdownMenuTrigger>
                    <Avatar>
                        {/* <AvatarImage src={image} /> */}
                        <AvatarFallback className='font-semibold'>
                            {acronymName ? acronymName : "USER"}
                        </AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
            </ClientHydration>

            <DropdownMenuContent className="w-56 font-Inter">
                <DropdownMenuLabel>{dictResult.account.barTitle}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <Link href={`/${locale}/account`}>
                        <DropdownMenuItem className='cursor-pointer'>{dictResult.account.profile}</DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className='cursor-pointer'>{dictResult.account.settings}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                    <DropdownMenuItem className='cursor-pointer'>{dictResult.account.favourites}</DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>{dictResult.account.collections}</DropdownMenuItem>
                    <DropdownMenuItem className='cursor-pointer'>{dictResult.account.publications}</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem className='cursor-pointer p-0'>
                    <SignOutButton className="px-2 py-1.5 block bg-transparent w-full h-fit text-left font-normal hover:text-foreground hover:bg-transparent" dict={dictResult.auth} />
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}
