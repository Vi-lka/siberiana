"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { RefreshCcw } from "lucide-react";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function RefreshPage({
  side = "left",
  className,
}: {
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}) {
  const [isPending, startTransition] = React.useTransition();
  const router = useRouter();

  const handleRefresh = () => {
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={150}>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            disabled={isPending}
            className={cn(
              "mr-3 hidden h-fit w-fit p-3 md:flex",
              isPending ? "animate-spin" : "",
              className,
            )}
            onClick={handleRefresh}
          >
            <RefreshCcw className="h-6 w-6" />
            <span className="sr-only">Refresh page</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side={side}>
          <p className="font-OpenSans">Перезагрузить</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
