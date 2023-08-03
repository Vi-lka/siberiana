import React from "react";
import type { Metadata } from "next";
import { DictionarySchema } from "@siberiana/schemas";
import { getOrganizations } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";
import ImgTextOn from "~/components/thumbnails/ImgTextOn";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import ErrorHandler from "~/components/ui/ErrorHandler";
import PaginationControls from "~/components/ui/PaginationControls";

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

  const defaultPageSize = 1

  const page = searchParams['page'] ?? '1'
  const per = searchParams['per'] ?? defaultPageSize
  

  try {
    await getOrganizations(locale, Number(page), Number(per));
  } catch (error) {
    return <ErrorHandler locale={locale} error={error} place="Organizations" notFound />
  }

  const dataResult = await getOrganizations(locale, Number(page), Number(per));

  if (!dataResult) {
    return "Loading organizations ..."
  }

  return (
    <div>
      <Breadcrumbs dict={dictResult.breadcrumbs} />
      <div className="my-10 flex flex-row items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.organizations.title}
        </h1>
        Поиск
      </div>

      <div className="md:w-full w-[85%] mx-auto mb-12 grid md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.data.map((org, index) => (
          <ImgTextOn
            showIcon={org.attributes.consortium}
            icon="Consortium"
            tooltip={dict.tooltips.consortium}
            key={index}
            className={"md:aspect-[2/1] aspect-square"}
            title={org.attributes.title}
            src={org.attributes.image.data?.attributes.url}
            url={`/${locale}/organizations/${org.attributes.slug}`}
            origin={"strapi"}
            width={450}
            height={450}
          />
        ))}
      </div>

      <div className="mb-24">
        <PaginationControls
          dict={dict.pagination}
          length={dataResult.meta.pagination.total}
          defaultPageSize={defaultPageSize}
          path={`${locale}/organizations`}
        />
      </div>
    </div>
  );
}
