import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import NotFound from '~/components/errors/NotFound'
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function NotFoundPage() {
  
    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);
  
    return (
        <div className='md:mt-20'>
            <NotFound
                dict={dictResult.errors}
                goBack
            />
        </div>
    )
}
