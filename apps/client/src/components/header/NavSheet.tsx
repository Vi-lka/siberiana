"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import type {
  AuthDict,
  MenuDict,
} from "@siberiana/schemas";
import {
  GroupLink,
  SingleLink,
} from "@siberiana/schemas";
import {
  buttonVariants,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  ScrollArea,
  Separator,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";
import LogoSvg from "../LogoSvg";
import NavListItem from "./NavListItem";
import { signIn } from "next-auth/react";
import type { Session } from "next-auth";

export default function NavSheet({
  menuDict,
  authDict,
  session
}: {
  menuDict: MenuDict;
  authDict: AuthDict;
  session: Session | null
}) {

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-[2.5rem] w-[2.5rem] transition-all" />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mt-5">
            <Link
              href={`/`}
              className="relative h-[2.5rem] w-[7rem] md:h-[3.8125rem] md:w-[10rem]"
            >
              <SheetClose>
                <LogoSvg />
              </SheetClose>
            </Link>
          </SheetTitle>

          <SheetDescription className="font-Inter text-center">
            {!!session ? null : (
              <SheetClose
                className={cn(
                  buttonVariants(),
                  "hover:bg-beaver hover:text-beaverLight dark:bg-accent dark:text-beaverLight dark:hover:text-darkBlue dark:hover:bg-beaverLight mt-4 rounded-3xl px-10 py-6 uppercase",
                )}
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={() => signIn("keycloak")}
              >
                {authDict.signIn}
              </SheetClose>
            )}
          </SheetDescription>
        </SheetHeader>

        <NavigationMenu orientation="vertical" className="block w-full">
          <NavigationMenuList className="flex flex-col w-full">
            <ScrollArea 
              className={cn(
                "font-Inter mt-[2vh] w-full p-1",
                !!session ? "h-[80vh]" : "h-[72vh]",
              )}
            >
              {menuDict.map((menuItem, index) => (
                <SheetMenuItem
                  key={index}
                  menuItem={menuItem}
                />
              ))}
              <div className="h-20"/>
            </ScrollArea>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}

function SheetMenuItem({
  menuItem,
}: {
  menuItem: SingleLink | GroupLink;
}) {
  const pathName = usePathname();

  // Remove query parameters
  const pathWithoutQuery = pathName.split("?")[0];

  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const pathNestedRoutes = pathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0);

  const pathCurrentPage = pathNestedRoutes[pathNestedRoutes.length - 1];

  if (SingleLink.safeParse(menuItem).success) {
    const menuItemResult = menuItem as SingleLink;

    return (
      <div className="mb-1 mt-6 flex w-full gap-1 py-2">
        <ul className="flex flex-col justify-center w-full">
          <NavListItem
            key={menuItemResult.id}
            title={menuItemResult.name}
            href={`${menuItemResult.url}`}
            active={pathCurrentPage === `${menuItemResult.url.replace('/','')}`}
            className="py-2 data-[state=open]:bg-accent/50 data-[active]:bg-accent/50"
            sheet
          />
        </ul>
      </div>
    );
  } else if (GroupLink.safeParse(menuItem).success) {
    const menuItemResult = menuItem as GroupLink;

    return (
      <NavigationMenuItem>
        <h4 className="text-dark dark:text-beaverLight mb-1 mt-6 text-base font-semibold uppercase">
          {menuItemResult.name}
        </h4>

        <Separator className="h-[2px]" />

        <div className="flex w-full gap-1 py-2">
          <ul className="flex flex-col justify-around gap-1 w-11/12">
            {menuItemResult.list.map((item) => (
              <NavListItem
                key={item.id}
                title={item.name}
                href={`${item.url}`}
                active={pathCurrentPage === `${item.url.replace('/','')}`}
                className="py-2 data-[state=open]:bg-accent/50 data-[active]:bg-accent/50"
                sheet
              />
            ))}
          </ul>
        </div>
      </NavigationMenuItem>
    );
  } else return null;
}
