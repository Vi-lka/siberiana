import type { DictionaryType } from '@siberiana/schemas';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import ImgTextBelow from '~/components/thumbnails/ImgTextBelow';
import ErrorHandler from '~/components/ui/ErrorHandler';
import PaginationControls from '~/components/ui/PaginationControls';
import { getServices } from '~/lib/queries/strapi-server';
import getLinkDir from '~/lib/utils/getLinkDir';

export default async function ServicesContent({
  locale,
  searchParams,
  dict
}: {
  locale: string,
  searchParams: { [key: string]: string | string[] | undefined },
  dict: DictionaryType
}) {

  const defaultPageSize = 10

  const page = searchParams['page'] ?? '1'
  const per = searchParams['per'] ?? defaultPageSize
  const sort = searchParams['sort'] as string | undefined
  const search = searchParams['search'] as string | undefined
  
  try {
    await getServices(locale, Number(page), Number(per), sort, search);
  } catch (error) {
    return (
      <ErrorHandler 
        locale={locale} 
        error={error} 
        place="Services" 
        notFound 
        goBack={false}
      />
    )
  }

  const dataResult = await getServices(locale, Number(page), Number(per), sort, search);

  return (
    <>
      <div className="md:w-full w-[85%] mx-auto my-12 grid md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.data.map((service, index) => (
            <ImgTextBelow
                key={index}
                className={"aspect-[2.7/1]"}
                classNameImage={'w-full object-contain'}
                title={service.attributes.title}
                src={service.attributes.image.data?.attributes.url}
                href={getLinkDir(service.attributes.url, locale)}
                target="_blank"
                origin={"strapi"}
                width={700}
                height={300}
            >
                <div className="flex flex-col gap-3">
                    <p className="uppercase font-bold lg:text-xl text-base">
                        {service.attributes.title}
                    </p>

                    <p className="font-Inter xl:text-sm text-xs">
                        {service.attributes.description}
                    </p>

                    <Link
                      href={getLinkDir(service.attributes.url, locale)}
                      target="_blank"
                      className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
                    >
                        <p className="hidden md:block">{dict.services.goTo}</p>
                        <ArrowRight className="stroke-1 h-6 w-6" />
                    </Link>
                </div>
            </ImgTextBelow>
        ))}
      </div>

      <div className="mb-24">
        <PaginationControls
          dict={dict.pagination}
          length={dataResult.meta.pagination.total}
          defaultPageSize={defaultPageSize}
        />
      </div>
    </>
  )
}
