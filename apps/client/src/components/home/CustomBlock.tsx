import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ZodError } from "zod";

import type { ErrorsDictType } from "@siberiana/schemas";

import { getCustomBlock } from "~/lib/queries/strapi-server";
import getLinkDir from "~/lib/utils/getLinkDir";
import ImgTextOn from "../thumbnails/ImgTextOn";
import ErrorToast from "../ui/ErrorToast";

export default async function CustomBlock({
  locale,
  errorText,
}: {
  locale: string;
  errorText: ErrorsDictType;
}) {
  try {
    await getCustomBlock(locale);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      return <ErrorToast dict={errorText} error={error.issues} />;
    } else {
      return <ErrorToast dict={errorText} error={(error as Error).message} />;
    }
  }

  const dataResult = await getCustomBlock(locale);

  return (
    <div className="font-OpenSans mx-auto mb-24 w-[85%] max-w-[1600px]">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dataResult.title}
        </h1>

        <Link
          href={getLinkDir(dataResult.url, locale)}
          className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
        >
          <p className="hidden md:block">{dataResult.textUrl}</p>
          <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {dataResult.list.map((elem, index) => (
          <ImgTextOn
            showIcon={false}
            key={index}
            className={"aspect-square"}
            title={elem.title}
            src={elem.img.data?.attributes.url}
            url={getLinkDir(elem.url, locale)}
            origin={"strapi"}
          />
        ))}
      </div>
    </div>
  );
}
