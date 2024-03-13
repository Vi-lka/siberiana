"use client";

import React from "react";
import { useAtomValue } from "jotai";

import type { CollectionsEnum } from "@siberiana/schemas";
import { TabsContent } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import { tabObjectsAtom } from "~/lib/utils/atoms";

export default function ObjectsContent({
  value,
  children,
}: {
  value: CollectionsEnum;
  children: React.ReactNode;
}) {
  const tab = useAtomValue(tabObjectsAtom);

  return (
    <TabsContent
      value={value}
      forceMount
      className={cn("mt-0", tab === value ? "flex" : "hidden")}
    >
      {children}
    </TabsContent>
  );
}
