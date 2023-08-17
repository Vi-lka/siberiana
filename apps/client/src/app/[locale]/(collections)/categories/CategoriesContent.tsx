import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler';
import PaginationControls from '~/components/ui/PaginationControls';
import { getDictionary } from '~/lib/utils/getDictionary';
import { DictionarySchema } from '@siberiana/schemas';
import { getCategories } from '~/lib/queries/api-collections';
import ImgTextBelow from '~/components/thumbnails/ImgTextBelow';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import getShortDescription from '~/lib/utils/getShortDescription';

export default async function CategoriesContent({
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

  const first = per
  const offset = (Number(page) - 1) * Number(per)
  
  try {
    await getCategories({ first: Number(first), offset, search });
  } catch (error) {
    return (
      <ErrorHandler 
        locale={locale} 
        error={error} 
        place="Categories" 
        notFound 
        goBack={false}
      />
    )
  }
  const dataResult = await getCategories({ first: Number(first), offset, search });

  return (
    <>
      <div className="md:w-full w-[85%] mx-auto my-12 grid md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.edges.map((category, index) => (
          <ImgTextBelow
            key={index}
            className={"aspect-[2.7/1]"}
            classNameImage={'w-full object-contain'}
            title={category.node.displayName}
            src={category.node.primaryImageURL}
            origin={"storage"}
            href={`/${locale}/collections?category=${category.node.slug}`}
            width={810}
            height={300}
          >
            <div className="flex flex-col gap-3">
              <p className="uppercase font-bold lg:text-xl text-base">
                {category.node.displayName} {category.node.id}
              </p>

              <p className="font-Inter xl:text-sm text-xs">
                {getShortDescription(category.node.description)}
              </p>
                
              <Link
                href={`/${locale}/collections?category=${category.node.slug}`}
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
