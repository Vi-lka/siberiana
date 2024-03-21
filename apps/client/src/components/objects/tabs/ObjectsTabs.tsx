"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";

import type { CollectionsEnum, Dictionary } from "@siberiana/schemas";
import { Skeleton, Tabs, TabsList, TabsTrigger } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import {
  artifactsCountAtom,
  artsCountAtom,
  booksCountAtom,
  dendroCountAtom,
  herbariumsCountAtom,
  PAPCountAtom,
  tabObjectsAtom,
} from "~/lib/utils/atoms";
import { ClientHydration } from "../../providers/ClientHydration";

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
  const herbariumsCount = useAtomValue(herbariumsCountAtom);
  const dendroCount = useAtomValue(dendroCountAtom);

  const [tab, setTab] = useAtom(tabObjectsAtom);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const type = (searchParams.get("type") as CollectionsEnum) ?? undefined;

  const tabs: Array<{
    value: CollectionsEnum;
    title: string;
    count: number;
  }> = [
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
    {
      value: "herbariums",
      title: dict.objects.herbariums,
      count: herbariumsCount,
    },
    {
      value: "dendrochronologies",
      title: dict.objects.dendrochronologies,
      count: dendroCount
    }
  ];

  const notEmptyTabs = tabs.filter(function (el) {
    if (el.count === 0) {
      return false; // skip empty
    }
    return true;
  });

  const handleChangeTab = React.useCallback(
    (value: CollectionsEnum) => {
      setTab(value);
      const params = new URLSearchParams(window.location.search);
      params.set("type", value);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, setTab],
  );

  const handlePrefetchTab = React.useCallback(
    (value: CollectionsEnum) => {
      const params = new URLSearchParams(window.location.search);
      params.set("type", value);
      router.prefetch(`${pathname}?${params.toString()}`);
    },
    [pathname, router],
  );

  const goToFilledTab = React.useCallback(() => {
    if (artifactsCount > 0) handleChangeTab("artifacts");
    else if (booksCount > 0) handleChangeTab("books");
    else if (PAPCount > 0) handleChangeTab("protected_area_pictures");
    else if (artsCount > 0) handleChangeTab("arts");
    else if (herbariumsCount > 0) handleChangeTab("herbariums");
    else if (dendroCount > 0) handleChangeTab("dendrochronologies");
  }, [
    PAPCount,
    artifactsCount,
    artsCount,
    booksCount,
    herbariumsCount,
    dendroCount,
    handleChangeTab,
  ]);

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
        artsCount > 0 ? handleChangeTab("arts") : goToFilledTab();
        break;
      case "herbariums":
        herbariumsCount > 0 ? handleChangeTab("herbariums") : goToFilledTab();
        break;
      case "dendrochronologies":
        dendroCount > 0 ? handleChangeTab("dendrochronologies") : goToFilledTab();
        break;
      default:
        goToFilledTab();
        break;
    }
  }, [
    PAPCount,
    artifactsCount,
    artsCount,
    booksCount,
    herbariumsCount,
    dendroCount,
    goToFilledTab,
    handleChangeTab,
    type,
  ]);

  function isSingleTab() {
    return notEmptyTabs.length === 1 ? true : false;
  }

  return (
    <div className="flex w-full flex-col">
      <Tabs
        className="w-full"
        value={tab}
        onValueChange={(value) => handleChangeTab(value as CollectionsEnum)}
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
                    onMouseEnter={() => handlePrefetchTab(tab.value)}
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
