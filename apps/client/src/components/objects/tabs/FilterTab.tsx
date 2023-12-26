"use client";

import React from "react";
import { useAtomValue } from "jotai";

import type { CollectionsEnum } from "@siberiana/schemas";
import { cn } from "@siberiana/ui/src/lib/utils";

import { tabObjectsAtom } from "~/lib/utils/atoms";

export default function FilterTab({
  value,
  children,
  className,
}: {
  value: CollectionsEnum;
  children: React.ReactNode;
  className?: string;
}) {
  const tab = useAtomValue(tabObjectsAtom);

  return (
    <div className={cn(className, tab !== value && "hidden")}>{children}</div>
  );
}
