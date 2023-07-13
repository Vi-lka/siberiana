import React from "react";
import type { Metadata } from "next";

import { DictionarySchema } from "@siberiana/schemas";

import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { getDictionary } from "~/lib/utils/getDictionary";

export const metadata: Metadata = {
  title: "Организации",
};

export default async function OrganizationsLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const dict = await getDictionary(params.locale);
  const dictResult = DictionarySchema.parse(dict);

  return (
    <main className="font-Inter flex flex-col">
      <div className="font-OpenSans mx-auto mb-24 mt-16 w-[85%] max-w-[1600px]">
        <Breadcrumbs dict={dictResult.breadcrumbs} />
        {children}
      </div>
    </main>
  );
}
