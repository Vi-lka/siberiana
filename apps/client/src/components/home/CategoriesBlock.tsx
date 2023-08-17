import React from 'react'
import { getCategories } from '~/lib/queries/api-collections';
import { getDictionary } from '~/lib/utils/getDictionary';
import { DictionarySchema } from '@siberiana/schemas';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ErrorToast from '../errors/ErrorToast';
import { ZodError } from 'zod';
import ImgTextOn from '../thumbnails/ImgTextOn';

export default async function CategoriesBlock({
    locale,
  }: {
    locale: string;
}) {

    const dict = await getDictionary(locale);
    const dictResult = DictionarySchema.parse(dict);

    try {
        await getCategories({ first: 4 });
    } catch (error) {
        if (error instanceof ZodError) {
            console.log(error.issues);
            return <ErrorToast dict={dictResult.errors} error={error.issues} place="Categories" />;
        } else {
            return <ErrorToast dict={dictResult.errors} error={(error as Error).message} place="Categories" />;
        }
    }
    
    const dataResult = await getCategories({ first: 4 });

  return (
    <>
    <div className="mb-10 flex items-center justify-between">
      <h1 className="text-foreground text-2xl font-bold uppercase">
        {dictResult.categories.title}
      </h1>

      <Link
        href={`/${locale}/categories`}
        className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
      >
        <p className="hidden md:block">{dictResult.categories.textUrl}</p>
        <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
      </Link>
    </div>

    <div className="md:w-full w-[85%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4">
      {dataResult.edges.map((category, index) => (
        <ImgTextOn
          key={index}
          className={"aspect-square"}
          title={category.node.displayName}
          src={category.node.primaryImageURL}
          origin={"storage"}
          url={`/${locale}/collections?category=${category.node.slug}`}
        />
      ))}
    </div>
  </>
  )
}
