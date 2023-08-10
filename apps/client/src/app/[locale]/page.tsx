import { Suspense } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowDown, ArrowRight } from "lucide-react";
import { DictionarySchema } from "@siberiana/schemas";
import CustomBlock from "~/components/home/CustomBlock";
import HomeSearch from "~/components/home/HomeSearch";
import HomeSliderServer from "~/components/home/HomeSliderServer";
import OrganizationsBlock from "~/components/home/OrganizationsBlock";
import GridBlockSkeleton from "~/components/skeletons/GridBlockSkeleton";
import HomeSliderSkeleton from "~/components/skeletons/HomeSliderSkeleton";
import RowBlockSkeleton from "~/components/skeletons/RowBlockSkeleton";
import ImgTextOn from "~/components/thumbnails/ImgTextOn";
import { getDictionary } from "~/lib/utils/getDictionary";
import RowBigBlockSkeleton from "~/components/skeletons/RowBigBlockSkeleton";
import ProjectsBlock from "~/components/home/ProjectsBlock";

const Quiz = dynamic(() => import("~/components/home/Quiz"));

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);
  const dictResult = DictionarySchema.parse(dict);

  return (
    <main className="font-Inter flex flex-col">
      {/* HERO */}
      <div className="hero flex flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center">
          <h1 className="text-graphite dark:text-beaverLight font-OpenSans mb-6 mt-10 w-[90%] text-center text-lg font-bold uppercase sm:text-xl md:mb-1 md:max-w-[50rem] lg:max-w-[60rem] lg:text-2xl xl:max-w-[70rem] xl:text-3xl">
            {dictResult.homeTitle}
          </h1>

          <Suspense fallback={<HomeSliderSkeleton />}>
            <HomeSliderServer errorDict={dictResult.errors} />
          </Suspense>
        </div>

        <HomeSearch dict={dictResult.search} />

        <ArrowDown className="text-beaver dark:text-beaverLight mt-4 h-10 w-10 stroke-1 lg:h-12 lg:w-12" />
      </div>

      {/* CATEGORIES */}
      <div className="font-OpenSans mx-auto mb-24 mt-16 w-[85%] max-w-[1600px]">
        <h1 className="text-foreground mb-10 text-2xl font-bold uppercase">
          {dictResult.categories.title}
        </h1>

        <div className="md:w-full w-[85%] mx-auto grid md:grid-cols-4 grid-cols-1 gap-6">
          {dictResult.categories.list.map((category, index) => (
            <ImgTextOn
              key={index}
              title={category.title}
              src={category.img}
              url={`/${locale}${category.url}`}
              origin={"next"}
            />
          ))}
        </div>
      </div>

      {/* QUIZ */}
      <div className="mx-auto mb-24 w-[85%] max-w-[1600px]">
        <Quiz qiuzDict={dictResult.quiz} errorDict={dictResult.errors} />
      </div>

      {/* CUSTOM */}
      <Suspense fallback={
        <div className="mx-auto mb-24 w-[85%] max-w-[1600px]">
          <RowBlockSkeleton />
        </div>
      }>
        <div className="mx-auto mb-24 w-[85%] max-w-[1600px] font-OpenSans">
          <CustomBlock locale={locale} />
        </div>
      </Suspense>

      {/* ORGANIZATIONS */}
      <div className="mx-auto mb-24 w-[85%] max-w-[1600px] font-OpenSans">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-foreground text-2xl font-bold uppercase">
            {dictResult.organizations.title}
          </h1>
          <Link
            href={`${locale}${dictResult.organizations.url}`}
            className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
          >
            <p className="hidden md:block">
              {dictResult.organizations.textUrl}
            </p>
            <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
          </Link>
        </div>

        <Suspense fallback={<GridBlockSkeleton />}>
          <OrganizationsBlock locale={locale} dict={dictResult} />
        </Suspense>
      </div>

      {/* PROJECTS */}
      <div className="mx-auto mb-24 w-[85%] max-w-[1600px] font-OpenSans">
        <div className="mb-10 flex items-center justify-between">
          <h1 className="text-foreground text-2xl font-bold uppercase">
            {dictResult.projects.title}
          </h1>
          <Link
            href={`${locale}${dictResult.projects.url}`}
            className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
          >
            <p className="hidden md:block">
              {dictResult.projects.textUrl}
            </p>
            <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
          </Link>
        </div>
        
        <Suspense fallback={<RowBigBlockSkeleton />}>
          <ProjectsBlock locale={locale} dict={dictResult} />
        </Suspense>
      </div>
    </main>
  );
}
