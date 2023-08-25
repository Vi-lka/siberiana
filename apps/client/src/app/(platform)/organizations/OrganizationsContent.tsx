import React from 'react'
import { PiHandshakeLight } from 'react-icons/pi';
import ImgTextOn from '~/components/thumbnails/ImgTextOn';
import ErrorHandler from '~/components/errors/ErrorHandler';
import PaginationControls from '~/components/ui/PaginationControls';
import { getOrganizations } from '~/lib/queries/strapi-server';
import { getDictionary } from '~/lib/utils/getDictionary';
import { DictionarySchema } from '@siberiana/schemas';

export default async function OrganizationsContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined },
}) {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  const defaultPageSize = 12

  const page = searchParams['page'] ?? '1'
  const per = searchParams['per'] ?? defaultPageSize
  const sort = searchParams['sort'] as string | undefined
  const search = searchParams['search'] as string | undefined
  const consortium = searchParams['consortium'] as string | undefined

  const [ dataResult ] = await Promise.allSettled([ 
    getOrganizations({ 
      page: Number(page), 
      per: Number(per), 
      sort, 
      search, 
      consortium: Boolean(consortium) 
    }) 
  ])
  if (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Organizations" 
      notFound 
      goBack={false}
    />
  )

  return (
    <>
      <div className="md:w-full w-[85%] mx-auto mt-3 mb-12 grid min-[2000px]:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.value.data.map((org, index) => (
          <ImgTextOn
            showIcon={org.attributes.consortium}
            tooltip={dictResult.tooltips.consortium}
            key={index}
            className={"md:aspect-[2/1] aspect-square"}
            title={org.attributes.title}
            src={org.attributes.image.data?.attributes.url}
            url={`/organizations/${org.attributes.slug}`}
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
          length={dataResult.value.meta.pagination.total}
          defaultPageSize={defaultPageSize}
        />
      </div>
    </>
  )
}
