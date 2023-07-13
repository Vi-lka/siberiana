import React from "react";
import type { Metadata } from "next";
import { ZodError } from "zod";

import { DictionarySchema } from "@siberiana/schemas";

import ErrorToast from "~/components/ui/ErrorToast";
import { getOrganizations } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";
import ImgTextOn from "~/components/thumbnails/ImgTextOn";
import Breadcrumbs from "~/components/ui/Breadcrumbs";

export const metadata: Metadata = {
  title: "Организации",
};

// export const runtime = "edge";

export default async function Organizations({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);
  const dictResult = DictionarySchema.parse(dict);

  try {
    await getOrganizations(locale);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      return <ErrorToast dict={dictResult.errors} error={error.issues} />;
    } else {
      return (
        <ErrorToast dict={dictResult.errors} error={(error as Error).message} />
      );
    }
  }

  const dataResult = await getOrganizations(locale);

  return (
    <>
      <Breadcrumbs dict={dictResult.breadcrumbs} />
      <div className="my-10 flex flex-row items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.organizations.title}
        </h1>
        Поиск
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {dataResult.map((org, index) => (
          <ImgTextOn
            showIcon={org.attributes.consortium}
            icon="Consortium"
            tooltip={dict.tooltips.consortium}
            key={index}
            className={"md:aspect-[2/1] aspect-square"}
            title={org.attributes.title}
            src={org.attributes.image.data?.attributes.url}
            url={`${locale}/organizations/${org.attributes.slug}`}
            origin={"strapi"}
            width={450}
            height={450}
          />
        ))}
      </div>
    </>);
}
