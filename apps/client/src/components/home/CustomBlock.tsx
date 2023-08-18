import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCustomBlock } from "~/lib/queries/strapi-server";
import getLinkDir from "~/lib/utils/getLinkDir";
import ImgTextOn from "../thumbnails/ImgTextOn";
import ErrorToast from "../errors/ErrorToast";
import { getDictionary } from "~/lib/utils/getDictionary";
import { DictionarySchema } from "@siberiana/schemas";
import { ZodError } from "zod";

export default async function CustomBlock() {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  try {
    await getCustomBlock();
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      return <ErrorToast dict={dictResult.errors} error={error.issues} place="Custom" />;
    } else {
      return <ErrorToast dict={dictResult.errors} error={(error as Error).message} place="Custom" />;
    }
  }

  const dataResult = await getCustomBlock();

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dataResult.title}
        </h1>

        <Link
          href={getLinkDir(dataResult.url)}
          className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
        >
          <p className="hidden md:block">{dataResult.textUrl}</p>
          <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
        </Link>
      </div>

      <div className="md:w-full w-[85%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4">
        {dataResult.list.map((elem, index) => (
          <ImgTextOn
            key={index}
            className={"aspect-square"}
            title={elem.title}
            src={elem.img.data?.attributes.url}
            url={getLinkDir(elem.url)}
            origin={"strapi"}
          />
        ))}
      </div>
    </>
  );
}
