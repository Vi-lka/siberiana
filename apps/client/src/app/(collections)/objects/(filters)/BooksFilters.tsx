import React, { Suspense } from "react";

import { Dictionary } from "@siberiana/schemas";
import { Separator, Skeleton } from "@siberiana/ui";

import { getDictionary } from "~/lib/utils/getDictionary";
import BookGenreFilter from "./(books)/BookGenreFilter";
import CountriesFilter from "./(books)/CountriesFilter";
import DistrictsFilter from "./(books)/DistrictsFilter";
import LicensesFilter from "./(books)/LicensesFilter";
import RegionsFilter from "./(books)/RegionsFilter";
import SettlementsFilter from "./(books)/SettlementsFilter";

export default async function BooksFilters({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  return (
    <div className="mt-3" key={Math.random()}>
      {/* Countries */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.countries}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <CountriesFilter searchParams={searchParams} />
      </Suspense>

      {/* Regions */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.regions}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <RegionsFilter searchParams={searchParams} />
      </Suspense>

      {/* Districts */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.districts}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <DistrictsFilter searchParams={searchParams} />
      </Suspense>

      {/* Settlements */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.settlements}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <SettlementsFilter searchParams={searchParams} />
      </Suspense>

      <Separator className="mb-3 mt-1 h-[2px]" decorative />

      {/* License */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.license}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <LicensesFilter searchParams={searchParams} />
      </Suspense>

      <Separator className="mb-3 mt-1 h-[2px]" decorative />

      {/* Book Genre */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.bookGenre}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <BookGenreFilter searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
