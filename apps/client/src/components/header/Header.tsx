import React from "react";
import Link from "next/link";

import { Dictionary } from "@siberiana/schemas";

import { getDictionary } from "~/lib/utils/getDictionary";
import LogoSvg from "../LogoSvg";
import { ThemeToggle } from "../providers/ThemeToggle";
import NavMenu from "./NavMenu";
import NavSheet from "./NavSheet";
import { ClientHydration } from "../providers/ClientHydration";
import { Skeleton } from "@siberiana/ui";
import { SignInButton } from "../auth/NextAuthButtons";
import { getServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import AccountBar from "./AccountBar";

export default async function Header() {
  
  const dict = await getDictionary();

  const dictResult = Dictionary.parse(dict);

  const session = await getServerSession(authOptions);

  return (
    <div className="font-Inter text-graphite dark:text-beaverLight dark:bg-darkBlue fixed z-50 w-full bg-white px-4 py-4 md:px-0">
      <div className="mx-auto flex w-[95%] items-center justify-between md:w-[85%]">
        <div className="flex w-1/5">
          <Link
            href={`/`}
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
            </div>
          }>
            <ThemeToggle />
          </ClientHydration>
          
          {!!session ? (
            <AccountBar 
              dict={dictResult.account}
              session={session} 
            />
          ) : null}
          
          {/* Desktop */}
          {!!session ? null : (
            <div className="hidden lg:block">
              <SignInButton className="px-10 py-6 uppercase" dict={dictResult.auth} />
            </div>
          )}

          {/* Mobile */}
          <div className="block pl-2 lg:hidden">
            <ClientHydration fallback={
              <Skeleton className="h-[2.5rem] w-[2.5rem]"/>
            }>
              <NavSheet menuDict={dictResult.menu} authDict={dictResult.auth} session={session} />
            </ClientHydration>
          </div>

        </div>
      </div>
    </div>
  );
}
