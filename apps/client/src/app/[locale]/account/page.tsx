import { DictionarySchema } from '@siberiana/schemas';
import { TabsContent, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@siberiana/ui';
import { Settings } from 'lucide-react';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import React from 'react'
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import { SignOutIcon } from '~/components/auth/NextAuthButtons';
import { getDictionary } from '~/lib/utils/getDictionary';
import getUserRole from '~/lib/utils/getUserRole';
import AccountTabs from './AccountTabs';
import NoSession from '~/components/errors/NoSession';

export default async function Account({
    params: { locale },
  }: {
    params: { locale: string },
  }) {
  
    const dict = await getDictionary(locale);
    const dictResult = DictionarySchema.parse(dict);

    const session = await getServerSession(authOptions);
    if (!!!session) return <NoSession locale={locale}/>

    const userRoles = session.user.roles?.map(role => getUserRole(role, dictResult.account))

  return (
    <div className="mt-12 mb-4 flex flex-col gap-10">
      <div className='flex justify-between md:flex-row flex-row gap-1'>
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
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link 
                  className='lg:h-12 lg:w-12 h-10 w-10 lg:p-3.5 p-3 bg-accent text-foreground rounded-full hover:bg-input hover:text-background transition-all'
                  href={`/${locale}/account/settings`} 
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