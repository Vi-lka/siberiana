import React from "react";
import Link from "next/link";

import { DictionarySchema } from "@siberiana/schemas";

import { getDictionary } from "~/lib/utils/getDictionary";
import LogoSvg from "../LogoSvg";
import ButtonComponent from "../ui/ButtonComponent";
import { ThemeToggle } from "../ui/ThemeToggle";
import LocaleSwitcher from "./LocaleSwitcher";
import NavMenu from "./NavMenu";
import NavSheet from "./NavSheet";
import { ClientHydration } from "../ui/ClientHydration";
import { Skeleton } from "@siberiana/ui";

export default async function Header({ locale }: { locale: string }) {
  
  const dict = await getDictionary(locale);

  const dictResult = DictionarySchema.parse(dict);

  return (
    <div className="font-Inter text-graphite dark:text-beaverLight dark:bg-darkBlue fixed z-50 w-full bg-white px-4 py-4 md:px-0">
      <div className="mx-auto flex w-[95%] max-w-[1600px] items-center justify-between md:w-[85%]">
        <div className="flex w-1/5">
          <Link
            href={`/${locale}`}
            className="relative h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
          >
            <LogoSvg isAdaptive />
          </Link>
        </div>

        <div className="hidden w-fit lg:block">
          <ClientHydration fallback={
            <div className="flex gap-6">
              <Skeleton className="w-28 p-4"/>
              <Skeleton className="w-28 p-4"/>
              <Skeleton className="w-28 p-4"/>
            </div>
          }>
            <NavMenu menuDict={dictResult.menu} />
          </ClientHydration>
        </div>

        <div className="flex w-1/5 items-center justify-end gap-2 xl:gap-3">
          <ClientHydration fallback={
            <div className="flex gap-6 mr-2">
              <Skeleton className="w-6 p-4"/>
              <Skeleton className="w-6 p-4"/>
            </div>
          }>
            <ThemeToggle />
            <LocaleSwitcher />
          </ClientHydration>

          {/* Desktop */}
          <div className="hidden lg:block">
            <Link href={`/${locale}/login`}>
              <ButtonComponent className="px-10 py-6 uppercase">
                {dictResult.auth.mainButton}
              </ButtonComponent>
            </Link>
          </div>

          {/* Mobile */}
          <div className="block pl-2 lg:hidden">
            <ClientHydration fallback={
              <Skeleton className="h-[2.5rem] w-[2.5rem]"/>
            }>
              <NavSheet menuDict={dictResult.menu} authDict={dictResult.auth} />
            </ClientHydration>
          </div>
        </div>
      </div>
    </div>
  );
}
