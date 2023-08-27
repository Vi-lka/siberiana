import React from "react";
import { DictionarySchema } from "@siberiana/schemas";
import { getOrganizations } from "~/lib/queries/strapi-server";
import ImgTextOn from "../thumbnails/ImgTextOn";
import { PiHandshakeLight } from "react-icons/pi";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getDictionary } from "~/lib/utils/getDictionary";
import ErrorHandler from "../errors/ErrorHandler";

export default async function OrganizationsBlock() {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  const [ dataResult ] = await Promise.allSettled([ getOrganizations({ page: 1, per: 5 }) ])
  if  (dataResult.status === 'rejected') return (
    <ErrorHandler 
      error={dataResult.reason as unknown} 
      place="Organizations Block" 
      notFound
      goBack={false}
    />
  )

  function handleClassName(index: number) {
    switch (index) {
      case 0:
        return "md:row-span-1 md:col-span-2 md:aspect-auto aspect-square row-span-1 col-span-1";

      case 1:
        return "md:row-span-1 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1";

      case 2:
        return "md:row-span-2 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1";

      case 3:
        return "md:row-span-1 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1";

      case 4:
        return "md:row-span-1 md:col-span-2 md:aspect-auto aspect-square row-span-1 col-span-1";

      default:
        break;
    }
  }

  return (
    <>
      <div className="mb-10 flex items-center justify-between">
        <h1 className="text-foreground text-2xl font-bold uppercase">
          {dictResult.organizations.title}
        </h1>
        <Link
          href={`/organizations`}
          className="font-Inter text-beaver dark:text-beaverLight flex gap-3 uppercase hover:underline"
        >
          <p className="hidden md:block">
            {dictResult.organizations.textUrl}
          </p>
          <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
        </Link>
      </div>

      <div className="md:w-full w-[85%] mx-auto grid aspect-auto grid-flow-row-dense md:aspect-[4/2] md:grid-cols-4 md:grid-rows-2 grid-cols-1 grid-rows-5 gap-6">
        {dataResult.value.data.map((org, index) => (
          <ImgTextOn
            showIcon={org.attributes.consortium}
            tooltip={dictResult.tooltips.consortium}
            key={index}
            className={handleClassName(index)}
            title={org.attributes.title}
            src={org.attributes.image.data?.attributes.url}
            url={`/organizations/${org.attributes.slug}`}
            origin={"strapi"}
            width={450}
            height={450}
          >
            <PiHandshakeLight className='w-full h-full' />
          </ImgTextOn>
        ))}
      </div>
    </>
  );
}
