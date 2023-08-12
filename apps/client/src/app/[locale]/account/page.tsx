import { DictionarySchema } from '@siberiana/schemas';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import Breadcrumbs from '~/components/ui/Breadcrumbs';
import { getDictionary } from '~/lib/utils/getDictionary';
import getUserRole from '~/lib/utils/getUserRole';

export default async function Account({
    params: { locale },
  }: {
    params: { locale: string },
  }) {

    const session = await getServerSession(authOptions);

    if (!!!session) return "Ops! Go Sign In)"
  
    const dict = await getDictionary(locale);
    const dictResult = DictionarySchema.parse(dict);

    const userRoles = session.user.roles?.map(role => getUserRole(role, dictResult))

  return (
    <div>
        <Breadcrumbs dict={dictResult.breadcrumbs} />

        <div className="mt-12 mb-4 flex flex-col gap-10">
            <div className="flex gap-6 items-end">
                <h1 className="text-foreground text-2xl font-bold uppercase">
                    {session.user.name}
                </h1>

                {userRoles ? (
                    <p className='font-Inter lg:text-base text-sm'>
                        ({userRoles.join(', ')})
                    </p>
                ) : null}
            </div>

        </div>
    </div>
  )
}
