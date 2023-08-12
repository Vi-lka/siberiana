import type { DictionaryType } from '@siberiana/schemas';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { ZodError } from 'zod';
import ImgTextBelow from '~/components/thumbnails/ImgTextBelow';
import { getProjects } from '~/lib/queries/strapi-server';
import getLinkDir from '~/lib/utils/getLinkDir';
import ErrorToast from '../errors/ErrorToast';

export default async function ProjectsBlock({
  locale,
  dict
}: {
  locale: string,
  dict: DictionaryType
}) {
  
  try {
    await getProjects(locale, 1, 2);
  } catch (error) {
    if (error instanceof ZodError) {
        console.log(error.issues);
        return <ErrorToast dict={dict.errors} error={error.issues} place="ProjectsBlock" />;
      } else {
        return <ErrorToast dict={dict.errors} error={(error as Error).message} place="ProjectsBlock" />;
      }
  }

  const dataResult = await getProjects(locale, 1, 2);

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dict.projects.title}
        </h1>
        <Link
          href={`${locale}${dict.projects.url}`}
          className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
        >
          <p className="hidden md:block">
            {dict.projects.textUrl}
          </p>
          <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
        </Link>
      </div>
      <div className="md:w-full w-[85%] mx-auto my-12 grid md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.data.map((proj, index) => (
            <ImgTextBelow
                key={index}
                className={"aspect-[2.7/1]"}
                classNameImage={'w-full object-contain'}
                title={proj.attributes.title}
                src={proj.attributes.image.data?.attributes.url}
                href={getLinkDir(proj.attributes.url, locale)}
                target="_blank"
                origin={"strapi"}
                width={700}
                height={300}
            >
                <div className="flex flex-col gap-3">
                    <p className="uppercase font-bold lg:text-xl text-base">
                        {proj.attributes.title}
                    </p>

                    <p className="font-Inter xl:text-sm text-xs">
                        {proj.attributes.description}
                    </p>

                    <Link
                      href={getLinkDir(proj.attributes.url, locale)}
                      target="_blank"
                      className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
                    >
                        <p className="hidden md:block">{dict.projects.goTo}</p>
                        <ArrowRight className="stroke-1 h-6 w-6" />
                    </Link>
                </div>
            </ImgTextBelow>
        ))}
      </div>
    </>
  )
}
