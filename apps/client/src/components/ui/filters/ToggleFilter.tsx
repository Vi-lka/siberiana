"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import {
  Toggle,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siberiana/ui";

import resetPaginationts from "~/lib/utils/resetPagination";

export default function ToggleFilter({
  tooltip,
  param,
  children,
  className,
}: {
  tooltip: string;
  param: string;
  children: React.ReactNode;
  className?: string;
}) {
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentParam = searchParams.get(param) ?? undefined;

  const handleToggleParams = React.useCallback(
    (pressed: boolean) => {
      const params = new URLSearchParams(window.location.search);

      // reset pagination(page) to prevent zero results
      resetPaginationts(params);

      if (pressed === true) {
        params.set(param, pressed.toString());
      } else {
        params.delete(param);
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [param, pathname, router],
  );

  if (isPending)
    return <Loader2 className="ml-3 animate-spin md:ml-0 md:mr-3" />;

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <Toggle
          aria-label={tooltip}
          pressed={Boolean(currentParam)}
          onPressedChange={handleToggleParams}
          asChild
        >
          <TooltipTrigger className={className}>{children}</TooltipTrigger>
        </Toggle>

        <TooltipContent
          side="bottom"
          className="bg-accent text-foreground font-OpenSans"
        >
          <p>{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
