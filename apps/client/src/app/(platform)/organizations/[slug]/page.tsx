import { Dictionary } from "@siberiana/schemas";
import { Button, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@siberiana/ui";
import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";
import ImgTextBelow from "~/components/thumbnails/ImgTextBelow";
import ImgTextOn from "~/components/thumbnails/ImgTextOn";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import ButtonComponent from "~/components/ui/ButtonComponent";
import { getOrganizationBySlug } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";
import getLinkDir from "~/lib/utils/getLinkDir";
import MapHtml from "./MapHtml";
import Image from "next/image";
import getURL from "~/lib/utils/getURL";
import ErrorHandler from "~/components/errors/ErrorHandler";
import { PiHandshakeLight } from "react-icons/pi";

export default async function Organization({
    params: { slug },
  }: {
    params: { slug: string };
}) {
    const dict = await getDictionary();
    const dictResult = Dictionary.parse(dict);

    const [ dataResult ] = await Promise.allSettled([ getOrganizationBySlug(slug) ])
    if (dataResult.status === 'rejected') return (
      <ErrorHandler 
        error={dataResult.reason as unknown} 
        place="Organization" 
        notFound 
        goBack={false}
      />
    )
    
    return (
      <>
        <Breadcrumbs 
          dict={dictResult.breadcrumbs} 
          slug={slug} 
          title={dataResult.value.title} 
        />

        <div className="max-w-[1600px] mx-auto">
          {/* TITLE */}
          <div className="mt-12 mb-24 flex lg:flex-row flex-col-reverse gap-6 justify-between lg:items-center">
            <div className="flex flex-col gap-6 lg:w-[60%] sm:w-[80%] w-full">
              <h1 className="font-OpenSans font-bold xl:text-4xl md:text-3xl text-2xl w-full leading-snug">
                {dataResult.value.title}
              </h1>

              <div className="flex md:gap-6 gap-3">
                {dataResult.value.consortium ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={300}>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" className="lg:w-[52px] lg:h-[52px] w-[44px] h-[44px] p-3 bg-accent text-foreground rounded-full">
                          <PiHandshakeLight className='w-full h-full' />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="bg-accent text-foreground font-OpenSans">
                        <p>{dictResult.tooltips.consortium}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : null}

                {dataResult.value.url ? (
                  <Link href={getLinkDir(dataResult.value.url)} target="_blank">
                    <ButtonComponent className="md:px-10 md:py-6 py-[22px] px-[10px] uppercase xl:text-sm text-xs">
                      <p className="md:block hidden">{dictResult.organizations.goTo}</p>
                      <ArrowUpRight className="md:h-5 md:w-5 h-6 w-6 md:ml-4 ml-0 stroke-1" />
                    </ButtonComponent>
                  </Link>
                ) : null}
              </div>
            </div>
                
            {dataResult.value.image.data ? (
              <div className="relative flex lg:w-[40%] w-full aspect-[2/1] overflow-hidden rounded-md">
                <Image
                  src={getURL(dataResult.value.image.data.attributes.url, "strapi")}
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
                  <p className="hidden md:block">{dataResult.value.collections.textUrl}</p>
                  <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
                </Link>
              </div>

              <div className="md:w-full w-[85%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4">
                {dataResult.value.collections.list.map((elem, index) => (
                  <ImgTextOn
                    key={index}
                    className={"aspect-square"}
                    title={elem.title}
                    src={elem.img.data?.attributes.url}
                    url={getLinkDir(elem.url)}
                    target="_blank"
                    origin={"strapi"}
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
                  <p className="hidden md:block">{dataResult.value.exhibits.textUrl}</p>
                  <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
                </Link>
              </div>

              <div className="font-Inter md:w-full w-[85%] mx-auto grid grid-cols-1 gap-6 md:grid-cols-4">
                {dataResult.value.exhibits.list.map((elem, index) => (
                  <ImgTextBelow
                    key={index}
                    className={"aspect-square"}
                    title={elem.name}
                    src={elem.image.data?.attributes.url}
                    href={getLinkDir(elem.url)}
                    origin={"strapi"}
                  >
                    <p className="w-full uppercase xl:text-sm text-xs">
                      {elem.name ? (
                          <>
                              <span className="font-bold">{elem.name}</span>
                              <br/>
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
                    href={getLinkDir(dataResult.value.events_organization.data.attributes.url)}
                    target="_blank"
                    className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
                  >
                    <p className="hidden md:block">{dataResult.value.events_organization.data.attributes.textUrl}</p>
                    <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
                  </Link>
                ) : null}
              </div>

              <div className="font-Inter md:w-full w-[85%] mx-auto grid md:grid-cols-2 grid-cols-1 gap-7">
                {dataResult.value.events_organization.data.attributes.list.map((elem, index) => (
                  <ImgTextBelow
                    key={index}
                    className={"aspect-[2.04/1]"}
                    title={elem.name}
                    src={elem.image.data?.attributes.url}
                    href={getLinkDir(elem.url)}
                    target="_blank"
                    origin={"strapi"}
                    width={450}
                    height={450}
                  >
                    <div className="flex md:flex-row flex-col justify-between gap-1">
                      <p className="md:w-[45%] uppercase xl:text-sm text-xs">
                        <span className="font-bold">{new Date(elem.dateStart).toLocaleDateString("ru")} – {new Date(elem.dateEnd).toLocaleDateString("ru")}</span> {elem.cost ? (`${elem.cost} • ${elem.cost}`) : null } 
                        <br/>
                        {elem.name}
                      </p>

                      <p className="flex justify-end gap-3 xl:text-sm text-xs">
                        <MapPin className="md:h-5 md:w-5 h-4 w-4" />
                        {elem.address}
                      </p>
                    </div>
                  </ImgTextBelow>
                ))}
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

              <div className="flex justify-start lg:flex-row flex-col gap-7">
                <MapHtml map={dataResult.value.contacts.map} />

                <div>
                  <div className="font-Inter md:text-base text-sm w-fit grid grid-cols-2 gap-14 mb-6">
                    <div className="w-fit">
                      {Object.entries(dictResult.schedule).map(([key, val]) => (
                        <p key={key} className="">{val}</p>
                      ))}
                    </div>
                    <div className="w-fit">
                      {Object.entries(dataResult.value.contacts.schedule).map(([key, val]) => (
                        <p key={key} className="">{val}</p>
                      ))}
                    </div>
                  </div>

                  {dataResult.value.url ? ( 
                    <Link href={getLinkDir(dataResult.value.url)} target="_blank">
                      <ButtonComponent className="md:px-10 md:py-6 py-5 px-3 uppercase xl:text-sm text-xs">
                        <p className="">{dictResult.organizations.goTo}</p>
                        <ArrowUpRight className="h-5 w-5 md:ml-4 ml-1 stroke-1" />
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