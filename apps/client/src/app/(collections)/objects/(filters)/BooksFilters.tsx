import { DictionarySchema } from '@siberiana/schemas';
import React from 'react'
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function BooksFilters({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  return (
    <div className=''>
      BooksFilters
    </div>
  )
}
