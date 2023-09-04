import { Suspense } from "react";
import dynamic from "next/dynamic";
import { ArrowDown } from "lucide-react";
import { Dictionary } from "@siberiana/schemas";
import CustomBlock from "~/components/home/CustomBlock";
import HomeSearch from "~/components/home/HomeSearch";
import HomeSliderServer from "~/components/home/HomeSliderServer";
import OrganizationsBlock from "~/components/home/OrganizationsBlock";
import GridBlockSkeleton from "~/components/skeletons/GridBlockSkeleton";
import HomeSliderSkeleton from "~/components/skeletons/HomeSliderSkeleton";
import RowBlockSkeleton from "~/components/skeletons/RowBlockSkeleton";
import { getDictionary } from "~/lib/utils/getDictionary";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";
import ProjectsBlock from "~/components/home/ProjectsBlock";
import { Skeleton } from "@siberiana/ui";
import CategoriesBlock from "~/components/home/CategoriesBlock";

const Quiz = dynamic(() => import("~/components/home/Quiz"));

export default async function Home() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  return (
    <main className="font-Inter flex flex-col">
      {/* HERO */}
      <div className="hero flex flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-graphite dark:text-beaverLight font-OpenSans mb-6 mt-10 w-[90%] text-center text-lg font-bold uppercase sm:text-xl md:mb-1 md:max-w-[50rem] lg:max-w-[60rem] lg:text-2xl xl:max-w-[70rem] xl:text-3xl">
            {dictResult.homeTitle}
          </h1>

          <Suspense fallback={<HomeSliderSkeleton />}>
            <HomeSliderServer />
          </Suspense>
        </div>

        <HomeSearch dict={dictResult.search} />

        <ArrowDown className="text-beaver dark:text-beaverLight mt-4 h-10 w-10 stroke-1 lg:h-12 lg:w-12" />
      </div>

      {/* CATEGORIES */}
      <div className="mx-auto mb-24 w-[85%] max-w-[1600px] font-OpenSans">
        <Suspense fallback={
          <>
            <div className="mb-10 flex items-center justify-between">
              <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
              <Skeleton className="h-full w-[20%] py-5" />
            </div>
            <RowBlockSkeleton />
          </>
        }>
            <CategoriesBlock />
        </Suspense>
      </div>

      {/* QUIZ */}
      <div className="mx-auto w-[85%] max-w-[1600px]">
        <Quiz qiuzDict={dictResult.quiz} errorDict={dictResult.errors} />
      </div>

      {/* CUSTOM */}
      <div className="mx-auto w-[85%] max-w-[1600px] font-OpenSans">
        <Suspense fallback={
          <div className="mb-24">
            <div className="mb-10 flex items-center justify-between">
              <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
              <Skeleton className="h-full w-[20%] py-5" />
            </div>
            <RowBlockSkeleton />
          </div>
        }>
            <CustomBlock />
        </Suspense>
      </div>

      {/* ORGANIZATIONS */}
      <div className="mx-auto mb-24 w-[85%] max-w-[1600px] font-OpenSans">
        <Suspense fallback={
          <>
            <div className="mb-10 flex items-center justify-between">
              <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
              <Skeleton className="h-full w-[20%] py-5" />
            </div>
            <GridBlockSkeleton />
          </>
        }>
          <OrganizationsBlock />
        </Suspense>
      </div>

      {/* PROJECTS */}
      <div className="mx-auto mb-24 w-[85%] max-w-[1600px] font-OpenSans">
        <Suspense fallback={
          <>
            <div className="mb-10 flex items-center justify-between">
              <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
              <Skeleton className="h-full w-[20%] py-5" />
            </div>
            <RowBigBlockSkeleton />
          </>
        }>
          <ProjectsBlock />
        </Suspense>
      </div>
    </main>
  );
}
