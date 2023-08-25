import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCustomBlock } from "~/lib/queries/strapi-server";
import getLinkDir from "~/lib/utils/getLinkDir";
import ImgTextOn from "../thumbnails/ImgTextOn";
import ErrorHandler from "../errors/ErrorHandler";

export default async function CustomBlock() {

  const [ dataResult ] = await Promise.allSettled([ getCustomBlock() ])
  if  (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Custom Block" 
      goBack={false}
    />
  )

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dataResult.value.title}
        </h1>

        <Link
          href={getLinkDir(dataResult.value.url)}
          className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
        >
          <p className="hidden md:block">{dataResult.value.textUrl}</p>
          <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
        </Link>
      </div>

      <div className="md:w-full w-[85%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4">
        {dataResult.value.list.map((elem, index) => (
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
