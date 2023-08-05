import React from "react";
import type { Metadata } from "next";
import type { SortDataType } from "@siberiana/schemas";
import { DictionarySchema } from "@siberiana/schemas";
import { getOrganizations } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";
import ImgTextOn from "~/components/thumbnails/ImgTextOn";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import ErrorHandler from "~/components/ui/ErrorHandler";
import PaginationControls from "~/components/ui/PaginationControls";
import Sort from "~/components/ui/Sort";
import SearchField from "~/components/ui/SearchField";
import { PiHandshakeLight } from "react-icons/pi";
import ToggleFilter from "~/components/ui/ToggleFilter";

export const metadata: Metadata = {
  title: "Организации",
};

export default async function Organizations({
  params: { locale },
  searchParams,
}: {
  params: { locale: string },
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

  const sortData = [
    { val: 'title:asc', text: `${dictResult.sort.byName}: ${dictResult.sort.ascText}` },
    { val: 'title:desc', text: `${dictResult.sort.byName}: ${dictResult.sort.descText}` },
  ] as SortDataType[]

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
      >
        <Breadcrumbs dict={dictResult.breadcrumbs} />

        <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col items-start justify-between">
          <h1 className="text-foreground text-2xl font-bold uppercase">
            {dictResult.organizations.title}
          </h1>

          <div className="flex flex-grow gap-6 items-center justify-end md:w-fit w-full">
            <ToggleFilter 
              tooltip={dictResult.tooltips.consortium} 
              param={'consortium'}
            >
              <PiHandshakeLight className="h-6 w-6" />
            </ToggleFilter>

            <Sort 
              dict={dictResult.sort}
              data={sortData}
            />
          </div>
        </div>

        <SearchField 
          placeholder={dictResult.search.button}
        />
      </ErrorHandler>
    )
  }

  const dataResult = await getOrganizations(locale, Number(page), Number(per), sort, search, Boolean(consortium));

  return (
    <div>
      <Breadcrumbs dict={dictResult.breadcrumbs} />

      <div className="mt-10 mb-4 flex gap-4 md:flex-row flex-col md:items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.organizations.title}
        </h1>

        <div className="flex flex-grow gap-6 items-center md:justify-end justify-between md:w-fit w-full">
            <ToggleFilter 
              tooltip={dictResult.tooltips.consortium} 
              param={'consortium'}
            >
              <PiHandshakeLight className="h-6 w-6" />
            </ToggleFilter>

          <Sort 
            dict={dictResult.sort}
            data={sortData}
          />
        </div>
      </div>

      <SearchField 
        placeholder={dictResult.search.button}
      />

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
            width={450}
            height={450}
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
    </div>
  );
}
