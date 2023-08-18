import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import ImgTextBelow from '~/components/thumbnails/ImgTextBelow';
import ErrorHandler from '~/components/errors/ErrorHandler';
import PaginationControls from '~/components/ui/PaginationControls';
import { getProjects } from '~/lib/queries/strapi-server';
import getLinkDir from '~/lib/utils/getLinkDir';
import { getDictionary } from '~/lib/utils/getDictionary';
import { DictionarySchema } from '@siberiana/schemas';

export default async function ProjectsContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  const defaultPageSize = 10

  const page = searchParams['page'] ?? '1'
  const per = searchParams['per'] ?? defaultPageSize
  const sort = searchParams['sort'] as string | undefined
  const search = searchParams['search'] as string | undefined
  
  try {
    await getProjects({ page: Number(page), per: Number(per), sort, search });
  } catch (error) {
    return (
      <ErrorHandler
        error={error} 
        place="Projects" 
        notFound 
        goBack={false}
      />
    )
  }

  const dataResult = await getProjects({ page: Number(page), per: Number(per), sort, search });

  return (
    <>
      <div className="md:w-full w-[85%] mx-auto my-12 grid md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.data.map((proj, index) => (
            <ImgTextBelow
                key={index}
                className={"aspect-[2.7/1]"}
                classNameImage={'w-full object-contain'}
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
          length={dataResult.meta.pagination.total}
          defaultPageSize={defaultPageSize}
        />
      </div>
    </>
  )
}
