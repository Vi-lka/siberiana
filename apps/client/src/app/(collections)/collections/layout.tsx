import React from "react";
import type { Metadata } from "next";

import { getDictionary } from "~/lib/utils/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const dict = await getDictionary();

  return {
    title: dict.breadcrumbs.collections,
  };
}

export default function CategoriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <div className="font-OpenSans mx-auto mt-10 w-[85%]">{children}</div>
    </main>
  );
}
