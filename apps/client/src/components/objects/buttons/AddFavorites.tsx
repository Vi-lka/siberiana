"use client";

import React from "react";
import { Heart } from "lucide-react";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siberiana/ui";

export default function AddFavorites({ session }: { session: boolean }) {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            className="hover:bg-beaver hover:text-beaverLight dark:bg-accent dark:text-beaverLight dark:hover:text-darkBlue dark:hover:bg-beaverLight h-12 w-12 rounded-full p-3.5"
            onClick={() => console.log(session)}
          >
            <Heart />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-accent text-foreground font-OpenSans cursor-help font-normal"
        >
          Добавить в избранное
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
