import { DictionarySchema } from '@siberiana/schemas';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import ImgTextBelow from '~/components/thumbnails/ImgTextBelow';
import PaginationControls from '~/components/ui/PaginationControls';
import { getCollections } from '~/lib/queries/api-collections';
import { getDictionary } from '~/lib/utils/getDictionary';
import getShortDescription from '~/lib/utils/getShortDescription';

export default async function CollectionsContent({
    locale,
    searchParams,
  }: {
    locale: string,
    searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary(locale);
  const dictResult = DictionarySchema.parse(dict);
  
  const defaultPageSize = 10
  
  const page = searchParams['page'] ?? '1'
  const per = searchParams['per'] ?? defaultPageSize
  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  
  const first = Number(per)
  const offset = (Number(page) - 1) * Number(per)

  try {
      await getCollections({ first, offset, search, categories });
  } catch (error) {
    console.error(error)
      return (
        <ErrorHandler 
          locale={locale} 
          error={error} 
          place="Collections" 
          notFound 
          goBack={false}
        />
      )
  }
  const dataResult = await getCollections({ first, offset, search, categories });

  function getCollectionHref(category: string | undefined, collection: string): string {
    if (!!category && category.length > 0) {

      return `/${locale}/objects?category=${category}&collection=${collection}`

    } else return `/${locale}/objects?collection=${collection}`
  }
    
  return (
    <>
      <div className="md:w-full w-[85%] mx-auto my-12 grid md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.edges.map((collection, index) => (
            <ImgTextBelow
                key={index}
                className={"aspect-[2.7/1]"}
                classNameImage={'w-full object-contain'}
                title={collection.node.displayName}
                src={collection.node.primaryImageURL}
                origin={"storage"}
                href={getCollectionHref(collection.node.category?.slug, collection.node.slug)}
                width={810}
                height={300}
            >
                <div className="flex flex-col gap-3">
                    <p className="uppercase font-bold lg:text-xl text-base">
                        {collection.node.displayName} {collection.node.id}
                    </p>
        
                    <p className="font-Inter xl:text-sm text-xs">
                        {getShortDescription(collection.node.description)}
                    </p>
        
                    <Link
                      href={getCollectionHref(collection.node.category?.slug, collection.node.slug)}
                      className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
                    >
                        <p className="hidden md:block">{dictResult.categories.goTo}</p>
                        <ArrowRight className="stroke-1 h-6 w-6" />
                    </Link>
                </div>
            </ImgTextBelow>
        ))}
      </div>
        
      <div className="mb-24">
        <PaginationControls
          dict={dictResult.pagination}
          length={dataResult.totalCount}
          defaultPageSize={defaultPageSize}
        />
      </div>
    </>
  )
}
