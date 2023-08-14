import { DictionarySchema } from '@siberiana/schemas';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import React from 'react'
import { authOptions } from '~/app/api/auth/[...nextauth]/route';
import NoSession from '~/components/errors/NoSession';
import { getDictionary } from '~/lib/utils/getDictionary';

export async function generateMetadata(
    { params }: {params: { locale: string }},
  ): Promise<Metadata> {
    // read route params
    const locale = params.locale
   
    // fetch data
    const dict = await getDictionary(locale);
  
    return {
      title: dict.breadcrumbs.settings
    }
  }

export default async function Settings({
    params: { locale },
  }: {
    params: { locale: string },
  }) {

    const dict = await getDictionary(locale);
    const dictResult = DictionarySchema.parse(dict);

    const session = await getServerSession(authOptions);
    if (!!!session) return <NoSession locale={locale}/>

  return (
    <div>{dictResult.account.settings}</div>
  )
}
