import React from "react";
import { PiHandshakeLight } from "react-icons/pi";

import { Dictionary } from "@siberiana/schemas";

import ErrorHandler from "~/components/errors/ErrorHandler";
import ImgTextOn from "~/components/thumbnails/ImgTextOn";
import PaginationControls from "~/components/ui/PaginationControls";
import { getOrganizations } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";

export default async function OrganizationsContent({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const defaultPageSize = 12;

  const page = searchParams["page"] ?? "1";
  const per = searchParams["per"] ?? defaultPageSize;
  const sort = searchParams["sort"] as string | undefined;
  const search = searchParams["search"] as string | undefined;
  const consortium = searchParams["consortium"] as string | undefined;

  const [dataResult] = await Promise.allSettled([
    getOrganizations({
      page: Number(page),
      per: Number(per),
      sort,
      search,
      consortium: Boolean(consortium),
    }),
  ]);
  if (dataResult.status === "rejected")
    return (
      <ErrorHandler
        error={dataResult.reason as unknown}
        place="Organizations"
        notFound
        goBack={false}
      />
    );

  return (
    <>
      <div
        key={Math.random()}
        className="mx-auto mb-12 mt-3 grid w-[85%] grid-cols-1 gap-6 md:w-full md:grid-cols-2 min-[2000px]:grid-cols-3 min-[3000px]:grid-cols-4 min-[4000px]:grid-cols-5"
      >
        {dataResult.value.data.map((org, index) => (
          <ImgTextOn
            showIcon={org.attributes.consortium}
            tooltip={dictResult.tooltips.consortium}
            key={index}
            className={"aspect-square md:aspect-[2/1]"}
            title={org.attributes.title}
            src={org.attributes.image.data?.attributes.url}
            url={`/organizations/${org.attributes.slug}`}
            width={800}
            height={450}
          >
            <PiHandshakeLight className="h-full w-full" />
          </ImgTextOn>
        ))}
      </div>

      <div className="mb-24">
        <PaginationControls
          dict={dictResult.pagination}
          length={dataResult.value.meta.pagination.total}
          defaultPageSize={defaultPageSize}
        />
      </div>
    </>
  );
}
