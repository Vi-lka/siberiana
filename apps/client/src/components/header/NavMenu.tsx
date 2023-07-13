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
import Icons from "../ui/IconsSwitch";
import NavListItem from "./NavListItem";

export default function NavMenu({ menuDict }: { menuDict: MenuZoneType }) {
  const locale = useLocale();

  const dictResult = MenuZoneSchema.parse(menuDict);

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {dictResult.map((menuItem, index) => (
          <NavMenuItem key={index} locale={locale} menuItem={menuItem} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavMenuItem({
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
      <NavigationMenuItem className="uppercase">
        <Link href={`${locale}${menuItemResult.url}`} legacyBehavior passHref>
          <NavigationMenuLink
            active={pathCurrentPage === `${menuItemResult.url}`}
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
                  href={`${locale}${item.url}`}
                  active={pathCurrentPage === `${item.url}`}
                  className="data-[state=open]:bg-accent/50 data-[active]:bg-accent/50"
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
