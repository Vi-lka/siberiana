"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

import type {
  GroupLinkType,
  MenuZoneType,
  SingleLinkType,
} from "@siberiana/schemas";
import {
  GroupLinkSchema,
  MenuZoneSchema,
  SingleLinkSchema,
} from "@siberiana/schemas";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  ScrollArea,
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@siberiana/ui";

import { useLocale } from "~/lib/utils/useLocale";
import LogoSvg from "../LogoSvg";
import { NavListItem } from "./NavListItem";
import Icons from "../ui/IconsSwitch";

export default function NavSheet({ menuData }: { menuData: MenuZoneType }) {
  const lang = useLocale();

  const data = MenuZoneSchema.parse(menuData);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu className="h-[1.5rem] w-[1.5rem] transition-all" />
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="mt-5 flex justify-center">
            <Link
              href={`/${lang}`}
              className="relative h-[2.5rem] w-[7rem] md:h-[3.8125rem] md:w-[10rem]"
            >
              <SheetClose>
                <LogoSvg />
              </SheetClose>
            </Link>
          </SheetTitle>
        </SheetHeader>

        <NavigationMenu orientation="vertical">
          <NavigationMenuList className="flex flex-col items-center">
            <ScrollArea className="font-Inter mt-[2vh] h-[80vh] w-full p-1">
              {data?.map((menuItem, index) => (
                <SheetMenuItem key={index} lang={lang} menuItem={menuItem} />
              ))}
            </ScrollArea>
          </NavigationMenuList>
        </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}

function SheetMenuItem({
  lang,
  menuItem,
}: {
  lang: string;
  menuItem: SingleLinkType | GroupLinkType;
}) {
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
            href={`/${lang}/${menuItemResult.url}`}
            className="py-1"
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
                href={`/${lang}/${item.url}`}
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
