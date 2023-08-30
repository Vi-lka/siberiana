import { Dictionary } from '@siberiana/schemas';
import React from 'react'
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function BooksFilters({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  return (
    <div className=''>
      BooksFilters
    </div>
  )
}
