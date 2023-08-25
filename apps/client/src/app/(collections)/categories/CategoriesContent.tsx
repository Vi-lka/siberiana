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
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  const defaultPageSize = 12

  const page = searchParams['page'] ?? '1'
  const per = searchParams['per'] ?? defaultPageSize
  const search = searchParams['search'] as string | undefined
  const sort = searchParams['sort'] as string | undefined

  const first = per
  const offset = (Number(page) - 1) * Number(per)

  const [ dataResult ] = await Promise.allSettled([ getCategories({ first: Number(first), offset, search, sort }) ])
  if (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Categories" 
      notFound 
      goBack={false}
    />
  )

  return (
    <>
      <div className="md:w-full w-[85%] mx-auto mt-3 mb-12 grid min-[2000px]:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.value.edges.map((category, index) => (
          <ImgTextBelow
            key={index}
            className={"aspect-[2.7/1]"}
            classNameImage={'w-full object-cover'}
            title={category.node.displayName}
            src={category.node.primaryImageURL}
            origin={"storage"}
            href={`/collections?category=${category.node.slug}`}
            width={810}
            height={300}
          >
            <div className="flex flex-col gap-3">
              <p className="uppercase font-bold lg:text-xl text-base">
                {category.node.displayName}
              </p>

              <p className="font-Inter xl:text-sm text-xs">
                {getShortDescription(category.node.description)}
              </p>
                
              <Link
                href={`/collections?category=${category.node.slug}`}
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
          length={dataResult.value.totalCount}
          defaultPageSize={defaultPageSize}
        />
      </div>
    </>
  )
}
