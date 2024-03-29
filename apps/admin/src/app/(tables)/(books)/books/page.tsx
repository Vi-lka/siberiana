import React, { Suspense } from "react";
import { ArrowBigUp, Loader2 } from "lucide-react";

import CategoryFilter from "~/components/filters/CategoryFilter";
import CollectionFilter from "~/components/filters/CollectionFilter";
import RefreshPage from "~/components/RefreshPage";
import TablesBooks from "./TablesBooks";

export const dynamic = "force-dynamic";

export default function BooksPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = searchParams["category"] as string | undefined;
  const collection = searchParams["collection"] as string | undefined;

  return (
    <div
      key={Math.random()}
      className="font-OpenSans px-2 py-3 md:ml-[14rem] md:py-10"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-1 flex-col gap-2 text-sm md:flex-row">
          <div className="">
            <CategoryFilter booksType />
            {!(!!category || !!collection) ? (
              <div className="flex flex-col items-center text-center">
                <ArrowBigUp />
                <p>Выберите категорию</p>
              </div>
            ) : null}
          </div>

          <div className="">
            <CollectionFilter booksType searchParams={searchParams} />
            {!(!!category || !!collection) ? (
              <div className="flex flex-col items-center text-center">
                <ArrowBigUp />
                <p>Или коллекцию</p>
              </div>
            ) : null}
            {!!category && !!!collection ? (
              <div className="flex flex-col items-center text-center">
                <ArrowBigUp />
                <p>Выберите коллекцию</p>
              </div>
            ) : null}
          </div>
        </div>

        <RefreshPage />
      </div>

      {!!collection ? (
        <Suspense
          fallback={<Loader2 className="mx-auto h-12 w-12 animate-spin" />}
        >
          <TablesBooks searchParams={searchParams} />
        </Suspense>
      ) : null}
    </div>
  );
}
