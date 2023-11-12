"use client";

import React from "react";
import { useAtom } from "jotai";

import type { AccountDict } from "@siberiana/schemas";
import { Tabs, TabsList, TabsTrigger } from "@siberiana/ui";

import { tabAccountAtom } from "~/lib/utils/atoms";

export default function AccountTabs({
  dict,
  children,
}: {
  dict: AccountDict;
  children: React.ReactNode;
}) {
  const [tab, setTab] = useAtom(tabAccountAtom);

  return (
    <Tabs defaultValue="favourites" value={tab} className="w-full">
      <div className="bg-background z-40 mt-[-8px] flex w-full justify-center border-b-2 pt-5 sm:pt-10 md:justify-start">
        <TabsList className="mb-[-6px] flex flex-wrap items-start gap-3 rounded-none bg-transparent sm:mb-[-4px] lg:mb-0 lg:gap-6 xl:mb-[4px]">
          <TabsTrigger
            value="favourites"
            className="data-[state=active]:text-beaver data-[state=active]:border-beaver w-fit rounded-none border-b-2 border-transparent px-0 text-sm font-semibold uppercase dark:data-[state=active]:border-white dark:data-[state=active]:text-white lg:text-base xl:text-lg"
            onClick={() => setTab("favourites")}
          >
            {dict.favourites}
          </TabsTrigger>
          <TabsTrigger
            value="collections"
            className="data-[state=active]:text-beaver data-[state=active]:border-beaver w-fit rounded-none border-b-2 border-transparent px-0 text-sm font-semibold uppercase dark:data-[state=active]:border-white dark:data-[state=active]:text-white lg:text-base xl:text-lg"
            onClick={() => setTab("collections")}
          >
            {dict.collections}
          </TabsTrigger>
          <TabsTrigger
            value="publications"
            className="data-[state=active]:text-beaver data-[state=active]:border-beaver w-fit rounded-none border-b-2 border-transparent px-0 text-sm font-semibold uppercase dark:data-[state=active]:border-white dark:data-[state=active]:text-white lg:text-base xl:text-lg"
            onClick={() => setTab("publications")}
          >
            {dict.publications}
          </TabsTrigger>
        </TabsList>
      </div>
      {children}
    </Tabs>
  );
}
