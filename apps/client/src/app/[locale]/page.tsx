import { Suspense } from "react";
import { ArrowDown } from "lucide-react";
import HomeSearch from "~/components/home/HomeSearch";
import { getDictionary } from "~/lib/utils/getDictionary";
import HomeSliderServer from "~/components/home/HomeSliderServer";
import HomeSliderSkeleton from "~/components/skeletons/HomeSliderSkeleton";
import Quiz from "~/components/home/Quiz";
import ReactQueryProvider from "~/lib/utils/ReactQueryProvider";
import ImgTextOn from "~/components/thumbnails/ImgTextOn";
import CustomBlock from "~/components/home/CustomBlock";
import RowBlockSkeleton from "~/components/skeletons/RowBlockSkeleton";
import { DictionarySchema } from "@siberiana/schemas";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);

  const dictSave = DictionarySchema.parse(dict);

  return (
    <main className="font-Inter">
      <div className="hero flex flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-graphite dark:text-beaverLight font-OpenSans mb-6 mt-10 w-[90%] text-center text-lg font-bold uppercase sm:text-xl md:mb-1 md:max-w-[50rem] lg:max-w-[60rem] lg:text-2xl xl:max-w-[70rem] xl:text-3xl">
            {dictSave.homeTitle}
          </h1>

          <Suspense fallback={<HomeSliderSkeleton />}>
            <HomeSliderServer />
          </Suspense>
        </div>

        <HomeSearch text={dictSave.search} />

        <ArrowDown className="text-beaver dark:text-beaverLight h-10 w-10 lg:h-12 lg:w-12 mt-4 stroke-1" />
      </div>

      <div className="font-OpenSans max-w-[1600px] w-[85%] mx-auto mt-16 mb-24">
        <h1 className="text-2xl font-bold text-foreground uppercase mb-10">
          {dictSave.categories.title}
        </h1>
        
        <div 
          className="grid gap-5 md:grid-cols-4 grid-cols-1"
        >
          {
            dictSave.categories.list.map((category, index) => (
              <ImgTextOn 
                key={index}
                title={category.title}
                src={category.img}
                url={category.url}
                origin={"next"}
              />
            ))
          }
        </div>
      </div>

      <div className="max-w-[1600px] w-[85%] mx-auto mb-24">
        <ReactQueryProvider>
          <Quiz text={dictSave.quiz} />
        </ReactQueryProvider>
      </div>

      <Suspense fallback={<RowBlockSkeleton />}>
        <CustomBlock locale={locale} />
      </Suspense>


    </main>
  );
}
