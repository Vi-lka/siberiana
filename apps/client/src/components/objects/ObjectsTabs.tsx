"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";

import type { Dictionary } from "@siberiana/schemas";
import { Skeleton, Tabs, TabsList, TabsTrigger } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import {
  artifactsCountAtom,
  artsCountAtom,
  booksCountAtom,
  PAPCountAtom,
  tabObjectsAtom,
} from "~/lib/utils/atoms";
import { ClientHydration } from "../providers/ClientHydration";

export default function ObjectTabs({
  dict,
  children,
}: {
  dict: Dictionary;
  children: React.ReactNode;
}) {
  const artifactsCount = useAtomValue(artifactsCountAtom);
  const booksCount = useAtomValue(booksCountAtom);
  const PAPCount = useAtomValue(PAPCountAtom);
  const artsCount = useAtomValue(artsCountAtom);

  const [tabObject, setTabObject] = useAtom(tabObjectsAtom);

  const [_, startTransition] = React.useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const type = searchParams.get("type") ?? undefined;

  const tabs = [
    {
      value: "artifacts",
      title: dict.objects.artifacts,
      count: artifactsCount,
    },
    { value: "books", title: dict.objects.books, count: booksCount },
    {
      value: "protected_area_pictures",
      title: dict.objects.protectedAreaPictures,
      count: PAPCount,
    },
    {
      value: "arts",
      title: dict.objects.arts,
      count: artsCount,
    },
  ];

  const notEmptyTabs = tabs.filter(function (el) {
    if (el.count === 0) {
      return false; // skip empty
    }
    return true;
  });

  const handleChangeTab = React.useCallback(
    (value: string) => {
      setTabObject(value);
      const params = new URLSearchParams(window.location.search);
      params.set("type", value);
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, setTabObject],
  );

  const goToFilledTab = React.useCallback(() => {
    if (artifactsCount > 0) handleChangeTab("artifacts");
    else if (booksCount > 0) handleChangeTab("books");
    else if (PAPCount > 0) handleChangeTab("protected_area_pictures");
    else if (artsCount > 0) handleChangeTab("arts");
  }, [PAPCount, artifactsCount, artsCount, booksCount, handleChangeTab]);

  React.useEffect(() => {
    switch (type) {
      case "artifacts":
        artifactsCount > 0 ? handleChangeTab("artifacts") : goToFilledTab();
        break;
      case "books":
        booksCount > 0 ? handleChangeTab("books") : goToFilledTab();
        break;
      case "protected_area_pictures":
        PAPCount > 0
          ? handleChangeTab("protected_area_pictures")
          : goToFilledTab();
        break;
      case "arts":
        artsCount > 0
          ? handleChangeTab("arts")
          : goToFilledTab();
        break;
      default:
        goToFilledTab();
        break;
    }
  }, [PAPCount, artifactsCount, artsCount, booksCount, goToFilledTab, handleChangeTab, type]);

  function isSingleTab() {
    return notEmptyTabs.length === 1 ? true : false;
  }

  return (
    <div className="flex w-full flex-col">
      <Tabs
        className="w-full"
        value={tabObject}
        onValueChange={(value: string) => handleChangeTab(value)}
      >
        <ClientHydration fallback={<Skeleton className="mt-2 h-10 w-full" />}>
          <div className="mt-2 flex flex-wrap items-center gap-3 lg:mr-40">
            {notEmptyTabs.length > 0 ? (
              <TabsList
                className={cn(
                  "font-OpenSans h-fit flex-wrap",
                  isSingleTab() && "bg-transparent",
                )}
              >
                {notEmptyTabs.map((tab, index) => (
                  <TabsTrigger
                    key={index}
                    value={tab.value}
                    className={isSingleTab() ? "cursor-default" : ""}
                  >
                    {isSingleTab() ? (
                      <p key={Math.random()}>
                        {dict.objects.count}: {tab.count}
                      </p>
                    ) : (
                      <p>
                        {tab.title} <sup>{tab.count}</sup>
                      </p>
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            ) : null}
          </div>
        </ClientHydration>
        {children}
      </Tabs>
    </div>
  );
}
