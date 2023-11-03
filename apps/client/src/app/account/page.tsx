import { Dictionary } from '@siberiana/schemas';
import { TabsContent, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@siberiana/ui';
import { Settings } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { SignOutIcon } from '~/components/auth/NextAuthButtons';
import { getDictionary } from '~/lib/utils/getDictionary';
import getUserRoles from '~/lib/utils/getUserRoles';
import AccountTabs from './AccountTabs';
import ToastToken from '~/components/ui/ToastToken';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic'

export default async function Account() {
  
    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);

    const session = await getServerSession(authOptions);
    if (!session) {
      redirect('/login')
    }

    const userRoles = session.user.roles?.map(role => getUserRoles(role, dictResult.account))

    const isAdmin = (session.user.roles?.includes("administrator") || session.user.roles?.includes("moderator"))

  return (
    <div className="mt-12 mb-4 flex flex-col gap-10 mx-auto">
      <div className='flex justify-between md:flex-row flex-col md:gap-1 gap-3'>
        <div className="flex lg:gap-6 gap-3 lg:items-end lg:flex-row flex-col">
          <h1 className="text-foreground xl:text-2xl lg:text-xl text-lg font-bold uppercase">
              {session.user.name}
          </h1>

          {userRoles ? (
              <p className='font-Inter xl:text-base lg:text-sm text-xs'>
                  ({userRoles.join(', ')})
              </p>
          ) : null}
        </div>

        <div className="flex lg:gap-6 gap-3 justify-end">
          {
            isAdmin
            ? (
              <ToastToken tooltipTitle={dict.account.token} token={session.access_token} />
            )
            : null
          }

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link 
                  className='lg:h-12 lg:w-12 h-10 w-10 lg:p-3.5 p-3 bg-accent text-foreground rounded-full hover:bg-input hover:text-background transition-all'
                  href={`/account/settings`} 
                >
                  <Settings className='w-full h-full' />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="bg-accent text-foreground font-OpenSans">
                <p>{dict.account.settings}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <SignOutIcon dict={dictResult.auth} className='lg:h-12 lg:w-12 h-10 w-10 lg:p-3.5 p-3' />
        </div>
      </div>

      <div className="">
        <AccountTabs dict={dictResult.account}>
          <TabsContent
            value="favourites"
            className="w-full py-10"
          >
            favourites
          </TabsContent>
          <TabsContent
            value="collections"
            className="w-full py-10"
          >
            collections
          </TabsContent>
          <TabsContent
            value="publications"
            className="w-full py-10"
          >
            publications
          </TabsContent>
        </AccountTabs>
      </div>
    </div>
  )
}
