import React from 'react'
import { ZodError } from 'zod';
import { getDictionary } from '~/lib/utils/getDictionary';
import ErrorToast from './ErrorToast';
import { DictionarySchema } from '@siberiana/schemas';
import NotFound from './NotFound';

type Props = {
    error: unknown,
    place: string,
    children?: React.ReactNode
} & (TrueNotFoundProps | FalseNotFoundProps)

type TrueNotFoundProps = {
    notFound?: true,
    goBack: boolean,
}

type FalseNotFoundProps = {
    notFound?: false,
}

export default async function ErrorHandler(props: Props) {

    const dict = await getDictionary();
    const dictResult = DictionarySchema.parse(dict);

    console.log("ErrorHandler: ",  props.error)

    if (props.error instanceof ZodError) {

        return <ErrorToast dict={dictResult.errors} error={props.error.issues} place={props.place} />;

    } else {

        if (props.notFound) {
            if ((props.error as Error).message === 'NEXT_NOT_FOUND') {

                return (
                    <NotFound dict={dictResult.errors} goBack={props.goBack}>
                        {props.children}
                    </NotFound>
                )
            
            } else return <ErrorToast dict={dictResult.errors} error={(props.error as Error).message} place={props.place} />
        } else return <ErrorToast dict={dictResult.errors} error={(props.error as Error).message} place={props.place} />

    }
}
