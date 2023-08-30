import React from 'react'
import { getCategories } from '~/lib/queries/api-collections';
import { getDictionary } from '~/lib/utils/getDictionary';
import { Dictionary } from '@siberiana/schemas';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ImgTextOn from '../thumbnails/ImgTextOn';
import ErrorHandler from '../errors/ErrorHandler';

export default async function CategoriesBlock() {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);
  
  const [ dataResult ] = await Promise.allSettled([ getCategories({ first: 4 }) ])
  if  (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Categories Block" 
      notFound={false}
    />
  )

  return (
    <>
    <div className="mt-24 mb-10 flex items-center justify-between">
      <h1 className="text-foreground text-2xl font-bold uppercase">
        {dictResult.categories.title}
      </h1>

      <Link
        href={`/categories`}
        className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
      >
        <p className="hidden md:block">{dictResult.categories.textUrl}</p>
        <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
      </Link>
    </div>

    <div className="md:w-full w-[85%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4">
      {dataResult.value.edges.map((category, index) => (
        <ImgTextOn
          key={index}
          className={"aspect-square"}
          title={category.node.displayName}
          src={category.node.primaryImageURL}
          origin={"storage"}
          url={`/collections?category=${category.node.slug}`}
        />
      ))}
    </div>
  </>
  )
}
