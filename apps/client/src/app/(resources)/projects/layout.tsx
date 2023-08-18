import React from "react";
import type { Metadata } from "next";
import { getDictionary } from "~/lib/utils/getDictionary";

export async function generateMetadata(): Promise<Metadata> {
 
  // fetch data
  const dict = await getDictionary();

  return {
    title: dict.breadcrumbs.projects
  }
}

export default function ProjectsLayout({
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
