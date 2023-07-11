import { DictionarySchema } from '@siberiana/schemas';
import React from 'react'
import Breadcrumbs from '~/components/ui/Breadcrumbs';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function Organizations({
  params: { locale },
}: {
  params: { locale: string };
}) {

    const dict = await getDictionary(locale);

    const dataResult = DictionarySchema.parse(dict);

  return (
    <main className="font-Inter flex flex-col">
        <div className="font-OpenSans max-w-[1600px] w-[85%] mx-auto mt-16 mb-24">
            <Breadcrumbs dict={dataResult.breadcrumbs} />
        </div>
    </main>
  )
}
