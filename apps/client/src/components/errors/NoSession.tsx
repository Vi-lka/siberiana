import { DictionarySchema } from '@siberiana/schemas';
import { Alert, AlertDescription, AlertTitle } from '@siberiana/ui';
import { AlertCircle } from 'lucide-react';
import React from 'react'
import { getDictionary } from '~/lib/utils/getDictionary';
import { SignInButton } from '../auth/NextAuthButtons';

export default async function NoSession({ locale }: { locale: string }) {

    const dict = await getDictionary(locale);
    const dictResult = DictionarySchema.parse(dict);

  return (
    <div className='w-full flex flex-col items-center py-10'>
        <Alert variant="destructive" className='w-fit'>
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>{dictResult.errors.sessionTitle}</AlertTitle>
            <AlertDescription>
                {dictResult.errors.sessionDescription}
            </AlertDescription>
        </Alert>

        <SignInButton className='text-base uppercase font-Inter px-10 py-6 mt-6' dict={dictResult.auth} />
    </div>
  )
}