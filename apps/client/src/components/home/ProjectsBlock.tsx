import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Dictionary } from "@siberiana/schemas";

import ImgTextBelow from "~/components/thumbnails/ImgTextBelow";
import { getProjects } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";
import getLinkDir from "~/lib/utils/getLinkDir";
import ErrorHandler from "../errors/ErrorHandler";

export default async function ProjectsBlock() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const [dataResult] = await Promise.allSettled([
    getProjects({ page: 1, per: 2 }),
  ]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="Projects Block"
        notFound
        goBack={false}
      />
    );

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.projects.title}
        </h1>
        <Link
          href={`/projects`}
          className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
        >
          <p className="hidden md:block">{dictResult.projects.textUrl}</p>
          <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
        </Link>
      </div>
      <div className="mx-auto my-12 grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-2">
        {dataResult.value.data.map((proj, index) => (
          <ImgTextBelow
            key={index}
            className={"aspect-[2.7/1]"}
            classNameImage={"w-full object-cover"}
            title={proj.attributes.title}
            src={proj.attributes.image.data?.attributes.url}
            href={getLinkDir(proj.attributes.url)}
            target="_blank"
            width={800}
            height={400}
          >
            <div className="flex flex-col gap-3">
              <p className="text-base font-bold uppercase lg:text-xl">
                {proj.attributes.title}
              </p>

              <p className="font-Inter text-xs xl:text-sm">
                {proj.attributes.description}
              </p>

              <Link
                href={getLinkDir(proj.attributes.url)}
                target="_blank"
                className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
              >
                <p className="hidden md:block">{dictResult.projects.goTo}</p>
                <ArrowRight className="h-6 w-6 stroke-1" />
              </Link>
            </div>
          </ImgTextBelow>
        ))}
      </div>
    </>
  );
}
