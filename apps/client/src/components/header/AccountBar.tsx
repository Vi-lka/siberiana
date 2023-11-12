"use client";

import React from "react";
import Link from "next/link";
import { useSetAtom } from "jotai";
import { signOut } from "next-auth/react";

import type { AccountDict } from "@siberiana/schemas";
import {
  Avatar,
  AvatarFallback,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from "@siberiana/ui";

import { tabAccountAtom } from "~/lib/utils/atoms";
import { ClientHydration } from "../providers/ClientHydration";

export default function AccountBar({
  dict,
  name,
}: {
  dict: AccountDict;
  name?: string;
}) {
  const matchesName = name?.match(/[\wа-я]+/gi);
  const acronymName = !!matchesName
    ? matchesName.map((match) => {
        return match[0].toUpperCase();
      })
    : "USER";

  const setTab = useSetAtom(tabAccountAtom);

  return (
    <div className="font-Inter text-sm">
      <DropdownMenu>
        <ClientHydration
          fallback={
            <Skeleton className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full" />
          }
        >
          <DropdownMenuTrigger className="rounded-full">
            <Avatar className="ring-ring ring-offset-background transition-all hover:ring hover:ring-offset-2">
              {/* <AvatarImage src={image} /> */}
              <AvatarFallback className="font-semibold">
                {acronymName}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
        </ClientHydration>

        <DropdownMenuContent className="font-Inter text-foreground w-56">
          <DropdownMenuLabel>{dict.barTitle}</DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link href={`/account`}>
              <DropdownMenuItem className="cursor-pointer">
                {dict.profile}
              </DropdownMenuItem>
            </Link>
            <Link href={`/account/settings`}>
              <DropdownMenuItem className="cursor-pointer">
                {dict.settings}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuGroup>
            <Link href={`/account`}>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTab("favourites")}
              >
                {dict.favourites}
              </DropdownMenuItem>
            </Link>

            <Link href={`/account`}>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTab("collections")}
              >
                {dict.collections}
              </DropdownMenuItem>
            </Link>

            <Link href={`/account`}>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => setTab("publications")}
              >
                {dict.publications}
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />

          <DropdownMenuItem className="cursor-pointer p-0">
            <Button
              className="block h-fit w-full px-2 py-1.5 text-left font-normal"
              variant="ghost"
              onClick={() => void signOut()}
            >
              {dict.signOut}
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
