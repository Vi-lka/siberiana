"use client"

import { HoverCard, HoverCardContent, HoverCardTrigger, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@siberiana/ui'
import Link from 'next/link'
import React from 'react'
import { usePathname } from "next/navigation";
import { cn } from '@siberiana/ui/src/lib/utils';
import type { GroupLink } from "@siberiana/schemas";
import { ChevronDown } from 'lucide-react';

export function MenuBarSingle({
    children,
    href,
}: {
    children: React.ReactNode
    href: string,
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
        <NavigationMenuItem className='w-full flex ml-1'>
            <Link href={href} legacyBehavior passHref>
                <NavigationMenuLink 
                    active={pathCurrentPage === href} 
                    className={cn(
                        navigationMenuTriggerStyle(),
                        "w-full font-normal text-base justify-start hover:bg-primary/80 focus:bg-primary/80 hover:text-white focus:text-white data-[state=open]:bg-primary data-[active]:bg-primary data-[state=open]:text-white data-[active]:text-white"
                    )}
                >
                    {children}
                </NavigationMenuLink>
            </Link>
        </NavigationMenuItem>
    )
}

export function MenuBarGroup({
    menuItem,
    href,
}: {
    menuItem: GroupLink,
    href: string,
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
          } else return false
        })
    
        if (result) return true
    
        return false
      }

    return (
        <HoverCard openDelay={320} closeDelay={300}>
            <HoverCardTrigger asChild>
                <NavigationMenuItem className='w-full flex ml-1'>
                    <Link href={href} legacyBehavior passHref>
                        <NavigationMenuLink 
                            active={pathCurrentPage === href} 
                            className={cn(
                                navigationMenuTriggerStyle(),
                                isNavStyle(menuItem) ? "bg-primary text-white" : "",
                                "w-full text-base font-normal justify-start hover:bg-primary/80 focus:bg-primary/80 hover:text-white focus:text-white data-[state=open]:bg-primary data-[active]:bg-primary data-[state=open]:text-white data-[active]:text-white"
                            )}
                        >
                            {menuItem.name} <ChevronDown className='w-4 h-4 self-center'/>
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
            </HoverCardTrigger>

            <HoverCardContent className='flex w-fit gap-1 p-1 z-50' side="right" align="start" sideOffset={8}>
                <ul className="flex flex-col justify-between gap-1 w-full">
                    {menuItem.list.map((item, index) => (
                        <NavigationMenuItem key={index} className='w-full flex ml-0'>
                            <Link href={item.url} legacyBehavior passHref>
                                <NavigationMenuLink 
                                    active={pathCurrentPage === item.url} 
                                    className={cn(
                                        navigationMenuTriggerStyle(),
                                        "w-full font-normal justify-start hover:bg-primary/80 focus:bg-primary/80 hover:text-white focus:text-white data-[state=open]:bg-primary data-[active]:bg-primary data-[state=open]:text-white data-[active]:text-white"
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
    )
}
