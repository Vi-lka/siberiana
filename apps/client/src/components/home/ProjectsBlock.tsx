import { Dictionary } from '@siberiana/schemas';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import ImgTextBelow from '~/components/thumbnails/ImgTextBelow';
import { getProjects } from '~/lib/queries/strapi-server';
import getLinkDir from '~/lib/utils/getLinkDir';
import { getDictionary } from '~/lib/utils/getDictionary';
import ErrorHandler from '../errors/ErrorHandler';

export default async function ProjectsBlock() {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const [ dataResult ] = await Promise.allSettled([ getProjects({page: 1, per: 2}) ])
  if  (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Projects Block" 
      notFound
      goBack={false}
    />
  )

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.projects.title}
        </h1>
        <Link
          href={`/projects`}
          className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
        >
          <p className="hidden md:block">
            {dictResult.projects.textUrl}
          </p>
          <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
        </Link>
      </div>
      <div className="md:w-full w-[85%] mx-auto my-12 grid md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.value.data.map((proj, index) => (
            <ImgTextBelow
                key={index}
                className={"aspect-[2.7/1]"}
                classNameImage={'w-full object-cover'}
                title={proj.attributes.title}
                src={proj.attributes.image.data?.attributes.url}
                href={getLinkDir(proj.attributes.url)}
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
                      href={getLinkDir(proj.attributes.url)}
                      target="_blank"
                      className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
                    >
                        <p className="hidden md:block">{dictResult.projects.goTo}</p>
                        <ArrowRight className="stroke-1 h-6 w-6" />
                    </Link>
                </div>
            </ImgTextBelow>
        ))}
      </div>
    </>
  )
}
