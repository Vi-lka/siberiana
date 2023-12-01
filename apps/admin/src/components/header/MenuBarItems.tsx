"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";

import type { GroupLink } from "@siberiana/schemas";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export function MenuBarSingle({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const pathName = usePathname();

  // Remove query parameters
  const pathWithoutQuery = pathName.split("?")[0];

  // Ex:"/my/nested/path" --> ["my", "nested", "path"]
  const pathNestedRoutes = pathWithoutQuery
    .split("/")
    .filter((v) => v.length > 0);

  const pathCurrentPage = "/" + pathNestedRoutes[pathNestedRoutes.length - 1];

  return (
    <NavigationMenuItem className="ml-1 flex w-full">
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          active={pathCurrentPage === href}
          className={cn(
            navigationMenuTriggerStyle(),
            "hover:bg-primary/80 focus:bg-primary/80 data-[state=open]:bg-primary data-[active]:bg-primary w-full justify-start text-base font-normal hover:text-white focus:text-white data-[active]:text-white data-[state=open]:text-white",
          )}
        >
          {children}
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  );
}

export function MenuBarGroup({
  menuItem,
  href,
}: {
  menuItem: GroupLink;
  href: string;
}) {
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
      if (pathCurrentPage === item.url) {
        return true; // stop searching
      } else return false;
    });

    if (result) return true;

    return false;
  }

  return (
    <HoverCard openDelay={250} closeDelay={240}>
      <HoverCardTrigger asChild>
        <NavigationMenuItem className="ml-1 flex w-full">
          <Link href={href} legacyBehavior passHref>
            <NavigationMenuLink
              active={pathCurrentPage === href}
              className={cn(
                navigationMenuTriggerStyle(),
                isNavStyle(menuItem) ? "bg-primary text-white" : "",
                "hover:bg-primary/80 focus:bg-primary/80 data-[state=open]:bg-primary data-[active]:bg-primary w-full justify-start text-base font-normal hover:text-white focus:text-white data-[active]:text-white data-[state=open]:text-white",
              )}
            >
              {menuItem.name} <ChevronDown className="h-4 w-4 self-center" />
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </HoverCardTrigger>

      <HoverCardContent
        className="z-50 flex w-fit gap-1 p-1"
        side="right"
        align="start"
        sideOffset={8}
      >
        <ul className="flex w-full flex-col justify-between gap-1">
          {menuItem.list.map((item, index) => (
            <NavigationMenuItem key={index} className="ml-0 flex w-full">
              <Link href={item.url} legacyBehavior passHref>
                <NavigationMenuLink
                  active={pathCurrentPage === item.url}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "hover:bg-primary/80 focus:bg-primary/80 data-[state=open]:bg-primary data-[active]:bg-primary w-full justify-start font-normal hover:text-white focus:text-white data-[active]:text-white data-[state=open]:text-white",
                  )}
                >
                  {item.name}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </ul>
      </HoverCardContent>
    </HoverCard>
  );
}
