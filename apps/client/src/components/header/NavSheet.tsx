"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";

import type {
  AuthDictType,
  GroupLinkType,
  MenuDictType,
  SingleLinkType,
} from "@siberiana/schemas";
import {
  GroupLinkSchema,
  SingleLinkSchema,
} from "@siberiana/schemas";
import {
  buttonVariants,
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  ScrollArea,
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import { useLocale } from "~/lib/utils/useLocale";
import LogoSvg from "../LogoSvg";
import Icons from "../ui/IconsSwitch";
import NavListItem from "./NavListItem";

export default function NavSheet({
  menuDict,
  authDict,
}: {
  menuDict: MenuDictType;
  authDict: AuthDictType;
}) {
  const locale = useLocale();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-[2.5rem] w-[2.5rem] transition-all" />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mt-5 flex justify-center">
            <Link
              href={`${locale}`}
              className="relative h-[2.5rem] w-[7rem] md:h-[3.8125rem] md:w-[10rem]"
            >
              <SheetClose>
                <LogoSvg />
              </SheetClose>
            </Link>
          </SheetTitle>

          <SheetDescription className="font-Inter text-center">
            <Link href={`${locale}/login`}>
              <SheetClose
                className={cn(
                  buttonVariants(),
                  "hover:bg-beaver hover:text-beaverLight dark:bg-accent dark:text-beaverLight dark:hover:text-darkBlue dark:hover:bg-beaverLight mt-4 rounded-3xl px-10 py-6 uppercase",
                )}
              >
                {authDict.mainButton}
              </SheetClose>
            </Link>
          </SheetDescription>
        </SheetHeader>

        <NavigationMenu orientation="vertical">
          <NavigationMenuList className="flex flex-col items-center">
            <ScrollArea className="font-Inter mt-[2vh] h-[72vh] w-full p-1">
              {menuDict.map((menuItem, index) => (
                <SheetMenuItem
                  key={index}
                  locale={locale}
                  menuItem={menuItem}
                />
              ))}
            </ScrollArea>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}

function SheetMenuItem({
  locale,
  menuItem,
}: {
  locale: string;
  menuItem: SingleLinkType | GroupLinkType;
}) {
  const pathName = usePathname();

  // Remove query parameters
  const pathWithoutQuery = pathName.split("?")[0];

  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const pathNestedRoutes = pathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0);

  // Remove locale
  const pathCurrentPage = pathNestedRoutes[pathNestedRoutes.length - 1];

  if (SingleLinkSchema.safeParse(menuItem).success) {
    const menuItemResult = menuItem as SingleLinkType;

    return (
      <div className="mb-1 mt-6 flex w-full gap-1 py-2">
        <div className="from-muted/50 to-muted dark:bg-accent flex flex-col justify-center rounded-md bg-gradient-to-b px-1 py-2">
          <Icons
            icon={menuItemResult.image}
            className="text-dark dark:text-beaverLight h-[50px] w-[50px] p-1"
          />
        </div>

        <ul className="flex flex-col justify-center">
          <NavListItem
            key={menuItemResult.id}
            title={menuItemResult.name}
            href={`${locale}${menuItemResult.url}`}
            active={pathCurrentPage === `${menuItemResult.url}`}
            className="data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 py-1"
            sheet
          >
            {menuItemResult.description}
          </NavListItem>
        </ul>
      </div>
    );
  } else if (GroupLinkSchema.safeParse(menuItem).success) {
    const menuItemResult = menuItem as GroupLinkType;

    return (
      <NavigationMenuItem>
        <h4 className="text-dark dark:text-beaverLight mb-1 mt-6 text-base font-medium uppercase">
          {menuItemResult.name}
        </h4>

        <div className="flex w-full gap-1 py-2">
          <div className="from-muted/50 to-muted dark:bg-accent flex flex-col justify-around gap-1 rounded-md bg-gradient-to-b px-1 py-2">
            {menuItemResult.list.map((item, index) => (
              <Icons
                key={index}
                icon={item.image}
                className="text-dark dark:text-beaverLight h-[50px] w-[50px] p-1"
              />
            ))}
          </div>

          <ul className="flex flex-col justify-around gap-1">
            {menuItemResult.list.map((item) => (
              <NavListItem
                key={item.id}
                title={item.name}
                href={`${locale}${item.url}`}
                active={pathCurrentPage === `${item.url}`}
                className="data-[state=open]:bg-accent/50 data-[active]:bg-accent/50"
                sheet
              >
                {item.description}
              </NavListItem>
            ))}
          </ul>
        </div>
      </NavigationMenuItem>
    );
  } else return null;
}
