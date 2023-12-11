import React from "react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import Description from "~/components/objects/Description";
import PhotoZoom from "~/components/objects/PhotoZoom";
import BreadcrumbsObject from "~/components/ui/BreadcrumbsObject";
import GoBackButton from "~/components/ui/GoBackButton";
import { getHerbariumById } from "~/lib/queries/api-object";
import { getDictionary } from "~/lib/utils/getDictionary";
import MainInfoBlock from "./MainInfoBlock";

export const dynamic = "force-dynamic";

export default async function Herbarium({
  params: { id },
}: {
  params: { id: string };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  // const session = await getServerSession(authOptions);
  // const haveSession = !!session

  const [dataResult] = await Promise.allSettled([getHerbariumById(id)]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place={`Herbarium ${id}`}
        notFound
        goBack
      />
    );

  return (
    <div className="relative">
      <div className="absolute -top-10 left-0 sm:-left-8 sm:top-0 lg:-left-12">
        <GoBackButton />
      </div>

      <BreadcrumbsObject
        dict={dictResult.breadcrumbs}
        title={dataResult.value.displayName}
        categorySlug={dataResult.value.collection.category?.slug}
        categoryTitle={dataResult.value.collection.category?.displayName}
        collectionSlug={dataResult.value.collection.slug}
        collectionTitle={dataResult.value.collection.displayName}
      />

      <div className="items-stHerbarium mb-24 mt-10 flex flex-col gap-6 md:flex-row">
        <div className="w-full md:w-1/2">
          <div className="mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <h1 className="text-foreground text-xl font-bold uppercase lg:text-2xl">
              {dataResult.value.displayName}
            </h1>
          </div>

          <Description text={dataResult.value.description} />

          {/* Desktop Main Info */}
          <div className="mt-12 hidden md:block">
            <MainInfoBlock dict={dictResult.objects} data={dataResult.value} />
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <PhotoZoom
            src={dataResult.value.primaryImageURL}
            alt={dataResult.value.displayName}
          />
          <div className="mt-3 flex flex-wrap gap-3">
            {/* <AddFavorites session={haveSession} /> */}
            {/* <UnloadCSV session={haveSession} /> */}
          </div>
        </div>

        {/* Mobile Main Info */}
        <div className="mt-3 block w-full md:hidden">
          <MainInfoBlock dict={dictResult.objects} data={dataResult.value} />
        </div>
      </div>
    </div>
  );
}
