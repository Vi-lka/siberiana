import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PiHandshakeLight } from "react-icons/pi";

import { Dictionary } from "@siberiana/schemas";

import { getOrganizations } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";
import ErrorHandler from "../errors/ErrorHandler";
import ImgTextOn from "../thumbnails/ImgTextOn";

export default async function OrganizationsBlock() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const [dataResult] = await Promise.allSettled([
    getOrganizations({ page: 1, per: 5 }),
  ]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="Organizations Block"
        notFound
        goBack={false}
      />
    );

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
          <p className="hidden md:block">{dictResult.organizations.textUrl}</p>
          <ArrowRight className="h-10 w-10 stroke-1 lg:h-6 lg:w-6" />
        </Link>
      </div>

      <div className="mx-auto grid aspect-auto w-[85%] grid-flow-row-dense grid-cols-1 grid-rows-5 gap-6 md:aspect-[4/2] md:w-full md:grid-cols-4 md:grid-rows-2">
        {dataResult.value.data.map((org, index) => (
          <ImgTextOn
            showIcon={org.attributes.consortium}
            tooltip={dictResult.tooltips.consortium}
            key={index}
            className={handleClassName(index)}
            title={org.attributes.title}
            src={org.attributes.image.data?.attributes.url}
            url={`/organizations/${org.attributes.slug}`}
            width={700}
            height={700}
          >
            <PiHandshakeLight className="h-full w-full" />
          </ImgTextOn>
        ))}
      </div>
    </>
  );
}
