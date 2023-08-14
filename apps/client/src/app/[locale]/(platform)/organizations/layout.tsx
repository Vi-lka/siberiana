import React from "react";
import type { Metadata } from "next";
import { getDictionary } from "~/lib/utils/getDictionary";

export async function generateMetadata(
  { params }: {params: { locale: string }},
): Promise<Metadata> {
  // read route params
  const locale = params.locale
 
  // fetch data
  const dict = await getDictionary(locale);

  return {
    title: dict.breadcrumbs.organizations
  }
}

export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="flex flex-col">
      <div className="font-OpenSans mx-auto mt-10 w-[85%] max-w-[1600px]">
        {children}
      </div>
    </main>
  );
}
