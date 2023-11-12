"use client";

import React from "react";
import { Copy, KeyRound } from "lucide-react";

import {
  Button,
  ToastAction,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useToast,
} from "@siberiana/ui";

export default function ToastToken({
  tooltipTitle,
  token,
}: {
  tooltipTitle: string;
  token: string;
}) {
  const { toast } = useToast();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            className="bg-accent text-foreground hover:bg-input hover:text-background h-10 w-10 rounded-full p-3 transition-all lg:h-12 lg:w-12 lg:p-3.5"
            onClick={() => {
              void navigator.clipboard.writeText(token);
              toast({
                variant: "default",
                title: "Токен скопирован!",
                description: "Копировать снова:",
                className:
                  "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
                action: (
                  <ToastAction
                    className="hover:bg-background/20 dark:border-foreground px-2 py-6 text-sm"
                    altText={"Copy"}
                    onClick={() => void navigator.clipboard.writeText(token)}
                  >
                    <Copy className="h-8 w-8" />
                  </ToastAction>
                ),
              });
            }}
          >
            <KeyRound className="h-full w-full" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-accent text-foreground font-OpenSans"
        >
          <p>{tooltipTitle}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
