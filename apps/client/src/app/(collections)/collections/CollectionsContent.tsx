import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ImgTextBelow from "~/components/thumbnails/ImgTextBelow";
import PaginationControls from "~/components/ui/PaginationControls";
import { getCollections } from "~/lib/queries/api-collections";
import { getDictionary } from "~/lib/utils/getDictionary";
import getShortDescription from "~/lib/utils/getShortDescription";

export default async function CollectionsContent({
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
  const categories = searchParams["category"] as string | undefined;
  const sort = searchParams["sort"] as string | undefined;

  const first = Number(per);
  const offset = (Number(page) - 1) * Number(per);

  const [dataResult] = await Promise.allSettled([
    getCollections({ first, offset, search, categories, sort }),
  ]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="Collections"
        notFound
        goBack={false}
      />
    );

  function getCollectionHref(
    category: string | undefined,
    collection: string,
  ): string {
    if (!!category && category.length > 0) {
      return `/objects?category=${category}&collection=${collection}`;
    } else return `/objects?collection=${collection}`;
  }

  console.log(dataResult.value.edges[0].node.primaryImageURL);

  return (
    <>
      <div
        key={Math.random()}
        className="mx-auto mb-12 mt-3 grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-2 min-[2000px]:grid-cols-3 min-[3000px]:grid-cols-4 min-[4000px]:grid-cols-5"
      >
        {dataResult.value.edges.map((collection, index) => (
          <ImgTextBelow
            key={index}
            className={"aspect-[2.7/1]"}
            classNameImage={"w-full object-cover"}
            title={collection.node.displayName}
            src={collection.node.primaryImageURL}
            href={getCollectionHref(
              collection.node.category?.slug,
              collection.node.slug,
            )}
            width={800}
            height={400}
          >
            <div className="flex flex-col gap-3">
              <p className="text-base font-bold uppercase lg:text-xl">
                {collection.node.displayName}
              </p>

              <p className="font-Inter text-xs xl:text-sm">
                {getShortDescription(collection.node.description)}
              </p>

              <Link
                href={getCollectionHref(
                  collection.node.category?.slug,
                  collection.node.slug,
                )}
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
