import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ImgTextBelow from "~/components/thumbnails/ImgTextBelow";
import PaginationControls from "~/components/ui/PaginationControls";
import { getServices } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";
import getLinkDir from "~/lib/utils/getLinkDir";

export default async function ServicesContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const defaultPageSize = 12;

  const page = searchParams["page"] ?? "1";
  const per = searchParams["per"] ?? defaultPageSize;
  const sort = searchParams["sort"] as string | undefined;
  const search = searchParams["search"] as string | undefined;

  const [dataResult] = await Promise.allSettled([
    getServices({ page: Number(page), per: Number(per), sort, search }),
  ]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="Services"
        notFound
        goBack={false}
      />
    );

  return (
    <>
      <div
        key={Math.random()}
        className="mx-auto mb-12 mt-3 grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-2 min-[2000px]:grid-cols-3 min-[3000px]:grid-cols-4 min-[4000px]:grid-cols-5"
      >
        {dataResult.value.data.map((service, index) => (
          <ImgTextBelow
            key={index}
            className={"aspect-[2.7/1]"}
            classNameImage={"w-full object-contain"}
            title={service.attributes.title}
            src={service.attributes.image.data?.attributes.url}
            href={getLinkDir(service.attributes.url)}
            target="_blank"
            width={700}
            height={300}
          >
            <div className="flex flex-col gap-3">
              <p className="text-base font-bold uppercase lg:text-xl">
                {service.attributes.title}
              </p>

              <p className="font-Inter text-xs xl:text-sm">
                {service.attributes.description}
              </p>

              <Link
                href={getLinkDir(service.attributes.url)}
                target="_blank"
                className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
              >
                <p className="hidden md:block">{dictResult.services.goTo}</p>
                <ArrowRight className="h-6 w-6 stroke-1" />
              </Link>
            </div>
          </ImgTextBelow>
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
  );
}
