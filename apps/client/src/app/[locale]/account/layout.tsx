import React from "react";
import type { Metadata } from "next";
import { getDictionary } from "~/lib/utils/getDictionary";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { DictionarySchema } from "@siberiana/schemas";

export async function generateMetadata(
  { params }: {params: { locale: string }},
): Promise<Metadata> {
  // read route params
  const locale = params.locale
 
  // fetch data
  const dict = await getDictionary(locale);

  return {
    title: dict.breadcrumbs.account
  }
}

export default async function AccountLayout({
  params: { locale },
  children,
}: {
  params: { locale: string },
  children: React.ReactNode;
}) {

  const dict = await getDictionary(locale);
  const dictResult = DictionarySchema.parse(dict);

  return (
    <main className="flex flex-col">
      <div className="font-OpenSans mx-auto mt-10 w-[85%] max-w-[1600px]">
        <Breadcrumbs dict={dictResult.breadcrumbs} />
        {children}
      </div>
    </main>
  );
}
