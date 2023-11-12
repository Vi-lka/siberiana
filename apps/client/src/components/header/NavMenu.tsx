"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import type { MenuDict } from "@siberiana/schemas";
import { GroupLink, SingleLink } from "@siberiana/schemas";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import NavListItem from "./NavListItem";

export default function NavMenu({ menuDict }: { menuDict: MenuDict }) {
  return (
    <NavigationMenu delayDuration={100}>
      <NavigationMenuList>
        {menuDict.map((menuItem, index) => (
          <NavMenuItem key={index} menuItem={menuItem} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavMenuItem({ menuItem }: { menuItem: SingleLink | GroupLink }) {
  const pathName = usePathname();

  // Remove query parameters
  const pathWithoutQuery = pathName.split("?")[0];

  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const pathNestedRoutes = pathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0);

  const pathCurrentPage = "/" + pathNestedRoutes[pathNestedRoutes.length - 1];

  function isNavStyle(menuItem: GroupLink) {
    const result = menuItem.list.find((item) => {
      if (pathCurrentPage === item.url.replace("?type=artifacts", "")) {
        return true; // stop searching
      } else return false;
    });

    if (result) return true;

    return false;
  }

  if (SingleLink.safeParse(menuItem).success) {
    const menuItemResult = menuItem as SingleLink;

    return (
      <NavigationMenuItem className="uppercase">
        <Link href={`${menuItemResult.url}`} legacyBehavior passHref>
          <NavigationMenuLink
            active={
              pathCurrentPage ===
              `${menuItemResult.url.replace("?type=artifacts", "")}`
            }
            className={navigationMenuTriggerStyle()}
          >
            {menuItemResult.name}
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
    );
  } else if (GroupLink.safeParse(menuItem).success) {
    const menuItemResult = menuItem as GroupLink;

    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger
          className={cn(
            "uppercase transition-all",
            isNavStyle(menuItemResult) ? "bg-accent/50 font-semibold" : "",
          )}
        >
          {menuItemResult.name}
        </NavigationMenuTrigger>

        <NavigationMenuContent>
          <div className="flex w-[385px] gap-1 p-4">
            <ul className="flex w-full flex-col justify-between gap-3">
              {menuItemResult.list.map((item, index) => (
                <NavListItem
                  key={index}
                  title={item.name}
                  href={`${item.url}`}
                  active={
                    pathCurrentPage ===
                    `${item.url.replace("?type=artifacts", "")}`
                  }
                  className="data-[state=open]:bg-accent/50 data-[active]:bg-accent/50 w-full"
                />
              ))}
            </ul>
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  } else return null;
}
