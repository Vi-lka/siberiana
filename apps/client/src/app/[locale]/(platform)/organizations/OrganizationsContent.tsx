import React from 'react'
import { PiHandshakeLight } from 'react-icons/pi';
import ImgTextOn from '~/components/thumbnails/ImgTextOn';
import ErrorHandler from '~/components/errors/ErrorHandler';
import PaginationControls from '~/components/ui/PaginationControls';
import { getOrganizations } from '~/lib/queries/strapi-server';
import { getDictionary } from '~/lib/utils/getDictionary';
import { DictionarySchema } from '@siberiana/schemas';

export default async function OrganizationsContent({
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
  const sort = searchParams['sort'] as string | undefined
  const search = searchParams['search'] as string | undefined
  const consortium = searchParams['consortium'] as string | undefined
  
  try {
    await getOrganizations(locale, Number(page), Number(per), sort, search, Boolean(consortium));
  } catch (error) {
    return (
      <ErrorHandler 
        locale={locale} 
        error={error} 
        place="Organizations" 
        notFound 
        goBack={false}
      />
    )
  }

  const dataResult = await getOrganizations(locale, Number(page), Number(per), sort, search, Boolean(consortium));

  return (
    <>
      <div className="md:w-full w-[85%] mx-auto my-12 grid md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.data.map((org, index) => (
          <ImgTextOn
            showIcon={org.attributes.consortium}
            tooltip={dictResult.tooltips.consortium}
            key={index}
            className={"md:aspect-[2/1] aspect-square"}
            title={org.attributes.title}
            src={org.attributes.image.data?.attributes.url}
            url={`/${locale}/organizations/${org.attributes.slug}`}
            origin={"strapi"}
            width={600}
            height={400}
          >
             <PiHandshakeLight className='w-full h-full' />
          </ImgTextOn>
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
