import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ImgTextBelow from "~/components/thumbnails/ImgTextBelow";
import PaginationControls from "~/components/ui/PaginationControls";
import { getCategories } from "~/lib/queries/api-collections";
import { getDictionary } from "~/lib/utils/getDictionary";
import getShortDescription from "~/lib/utils/getShortDescription";

export default async function CategoriesContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const defaultPageSize = 12;

  const page = searchParams["page"] ?? "1";
  const per = searchParams["per"] ?? defaultPageSize;
  const search = searchParams["search"] as string | undefined;
  const sort = searchParams["sort"] as string | undefined;

  const first = per;
  const offset = (Number(page) - 1) * Number(per);

  const [dataResult] = await Promise.allSettled([
    getCategories({ first: Number(first), offset, search, sort }),
  ]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="Categories"
        notFound
        goBack={false}
      />
    );

  return (
    <>
      <div
        key={Math.random()}
        className="mx-auto mb-12 mt-3 grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-2 min-[2000px]:grid-cols-3"
      >
        {dataResult.value.edges.map((category, index) => (
          <ImgTextBelow
            key={index}
            className={"aspect-[2.7/1]"}
            classNameImage={"w-full object-cover"}
            title={category.node.displayName}
            src={category.node.primaryImageURL}
            href={`/collections?category=${category.node.slug}`}
            width={810}
            height={300}
          >
            <div className="flex flex-col gap-3">
              <p className="text-base font-bold uppercase lg:text-xl">
                {category.node.displayName}
              </p>

              <p className="font-Inter text-xs xl:text-sm">
                {getShortDescription(category.node.description)}
              </p>

              <Link
                href={`/collections?category=${category.node.slug}`}
                className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
              >
                <p className="hidden md:block">{dictResult.categories.goTo}</p>
                <ArrowRight className="h-6 w-6 stroke-1" />
              </Link>
            </div>
          </ImgTextBelow>
        ))}
      </div>

      <div className="mb-24">
        <PaginationControls
          dict={dictResult.pagination}
          length={dataResult.value.totalCount}
          defaultPageSize={defaultPageSize}
        />
      </div>
    </>
  );
}
