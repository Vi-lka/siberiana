// import { DictionarySchema } from '@siberiana/schemas';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import { getObjects } from '~/lib/queries/api-collections';
// import { getDictionary } from '~/lib/utils/getDictionary';

export default async function ObjectsContent({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined },
  }) {

    // const dict = await getDictionary();
    // const dictResult = DictionarySchema.parse(dict);
    
    const defaultPageSize = 8
    
    const page = searchParams['page'] ?? '1'
    const per = searchParams['per'] ?? defaultPageSize
    const search = searchParams['search'] as string | undefined
    const categories = searchParams['category'] as string | undefined
    const collections = searchParams['collection'] as string | undefined
    
    const first = Number(per)
    const offset = (Number(page) - 1) * Number(per)
  
    const [ dataResult ] = await Promise.allSettled([ getObjects({ first, offset, search, categories, collections }) ])
    if  (dataResult.status === 'rejected') return (
      <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="Objects" 
        notFound 
        goBack={false}
      />
    )
    
  return (
    <div>ObjectsContent</div>
  )
}
