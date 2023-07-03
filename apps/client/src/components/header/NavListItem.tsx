import React from "react";

import { NavigationMenuLink } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  className?: string;
  title: string;
}

export const NavListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground dark:text-beaverLight block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
              className,
            )}
            {...props}
          >
            <div className="text-dark dark:text-foreground text-base font-medium leading-none md:text-lg">
              {title}
            </div>
            <p className="text-graphite dark:text-beaver line-clamp-2 text-xs leading-snug">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
NavListItem.displayName = "NavListItem";
