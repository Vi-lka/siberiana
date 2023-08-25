import React from "react";
import type { Metadata } from "next";
import { getDictionary } from "~/lib/utils/getDictionary";
import Breadcrumbs from "~/components/ui/Breadcrumbs";
import { DictionarySchema } from "@siberiana/schemas";

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const dict = await getDictionary();

  return {
    title: dict.breadcrumbs.account
  }
}

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const dict = await getDictionary();
  const dictResult = DictionarySchema.parse(dict);

  return (
    <main className="flex flex-col">
      <div className="font-OpenSans mx-auto mt-10 w-[85%]">
        <Breadcrumbs dict={dictResult.breadcrumbs} />
        {children}
      </div>
    </main>
  );
}
