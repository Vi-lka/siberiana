"use client"

import type { AccountDict } from '@siberiana/schemas'
import { Tabs, TabsList, TabsTrigger } from '@siberiana/ui'
import React from 'react'
import { tabAccountAtom } from '~/lib/utils/atoms'
import { useAtom } from 'jotai';

export default function AccountTabs({
    dict,
    children
}: {
    dict: AccountDict,
    children: React.ReactNode
}) {

    const [tab, setTab] = useAtom(tabAccountAtom)

  return (
    <Tabs 
        defaultValue="favourites"
        value={tab}
        className="w-full"
    >
        <div className="bg-background z-40 mt-[-8px] flex w-full md:justify-start justify-center border-b-2 sm:pt-10 pt-5">
            <TabsList className="flex flex-wrap items-start lg:gap-6 gap-3 rounded-none bg-transparent xl:mb-[4px] lg:mb-0 sm:mb-[-4px] mb-[-6px]">
                <TabsTrigger
                    value="favourites"
                    className="w-fit data-[state=active]:text-beaver data-[state=active]:border-beaver rounded-none border-b-2 border-transparent px-0 font-semibold xl:text-lg lg:text-base text-sm uppercase dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                    onClick={() => setTab("favourites")}
                >
                    {dict.favourites}
                </TabsTrigger>
                <TabsTrigger
                    value="collections"
                    className="w-fit data-[state=active]:text-beaver data-[state=active]:border-beaver rounded-none border-b-2 border-transparent px-0 font-semibold xl:text-lg lg:text-base text-sm uppercase dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                    onClick={() => setTab("collections")}
                >
                    {dict.collections}
                </TabsTrigger>
                <TabsTrigger
                    value="publications"
                    className="w-fit data-[state=active]:text-beaver data-[state=active]:border-beaver rounded-none border-b-2 border-transparent px-0 font-semibold xl:text-lg lg:text-base text-sm uppercase dark:data-[state=active]:border-white dark:data-[state=active]:text-white"
                    onClick={() => setTab("publications")}
                >
                    {dict.publications}
                </TabsTrigger>
            </TabsList>
        </div>
        {children}
    </Tabs>
  )
}
