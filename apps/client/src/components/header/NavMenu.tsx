"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@siberiana/ui";

import { useLocale } from "~/lib/utils/useLocale";
import { NavListItem } from "./NavListItem";
import Icons from "../ui/IconsSwitch";

export default function NavMenu({ menuData }: { menuData: MenuZoneType }) {
  const lang = useLocale();

  const data = MenuZoneSchema.parse(menuData);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {data?.map((menuItem, index) => (
          <NavMenuItem key={index} lang={lang} menuItem={menuItem} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavMenuItem({
  lang,
  menuItem,
}: {
  lang: string;
  menuItem: SingleLinkType | GroupLinkType;
}) {
  const pathName = usePathname();

  if (SingleLinkSchema.safeParse(menuItem).success) {
    const menuItemResult = menuItem as SingleLinkType;

    return (
      <NavigationMenuItem className="uppercase">
        <Link href={`/${lang}/${menuItemResult.url}`} legacyBehavior passHref>
          <NavigationMenuLink
            active={pathName === `/${lang}/${menuItemResult.url}`}
            className={navigationMenuTriggerStyle()}
          >
            {menuItemResult.name}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  } else if (GroupLinkSchema.safeParse(menuItem).success) {
    const menuItemResult = menuItem as GroupLinkType;

    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="uppercase">
          {menuItemResult.name}
        </NavigationMenuTrigger>

        <NavigationMenuContent>
          <div className="flex w-[450px] gap-1 p-4">
            <div className="from-muted/50 to-muted dark:bg-accent flex min-w-[80px] max-w-[90px] flex-col justify-between gap-3 rounded-md bg-gradient-to-b p-4">
              {menuItemResult.list.map((item, index) => (
                <Icons
                  key={index}
                  icon={item.image}
                  className="text-dark dark:text-beaverLight h-[50px] w-[50px] p-1"
                />
              ))}
            </div>

            <ul className="flex flex-col justify-between gap-3">
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
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  } else return null;
}
