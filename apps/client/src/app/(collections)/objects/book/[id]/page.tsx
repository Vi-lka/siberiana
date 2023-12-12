import { Suspense } from "react";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import Description from "~/components/objects/Description";
import PhotoSlider from "~/components/objects/PhotoSlider";
import PhotoZoom from "~/components/objects/PhotoZoom";
import SimilarObjects from "~/components/objects/SimilarObjects";
import ReadPDF from "~/components/objects/buttons/ReadPDF";
import SimilarObjectsSkeleton from "~/components/skeletons/SimilarObjectsSkeleton";
import BreadcrumbsObject from "~/components/ui/BreadcrumbsObject";
import GoBackButton from "~/components/ui/GoBackButton";
import { getBookById } from "~/lib/queries/api-object";
import { ObjectsTypes } from "~/lib/queries/api-similar-objects";
import { getDictionary } from "~/lib/utils/getDictionary";
import MainInfoBlock from "./MainInfoBlock";

export const dynamic = "force-dynamic";

export default async function Book({
  params: { id },
}: {
  params: { id: string };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  // const session = await getServerSession(authOptions);
  // const haveSession = !!session

  const [dataResult] = await Promise.allSettled([getBookById(id)]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place={`Book ${id}`}
        notFound
        goBack
      />
    );

  const firstImage = {
    src: dataResult.value.primaryImageURL,
    alt: dataResult.value.displayName,
  };
  const additionalImages = dataResult.value.additionalImagesUrls?.map((url) => {
    return { src: url, alt: dataResult.value.displayName };
  });
  const images = !!additionalImages
    ? [firstImage, ...additionalImages]
    : [firstImage];

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

      <div className="mb-24 mt-10 flex flex-col items-start gap-6 md:flex-row">
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
          {images.length === 1 ? (
            <PhotoZoom
              src={dataResult.value.primaryImageURL}
              alt={dataResult.value.displayName}
            />
          ) : (
            <PhotoSlider data={images} />
          )}
          <div className="mt-3 flex flex-wrap gap-3">
            {/* <AddFavorites session={haveSession} /> */}
            <ReadPDF files={dataResult.value.files} />
            {/* <UnloadCSV session={haveSession} /> */}
          </div>
        </div>

        {/* Mobile Main Info */}
        <div className="mt-3 block w-full md:hidden">
          <MainInfoBlock dict={dictResult.objects} data={dataResult.value} />
        </div>
      </div>

      <Suspense fallback={<SimilarObjectsSkeleton />}>
        <SimilarObjects
          title={dict.objects.similar}
          primaryImageURL={dataResult.value.primaryImageURL}
          type={ObjectsTypes.books}
          removeLastPath={images.length > 1}
        />
      </Suspense>
    </div>
  );
}
