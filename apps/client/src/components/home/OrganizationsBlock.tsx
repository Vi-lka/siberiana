import React from "react";
import { ZodError } from "zod";

import type { DictionaryType } from "@siberiana/schemas";

import { getOrganizations } from "~/lib/queries/strapi-server";
import ImgTextOn from "../thumbnails/ImgTextOn";
import ErrorToast from "../errors/ErrorToast";
import { PiHandshakeLight } from "react-icons/pi";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default async function OrganizationsBlock({
  locale,
  dict,
}: {
  locale: string;
  dict: DictionaryType;
}) {
  try {
    await getOrganizations(locale, 1, 5);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      return <ErrorToast dict={dict.errors} error={error.issues} place="OrganizationsHome" />;
    } else {
      return <ErrorToast dict={dict.errors} error={(error as Error).message} place="OrganizationsHome" />;
    }
  }

  const dataResult = await getOrganizations(locale, 1, 5);

  function handleClassName(index: number) {
    switch (index) {
      case 0:
        return "md:row-span-1 md:col-span-2 md:aspect-auto aspect-square row-span-1 col-span-1";

      case 1:
        return "md:row-span-1 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1";

      case 2:
        return "md:row-span-2 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1";

      case 3:
        return "md:row-span-1 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1";

      case 4:
        return "md:row-span-1 md:col-span-2 md:aspect-auto aspect-square row-span-1 col-span-1";

      default:
        break;
    }
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dict.organizations.title}
        </h1>
        <Link
          href={`${locale}${dict.organizations.url}`}
          className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
        >
          <p className="hidden md:block">
            {dict.organizations.textUrl}
          </p>
          <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
        </Link>
      </div>

      <div className="md:w-full w-[85%] mx-auto grid aspect-auto grid-flow-row-dense md:aspect-[4/2] md:grid-cols-4 md:grid-rows-2 grid-cols-1 grid-rows-5 gap-6">
        {dataResult.data.map((org, index) => (
          <ImgTextOn
            showIcon={org.attributes.consortium}
            tooltip={dict.tooltips.consortium}
            key={index}
            className={handleClassName(index)}
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
    </>
  );
}
