import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import { PiHandshakeLight } from "react-icons/pi";

import { Dictionary } from "@siberiana/schemas";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siberiana/ui";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ImgTextBelow from "~/components/thumbnails/ImgTextBelow";
import ImgTextOn from "~/components/thumbnails/ImgTextOn";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import ButtonComponent from "~/components/ui/ButtonComponent";
import { getOrganizationBySlug } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";
import getLinkDir from "~/lib/utils/getLinkDir";
import MapHtml from "./MapHtml";

export default async function Organization({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const [dataResult] = await Promise.allSettled([getOrganizationBySlug(slug)]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="Organization"
        notFound
        goBack
      />
    );

  return (
    <>
      <Breadcrumbs
        dict={dictResult.breadcrumbs}
        slug={slug}
        title={dataResult.value.title}
      />

      <div className="mx-auto max-w-[1600px]">
        {/* TITLE */}
        <div className="mb-24 mt-12 flex flex-col-reverse justify-between gap-6 lg:flex-row lg:items-center">
          <div className="flex w-full flex-col gap-6 sm:w-[80%] lg:w-[60%]">
            <h1 className="font-OpenSans w-full text-2xl font-bold leading-snug md:text-3xl xl:text-4xl">
              {dataResult.value.title}
            </h1>

            <div className="flex items-center gap-3 md:gap-6">
              {dataResult.value.consortium ? (
                <TooltipProvider>
                  <Tooltip delayDuration={300}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="bg-accent text-foreground h-[44px] w-[44px] rounded-full p-3 lg:h-[52px] lg:w-[52px]"
                      >
                        <PiHandshakeLight className="h-full w-full" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-accent text-foreground font-OpenSans"
                    >
                      <p>{dictResult.tooltips.consortium}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : null}

              {dataResult.value.url ? (
                <Link href={getLinkDir(dataResult.value.url)} target="_blank">
                  <ButtonComponent className="px-[10px] py-[22px] text-xs md:px-10 md:py-6 xl:text-sm">
                    <p className="hidden md:block">
                      {dictResult.organizations.goTo}
                    </p>
                    <ArrowUpRight className="ml-0 h-6 w-6 stroke-1 md:ml-4 md:h-5 md:w-5" />
                  </ButtonComponent>
                </Link>
              ) : null}
            </div>
          </div>

          {dataResult.value.image.data ? (
            <div className="relative flex aspect-[2/1] w-full overflow-hidden rounded-md lg:w-[40%]">
              <Image
                src={dataResult.value.image.data.attributes.url}
                width={800}
                height={400}
                priority={true}
                className={"w-full object-cover"}
                alt={dataResult.value.title}
              />
              <div className="absolute bottom-0 h-full w-full bg-black bg-opacity-10" />
            </div>
          ) : null}
        </div>

        {/* COLLECTIONS */}
        {dataResult.value.collections ? (
          <div className="mb-24">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-foreground text-2xl font-bold uppercase">
                {dataResult.value.collections.title}
              </h2>

              <Link
                href={getLinkDir(dataResult.value.collections.url)}
                target="_blank"
                className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
              >
                <p className="hidden md:block">
                  {dataResult.value.collections.textUrl}
                </p>
                <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
              </Link>
            </div>

            <div className="mx-auto grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-4">
              {dataResult.value.collections.list.map((elem, index) => (
                <ImgTextOn
                  key={index}
                  className={"aspect-square"}
                  title={elem.title}
                  src={elem.img.data?.attributes.url}
                  url={getLinkDir(elem.url)}
                  target="_blank"
                />
              ))}
            </div>
          </div>
        ) : null}

        {/* EXHIBITS */}
        {dataResult.value.exhibits ? (
          <div className="mb-24">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-foreground text-2xl font-bold uppercase">
                {dataResult.value.exhibits.title}
              </h2>

              <Link
                href={getLinkDir(dataResult.value.exhibits.url)}
                target="_blank"
                className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
              >
                <p className="hidden md:block">
                  {dataResult.value.exhibits.textUrl}
                </p>
                <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
              </Link>
            </div>

            <div className="font-Inter mx-auto grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-4">
              {dataResult.value.exhibits.list.map((elem, index) => (
                <ImgTextBelow
                  key={index}
                  className={"aspect-square"}
                  title={elem.name}
                  src={elem.image.data?.attributes.url}
                  href={getLinkDir(elem.url)}
                  target="_blank"
                >
                  <p className="w-full text-xs uppercase xl:text-sm">
                    {elem.name ? (
                      <>
                        <span className="font-bold">{elem.name}</span>
                        <br />
                      </>
                    ) : null}
                    {elem.description}
                  </p>
                </ImgTextBelow>
              ))}
            </div>
          </div>
        ) : null}

        {/* EVENTS */}
        {dataResult.value.events_organization.data ? (
          <div className="mb-24">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-foreground text-2xl font-bold uppercase">
                {dataResult.value.events_organization.data.attributes.title}
              </h2>

              {dataResult.value.events_organization.data.attributes.url ? (
                <Link
                  href={getLinkDir(
                    dataResult.value.events_organization.data.attributes.url,
                  )}
                  target="_blank"
                  className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
                >
                  <p className="hidden md:block">
                    {
                      dataResult.value.events_organization.data.attributes
                        .textUrl
                    }
                  </p>
                  <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
                </Link>
              ) : null}
            </div>

            <div className="font-Inter mx-auto grid w-[85%] grid-cols-1 gap-7 md:w-full md:grid-cols-2">
              {dataResult.value.events_organization.data.attributes.list.map(
                (elem, index) => (
                  <ImgTextBelow
                    key={index}
                    className={"aspect-[2.04/1]"}
                    title={elem.name}
                    src={elem.image.data?.attributes.url}
                    href={getLinkDir(elem.url)}
                    target="_blank"
                    width={450}
                    height={450}
                  >
                    <div className="flex flex-col justify-between gap-1 md:flex-row">
                      <p className="text-xs uppercase md:w-[45%] xl:text-sm">
                        <span className="font-bold">
                          {new Date(elem.dateStart).toLocaleDateString("ru")} –{" "}
                          {new Date(elem.dateEnd).toLocaleDateString("ru")}
                        </span>{" "}
                        {elem.cost ? `• ${elem.cost}` : null}
                        <br />
                        {elem.name}
                      </p>

                      <p className="flex justify-end gap-3 text-xs xl:text-sm">
                        <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                        {elem.address}
                      </p>
                    </div>
                  </ImgTextBelow>
                ),
              )}
            </div>
          </div>
        ) : null}

        {/* CONTACTS */}
        {dataResult.value.contacts ? (
          <div className="mb-24">
            <div className="mb-10 flex items-center justify-between">
              <h2 className="text-foreground text-2xl font-bold uppercase">
                {dataResult.value.contacts.title}
              </h2>
            </div>

            <div className="flex flex-col justify-start gap-7 lg:flex-row">
              <MapHtml map={dataResult.value.contacts.map} />

              <div>
                {dataResult.value.contacts.schedule ? (
                  <div className="font-Inter mb-6 grid w-fit grid-cols-2 gap-14 text-sm md:text-base">
                    <div className="w-fit">
                      {Object.entries(dictResult.schedule).map(([key, val]) => (
                        <p key={key} className="">
                          {val}
                        </p>
                      ))}
                    </div>
                    <div className="w-fit">
                      {Object.entries(dataResult.value.contacts.schedule).map(
                        ([key, val]) => (
                          <p key={key} className="">
                            {val}
                          </p>
                        ),
                      )}
                    </div>
                  </div>
                ) : null}

                {dataResult.value.url ? (
                  <Link href={getLinkDir(dataResult.value.url)} target="_blank">
                    <ButtonComponent className="px-3 py-5 text-xs md:px-10 md:py-6 xl:text-sm">
                      <p className="">{dictResult.organizations.goTo}</p>
                      <ArrowUpRight className="ml-1 h-5 w-5 stroke-1 md:ml-4" />
                    </ButtonComponent>
                  </Link>
                ) : null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}
