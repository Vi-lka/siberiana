import React from "react";
import Link from "next/link";

import { NavigationMenuLink, SheetClose } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  className?: string;
  title: string;
  href: string | undefined;
  active?: boolean;
  sheet?: boolean;
}

export default function NavListItem({
  className,
  title,
  href,
  active,
  sheet = false,
}: ListItemProps) {
  if (!href) return null;

  if (sheet)
    return (
      <li>
        <Link href={href} legacyBehavior passHref>
          <NavigationMenuLink
            active={active}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:text-beaverLight block select-none rounded-md leading-none no-underline outline-none transition-colors",
              className,
            )}
          >
            <SheetClose className="space-y-1 px-3 py-2 text-left">
              <div className="text-dark dark:text-foreground text-base font-normal leading-none md:text-lg">
                {title}
              </div>
            </SheetClose>
          </NavigationMenuLink>
        </Link>
      </li>
    );

  return (
    <li>
      <Link href={href} legacyBehavior passHref>
        <NavigationMenuLink
          active={active}
          className={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:text-beaverLight block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className,
          )}
        >
          <div className="text-dark dark:text-foreground text-base font-normal leading-none md:text-lg">
            {title}
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  );
}
