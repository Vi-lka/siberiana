import { DictionarySchema } from '@siberiana/schemas';
import React, { Suspense } from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import RowBigBlockSkeleton from '~/components/skeletons/RowBigBlockSkeleton';
import Breadcrumbs from '~/components/ui/Breadcrumbs';
import SearchField from '~/components/ui/SearchField';
import { getCategoryByID } from '~/lib/queries/api-collections';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function Category({
    params: { locale, id },
  }: {
    params: { locale: string, id: string };
}) {

    const dict = await getDictionary(locale);
    const dictResult = DictionarySchema.parse(dict);

    try {
        await getCategoryByID(id);
      } catch (error) {
        return (
          <ErrorHandler 
            locale={locale} 
            error={error} 
            place="Category" 
            notFound 
            goBack={false}
          />
        )
    }

    const dataResult = await getCategoryByID(id);

  return (
    <div>
        <Breadcrumbs 
          dict={dictResult.breadcrumbs} 
          slug={id} 
          title={dataResult.displayName} 
        />
    
        <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
          <h1 className="text-foreground text-2xl font-bold uppercase">
            {dataResult.displayName}
          </h1>
        </div>
    
        <SearchField 
          placeholder={dictResult.search.button}
        />
    
        <Suspense fallback={
          <div className="my-12">
            <RowBigBlockSkeleton />
          </div>
        }>
          {/* <CategoryContent locale={locale} searchParams={searchParams} /> */}
        </Suspense>
    </div>
  )
}
