import React from "react";
import Link from "next/link";
import { Settings } from "lucide-react";
import { getServerSession } from "next-auth";

import { Dictionary } from "@siberiana/schemas";
import {
  TabsContent,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siberiana/ui";

import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import { SignOutIcon } from "~/components/auth/NextAuthButtons";
import NoSession from "~/components/errors/NoSession";
import ToastToken from "~/components/ui/ToastToken";
import { decrypt } from "~/lib/utils/encryption";
import { getDictionary } from "~/lib/utils/getDictionary";
import getUserRoles from "~/lib/utils/getUserRoles";
import AccountTabs from "./AccountTabs";

export const dynamic = "force-dynamic";

export default async function Account() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const session = await getServerSession(authOptions);
  if (!session) return <NoSession />;

  const userRoles = session.user.roles?.map((role) =>
    getUserRoles(role, dictResult.account),
  );

  const isAdmin =
    session.user.roles?.includes("administrator") ||
    session.user.roles?.includes("moderator");

  const decryptedToken = decrypt(session.access_token);

  return (
    <div className="mx-auto mb-4 mt-12 flex flex-col gap-10">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:gap-1">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:gap-6">
          <h1 className="text-foreground text-lg font-bold uppercase lg:text-xl xl:text-2xl">
            {!!session.user.name && session.user.name.length > 0
              ? session.user.name
              : session.user.preferred_username}
          </h1>

          {userRoles ? (
            <p className="font-Inter text-xs lg:text-sm xl:text-base">
              ({userRoles.join(", ")})
            </p>
          ) : null}
        </div>

        <div className="flex justify-end gap-3 lg:gap-6">
          {isAdmin ? (
            <ToastToken
              tooltipTitle={dict.account.token}
              token={decryptedToken}
            />
          ) : null}

          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Link
                  className="bg-accent text-foreground hover:bg-input hover:text-background h-10 w-10 rounded-full p-3 transition-all lg:h-12 lg:w-12 lg:p-3.5"
                  href={`/account/settings`}
                >
                  <Settings className="h-full w-full" />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side="bottom"
                className="bg-accent text-foreground font-OpenSans"
              >
                <p>{dict.account.settings}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <SignOutIcon
            dict={dictResult.auth}
            className="h-10 w-10 p-3 lg:h-12 lg:w-12 lg:p-3.5"
          />
        </div>
      </div>

      <div className="">
        <AccountTabs dict={dictResult.account}>
          <TabsContent value="favourites" className="w-full py-10">
            favourites
          </TabsContent>
          <TabsContent value="collections" className="w-full py-10">
            collections
          </TabsContent>
          <TabsContent value="publications" className="w-full py-10">
            publications
          </TabsContent>
        </AccountTabs>
      </div>
    </div>
  );
}
