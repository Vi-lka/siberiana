import React from "react";
import type { Metadata } from "next";

import { DictionarySchema } from "@siberiana/schemas";

import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { getDictionary } from "~/lib/utils/getDictionary";

export const metadata: Metadata = {
  title: "Объекты",
};

export default async function Objects({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);

  const dataResult = DictionarySchema.parse(dict);

  return (
    <main className="font-Inter flex flex-col">
      <div className="font-OpenSans mx-auto mb-24 mt-16 w-[85%] max-w-[1600px]">
        <Breadcrumbs dict={dataResult.breadcrumbs} />
      </div>
    </main>
  );
}
