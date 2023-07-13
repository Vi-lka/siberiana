import React from "react";
import { ZodError } from "zod";

import type { ErrorsDictType } from "@siberiana/schemas";

import { getOrganizations } from "~/lib/queries/strapi-server";
import ImgTextOn from "../thumbnails/ImgTextOn";
import ErrorToast from "../ui/ErrorToast";

export default async function OrganizationsBlock({
  locale,
  errorText,
}: {
  locale: string;
  errorText: ErrorsDictType;
}) {
  try {
    await getOrganizations(locale);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      return <ErrorToast dict={errorText} error={error.issues} />;
    } else {
      return <ErrorToast dict={errorText} error={(error as Error).message} />;
    }
  }

  const dataResult = await getOrganizations(locale);

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
    <div className="grid aspect-auto grid-flow-row-dense grid-cols-1 grid-rows-5 gap-6 md:aspect-[4/2] md:grid-cols-4 md:grid-rows-2">
      {dataResult.map((org, index) => (
        <ImgTextOn
          key={index}
          className={handleClassName(index)}
          title={org.attributes.title}
          src={org.attributes.image.data?.attributes.url}
          url={`${locale}/organizations/${org.attributes.slug}`}
          origin={"strapi"}
          width={450}
          height={450}
        />
      ))}
    </div>
  );
}
