"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@siberiana/ui";

import { localesCodes } from "~/lib/static/locales";
import { useLocale } from "~/lib/utils/useLocale";

export default function LocaleSwitcher() {
  const lang = useLocale();

  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <span className="uppercase text-base sm:text-sm">{lang}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-fit min-w-[50px]">
        {localesCodes.map((locale, index) => {
          return (
            <Link
              key={index}
              href={redirectedPathName(locale)}
              className="dark:text-beaverLight flex justify-center"
            >
              <DropdownMenuItem className="font-Inter cursor-pointer uppercase text-base sm:text-sm">
                {locale}
              </DropdownMenuItem>
            </Link>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
