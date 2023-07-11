import { Suspense } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import HomeSearch from "~/components/home/HomeSearch";
import { getDictionary } from "~/lib/utils/getDictionary";
import HomeSliderServer from "~/components/home/HomeSliderServer";
import HomeSliderSkeleton from "~/components/skeletons/HomeSliderSkeleton";
// import ReactQueryProvider from "~/lib/utils/ReactQueryProvider";
import ImgTextOn from "~/components/thumbnails/ImgTextOn";
import CustomBlock from "~/components/home/CustomBlock";
import RowBlockSkeleton from "~/components/skeletons/RowBlockSkeleton";
import { DictionarySchema } from "@siberiana/schemas";
import OrganizationsBlock from "~/components/home/OrganizationsBlock";
import Link from "next/link";
import GridBlockSkeleton from "~/components/skeletons/GridBlockSkeleton";
import dynamic from "next/dynamic";

const Quiz = dynamic(() => import('~/components/home/Quiz'))

export const runtime = 'edge' 

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);

  const dataResult = DictionarySchema.parse(dict);

  return (
    <main className="font-Inter flex flex-col">

      {/* HERO */}
      <div className="hero flex flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-graphite dark:text-beaverLight font-OpenSans mb-6 mt-10 w-[90%] text-center text-lg font-bold uppercase sm:text-xl md:mb-1 md:max-w-[50rem] lg:max-w-[60rem] lg:text-2xl xl:max-w-[70rem] xl:text-3xl">
            {dataResult.homeTitle}
          </h1>

          <Suspense fallback={<HomeSliderSkeleton />}>
            <HomeSliderServer />
          </Suspense>
        </div>

        <HomeSearch text={dataResult.search} />

        <ArrowDown className="text-beaver dark:text-beaverLight h-10 w-10 lg:h-12 lg:w-12 mt-4 stroke-1" />
      </div>

      {/* CATEGORIES */}
      <div className="font-OpenSans max-w-[1600px] w-[85%] mx-auto mt-16 mb-24">
        <h1 className="text-2xl font-bold text-foreground uppercase mb-10">
          {dataResult.categories.title}
        </h1>
        
        <div 
          className="grid gap-6 md:grid-cols-4 grid-cols-1"
        >
          {
            dataResult.categories.list.map((category, index) => (
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
      
      {/* QUIZ */}
      <div className="max-w-[1600px] w-[85%] mx-auto mb-24">
        <Quiz text={dataResult.quiz} />
      </div>

      {/* CUSTOM */}
      <Suspense fallback={<RowBlockSkeleton />}>
        <CustomBlock locale={locale} />
      </Suspense>

      {/* ORGANIZATIONS */}
      <div className="font-OpenSans max-w-[1600px] w-[85%] mx-auto mb-24">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-2xl font-bold text-foreground uppercase">
            {dataResult.organizations.title}
          </h1>
          <Link 
            href={`${locale}${dataResult.organizations.url}`}
            className='flex gap-3 font-Inter uppercase text-beaver dark:text-beaverLight hover:underline'
          >
            <p className='md:block hidden'>{dataResult.organizations.textUrl}</p>
            <ArrowRight className="lg:h-6 lg:w-6 h-10 w-10 stroke-1" />
          </Link>
        </div>

        <Suspense fallback={<GridBlockSkeleton />}>
          <OrganizationsBlock locale={locale} />
        </Suspense>
      </div>

    </main>
  );
}
