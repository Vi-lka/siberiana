"use client";

import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

import { cn } from "@siberiana/ui/src/lib/utils";

import getShortDescription from "~/lib/utils/getShortDescription";

export default function Description({ text }: { text: string }) {
  const [more, setMore] = React.useState(false);

  const maxLength = 30;

  if (text.length <= 1) return null;

  return (
    <>
      <p
        className={cn(
          `font-Inter mt-3 overflow-hidden text-sm transition-[max-height] duration-300 ease-in-out md:text-base`,
          more ? "max-h-[100rem]" : "max-h-40",
        )}
      >
        {more ? text : getShortDescription(text, maxLength)}
      </p>
      {text.split(" ").length > maxLength ? (
        <div
          className="font-Inter text-beaver dark:text-beaverLight flex cursor-pointer items-center gap-1 text-sm uppercase hover:underline"
          onClick={() => setMore((value) => !value)}
        >
          {more ? (
            <>
              <p>Свернуть</p>
              <ChevronUp className="h-6 w-6 stroke-1" />
            </>
          ) : (
            <>
              <p>Читать далее</p>
              <ChevronDown className="h-6 w-6 stroke-1" />
            </>
          )}
        </div>
      ) : null}
    </>
  );
}
