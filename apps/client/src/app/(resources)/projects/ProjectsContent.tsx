import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import ImgTextBelow from '~/components/thumbnails/ImgTextBelow';
import ErrorHandler from '~/components/errors/ErrorHandler';
import PaginationControls from '~/components/ui/PaginationControls';
import { getProjects } from '~/lib/queries/strapi-server';
import getLinkDir from '~/lib/utils/getLinkDir';
import { getDictionary } from '~/lib/utils/getDictionary';
import { Dictionary } from '@siberiana/schemas';

export default async function ProjectsContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const defaultPageSize = 12

  const page = searchParams['page'] ?? '1'
  const per = searchParams['per'] ?? defaultPageSize
  const sort = searchParams['sort'] as string | undefined
  const search = searchParams['search'] as string | undefined
  
  const [ dataResult ] = await Promise.allSettled([ getProjects({  page: Number(page), per: Number(per), sort, search }) ])
  if  (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Projects" 
      notFound 
      goBack={false}
    />
  )

  return (
    <>
      <div className="md:w-full w-[85%] mx-auto mt-3 mb-12 grid min-[2000px]:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.value.data.map((proj, index) => (
            <ImgTextBelow
                key={index}
                className={"aspect-[2.7/1]"}
                classNameImage={'w-full object-cover'}
                title={proj.attributes.title}
                src={proj.attributes.image.data?.attributes.url}
                href={getLinkDir(proj.attributes.url)}
                target="_blank"
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
                        <p className="hidden md:block">{dict.projects.goTo}</p>
                        <ArrowRight className="stroke-1 h-6 w-6" />
                    </Link>
                </div>
            </ImgTextBelow>
        ))}
      </div>

      <div className="mb-24">
        <PaginationControls
          dict={dictResult.pagination}
          length={dataResult.value.meta.pagination.total}
          defaultPageSize={defaultPageSize}
        />
      </div>
    </>
  )
}
