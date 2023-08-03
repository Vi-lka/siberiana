import React from 'react'
import { ZodError } from 'zod';
import { getDictionary } from '~/lib/utils/getDictionary';
import ErrorToast from './ErrorToast';
import { DictionarySchema } from '@siberiana/schemas';
import NotFound from './NotFound';

export default async function ErrorHandler({ 
    locale, 
    error,
    place,
    notFound = false
}: { 
    locale: string, 
    error: unknown,
    place: string,
    notFound?: boolean
}) {

    const dict = await getDictionary(locale);
    const dictResult = DictionarySchema.parse(dict);

    if (error instanceof ZodError) {

        console.log(error.issues);

        return <ErrorToast dict={dictResult.errors} error={error.issues} place={place} />;

    } else {

        console.log(error);

        if (notFound) {
            if ((error as Error).message === 'NEXT_NOT_FOUND') {

                return <NotFound dict={dictResult.errors} />
            
            } else return <ErrorToast dict={dictResult.errors} error={(error as Error).message} place={place} />
        } else return null

    }
}
