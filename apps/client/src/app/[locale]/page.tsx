import { Suspense } from "react";
import { ChevronDown } from "lucide-react";

import ImgSliderHome from "~/components/ui/img-slider-home";
import { getSlider } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);

  const slider = await getSlider();

  return (
    <main className="flex h-[850vh] flex-col items-center justify-between">
      <div className="flex w-full flex-col items-center">
        <h1 className="text-graphite dark:text-beaverLight font-OpenSans mb-6 mt-10 w-[90%] text-center text-base font-bold uppercase sm:text-xl md:mb-1 md:max-w-[50rem] lg:max-w-[60rem] lg:text-2xl xl:max-w-[70rem] xl:text-3xl">
          {dict.homeTitle}
        </h1>

        {/* TODO:Skeleton */}
        <Suspense fallback={<p>Loading...</p>}>
          <ImgSliderHome data={slider} />
        </Suspense>
      </div>

      <ChevronDown className="text-beaver dark:text-beaverLight h-10 w-10 lg:h-12 lg:w-12" />
    </main>
  );
}
