import React, { Suspense } from "react";

import { Dictionary } from "@siberiana/schemas";
import { Separator, Skeleton } from "@siberiana/ui";

import { getDictionary } from "~/lib/utils/getDictionary";
import CountriesFilter from "./(artifacts)/CountriesFilter";
import CultureFilter from "./(artifacts)/CultureFilter";
import DistrictsFilter from "./(artifacts)/DistrictsFilter";
import LicensesFilter from "./(artifacts)/LicensesFilter";
import MonumentFilter from "./(artifacts)/MonumentFilter";
import RegionsFilter from "./(artifacts)/RegionsFilter";
import SetFilter from "./(artifacts)/SetFilter";
import SettlementsFilter from "./(artifacts)/SettlementsFilter";
import TechniqueFilter from "./(artifacts)/TechniqueFilter";
import ModelFilter from "./(artifacts)/ModelFilter";

export default async function ArtifactsFilters({
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

      {/* <Separator className="mb-3 mt-1 h-[2px]" decorative /> */}

      {/* Culture */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.cultures}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <CultureFilter searchParams={searchParams} />
      </Suspense>

      {/* Set */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">{dictResult.objects.filters.sets}</h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <SetFilter searchParams={searchParams} />
      </Suspense>

      {/* Monument */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.monuments}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <MonumentFilter searchParams={searchParams} />
      </Suspense>

      {/* Technique */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <h1 className="font-medium">
              {dictResult.objects.filters.techniques}
            </h1>
            <Skeleton className="mb-3 h-10 w-full px-4 py-2" />
          </div>
        }
      >
        <TechniqueFilter searchParams={searchParams} />
      </Suspense>

      <Separator className="mb-3 mt-1 h-[2px]" decorative />

      {/* 3D model */}
      <Suspense
        fallback={
          <div className="flex flex-col gap-1">
            <Skeleton className="mb-3 h-10 w-full px-2 py-2" />
          </div>
        }
      >
        <ModelFilter searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
