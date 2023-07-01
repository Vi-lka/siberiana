import * as React from "react";
import { Search } from "lucide-react";

import { cn } from "@siberiana/ui/src/lib/utils";

type InputSearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const HomeInputSearch = React.forwardRef<HTMLInputElement, InputSearchProps>(
  // eslint-disable-next-line react/prop-types
  ({ className, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "border-input ring-offset-background hover:ring-ring flex h-10 w-full items-center rounded-md border px-3 py-2 text-sm hover:ring-2 hover:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
      >
        <Search className="h-5 w-5" />
        <input
          type="search"
          className="placeholder:text-muted-foreground ml-0 flex h-full w-full rounded-md bg-transparent p-3 text-sm outline-none placeholder:text-[10px] placeholder:uppercase disabled:cursor-not-allowed sm:ml-2 sm:placeholder:text-sm"
          ref={ref}
          {...props}
        />
        {children}
      </div>
    );
  },
);
HomeInputSearch.displayName = "HomeInputSearch";

export { HomeInputSearch };
