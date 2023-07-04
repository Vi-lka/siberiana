import { Suspense } from "react";
import { ArrowDown } from "lucide-react";

import HomeSearch from "~/components/home/HomeSearch";
import { getDictionary } from "~/lib/utils/getDictionary";
import HomeSliderServer from "~/components/home/HomeSliderServer";
import HomeSliderSkeleton from "~/components/skeletons/HomeSliderSkeleton";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);

  return (
    <main className="font-Inter">
      <div className="flex h-[87vh] flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-graphite dark:text-beaverLight font-OpenSans mb-6 mt-10 w-[90%] text-center text-base font-bold uppercase sm:text-xl md:mb-1 md:max-w-[50rem] lg:max-w-[60rem] lg:text-2xl xl:max-w-[70rem] xl:text-3xl">
            {dict.homeTitle}
          </h1>

          {/* TODO:Skeleton */}
          <Suspense fallback={<HomeSliderSkeleton />}>
            <HomeSliderServer />
          </Suspense>
        </div>

        <HomeSearch text={dict.search} />

        <ArrowDown className="text-beaver dark:text-beaverLight h-10 w-10 lg:h-12 lg:w-12 mt-4 stroke-1" />
      </div>
    </main>
  );
}
