import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";

import { Skeleton } from "@siberiana/ui";

import LogoSvg from "../LogoSvg";
import { ClientHydration } from "../providers/ClientHydration";
import { ThemeToggle } from "../providers/ThemeToggle";
import AccountBar from "./AccountBar";
import { authOptions } from "~/app/api/auth/[...nextauth]/auth";

export default async function Header() {
  const session = await getServerSession(authOptions);

  const roles = session?.user.roles;

  return (
    <div className="font-Inter bg-background border-b-accent fixed z-20 w-full border-b-[1px] px-2 shadow md:px-3">
      <div className="mx-auto flex w-[98%] items-center justify-between py-2 pt-4">
        <div className="flex w-1/5">
          {!!session &&
          (roles?.includes("administrator") || roles?.includes("moderator")) ? (
            <Link
              href={`/`}
              className="relative h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
            >
              <LogoSvg isAdaptive />
            </Link>
          ) : null}
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

          {!!session &&
          (roles?.includes("administrator") || roles?.includes("moderator")) ? (
            <AccountBar name={session.user.name} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
