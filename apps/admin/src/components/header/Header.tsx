import React from "react";
import Link from "next/link";
import { Skeleton } from "@siberiana/ui";
import { getServerSession } from "next-auth";
import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import LogoSvg from "../LogoSvg";
import { ClientHydration } from "../providers/ClientHydration";
import AccountBar from "./AccountBar";
import { ThemeToggle } from "../providers/ThemeToggle";

export default async function Header() {

  const session = await getServerSession(authOptions);

  const roles = session?.user.roles

  return (
    <div className="font-Inter fixed z-20 w-full px-2 md:px-0 bg-background shadow border-b-accent border-b-[1px]">

      <div className="mx-auto flex w-[98%] items-center justify-between py-2 pt-4">
        <div className="flex w-1/5">
          {(!!session && ((roles?.includes("administrator") || roles?.includes("moderator"))))
            ? (
                <Link
                  href={`/`}
                  className="relative h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
                >
                  <LogoSvg isAdaptive />
                </Link>
            )
            : null
          }
        </div>

        <div className="flex w-1/5 items-center justify-end gap-2 xl:gap-3">
          <ClientHydration fallback={
            <div className="flex gap-6 mr-2">
              <Skeleton className="w-6 p-4"/>
            </div>
          }>
            <ThemeToggle />
          </ClientHydration>
          
          {(!!session && ((roles?.includes("administrator") || roles?.includes("moderator"))))
            ? <AccountBar name={session.user.name} />
            : null
          }
        </div>
      </div>
    </div>
  );
}
