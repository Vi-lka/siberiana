import React from "react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ObjectsGrid from "~/components/objects/tabs/ObjectsGrid";
import { ClientHydration } from "~/components/providers/ClientHydration";
import ObjectsCounter from "~/components/providers/ObjectsCounter";
import MasonrySkeleton from "~/components/skeletons/MasonrySkeleton";
import PaginationControls from "~/components/ui/PaginationControls";
import { getBooks } from "~/lib/queries/api-collections";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function Books({
  searchParams,
  defaultPageSize,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
  defaultPageSize: number;
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const search = searchParams["search"] as string | undefined;

  const categories = searchParams["category"] as string | undefined;
  const collections = searchParams["collection"] as string | undefined;

  const countryIds = searchParams["countryBooks"] as string | undefined;
  const regionIds = searchParams["regionBooks"] as string | undefined;
  const districtIds = searchParams["districtBooks"] as string | undefined;
  const settlementIds = searchParams["settlementBooks"] as string | undefined;

  const licenseIds = searchParams["licenseBooks"] as string | undefined;

  const bookGenreIds = searchParams["bookGenre"] as string | undefined;

  const sort = searchParams["sort"] as string | undefined;
  const page = searchParams["page_books"] ?? "1";
  const per = searchParams["per_books"] ?? defaultPageSize;

  const first = Number(per);
  const offset = (Number(page) - 1) * Number(per);

  const [dataResult] = await Promise.allSettled([
    getBooks({
      first,
      offset,
      search,
      sort,
      categories,
      collections,
      countryIds,
      regionIds,
      districtIds,
      settlementIds,
      licenseIds,
      bookGenreIds,
    }),
  ]);
  if (dataResult.status === "rejected")
    return (
      <>
        <ErrorHandler
          error={dataResult.reason as unknown}
          place="Books"
          notFound
          goBack={false}
        />
        <ObjectsCounter booksCount={0} />
      </>
    );

  return (
    <div className="w-full">
      <ClientHydration fallback={<MasonrySkeleton />}>
        <ObjectsGrid data={dataResult.value} hrefTo={"book"} type="books" />
        <div className="mb-24 mt-6">
          <PaginationControls
            dict={dictResult.pagination}
            length={dataResult.value.totalCount}
            defaultPageSize={defaultPageSize}
            classNameMore="xl:left-[38%]"
            pageParam={"page_books"}
            perParam={"per_books"}
          />
        </div>
      </ClientHydration>

      <ObjectsCounter booksCount={dataResult.value.totalCount} />
    </div>
  );
}
