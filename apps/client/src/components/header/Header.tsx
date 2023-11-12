import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { Dictionary } from "@siberiana/schemas";
import { Skeleton } from "@siberiana/ui";

import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { getDictionary } from "~/lib/utils/getDictionary";
import { SignInButton } from "../auth/NextAuthButtons";
import LogoSvg from "../LogoSvg";
import { ClientHydration } from "../providers/ClientHydration";
import { ThemeToggle } from "../providers/ThemeToggle";
import AccountBar from "./AccountBar";
import NavMenu from "./NavMenu";
import NavSheet from "./NavSheet";

export default async function Header() {
  const dict = await getDictionary();

  const dictResult = Dictionary.parse(dict);

  const session = await getServerSession(authOptions);

  const haveSession = !!session;

  return (
    <div className="font-Inter text-graphite dark:text-beaverLight dark:bg-darkBlue fixed z-50 w-full bg-white px-4 md:px-0">
      <div className="bg-accent w-full p-1 text-center text-sm font-medium uppercase">
        Представлена демонстрационная версия платформы
      </div>

      <div className="mx-auto flex w-[95%] items-center justify-between py-4 md:w-[85%]">
        <div className="flex w-1/5">
          <Link
            href={`/`}
            className="relative h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
          >
            <LogoSvg isAdaptive />
          </Link>
        </div>

        <div className="hidden w-fit lg:block">
          <ClientHydration
            fallback={
              <div className="flex gap-6">
                <Skeleton className="w-28 p-4" />
                <Skeleton className="w-28 p-4" />
                <Skeleton className="w-28 p-4" />
              </div>
            }
          >
            <NavMenu menuDict={dictResult.menu} />
          </ClientHydration>
        </div>

        <div className="flex w-1/5 items-center justify-end gap-2 xl:gap-3">
          <ClientHydration
            fallback={
              <div className="mr-2 flex gap-6">
                <Skeleton className="w-6 p-4" />
              </div>
            }
          >
            <ThemeToggle />
          </ClientHydration>

          {!!session ? (
            <AccountBar dict={dictResult.account} name={session.user.name} />
          ) : null}

          {/* Desktop */}
          {!!session ? null : (
            <div className="hidden lg:block">
              <SignInButton dict={dictResult.auth} />
            </div>
          )}

          {/* Mobile */}
          <div className="block pl-2 lg:hidden">
            <ClientHydration
              fallback={<Skeleton className="h-[2.5rem] w-[2.5rem]" />}
            >
              <NavSheet
                menuDict={dictResult.menu}
                authDict={dictResult.auth}
                session={haveSession}
              />
            </ClientHydration>
          </div>
        </div>
      </div>
    </div>
  );
}
