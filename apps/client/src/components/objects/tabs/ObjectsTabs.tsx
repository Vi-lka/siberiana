"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAtom, useAtomValue } from "jotai";
import { Loader2 } from "lucide-react";

import type { CollectionsEnum, Dictionary } from "@siberiana/schemas";
import { Skeleton, Tabs, TabsList, TabsTrigger } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import {
  artifactsCountAtom,
  artsCountAtom,
  booksCountAtom,
  herbariumsCountAtom,
  PAPCountAtom,
  tabObjectsAtom,
} from "~/lib/utils/atoms";
import { ClientHydration } from "../../providers/ClientHydration";
import MasonrySkeleton from "../../skeletons/MasonrySkeleton";

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

  const [tab, setTab] = useAtom(tabObjectsAtom);

  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const type = searchParams.get("type") as CollectionsEnum ?? undefined;

  const tabs: Array<{
    value: CollectionsEnum,
    title: string,
    count: number,
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
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router, setTab],
  );

  const goToFilledTab = React.useCallback(() => {
    if (artifactsCount > 0) handleChangeTab("artifacts");
    else if (booksCount > 0) handleChangeTab("books");
    else if (PAPCount > 0) handleChangeTab("protected_area_pictures");
    else if (artsCount > 0) handleChangeTab("arts");
    else if (herbariumsCount > 0) handleChangeTab("herbariums");
  }, [
    PAPCount,
    artifactsCount,
    artsCount,
    booksCount,
    herbariumsCount,
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
                    disabled={isPending}
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
                {isPending ? (
                  <Loader2 className="h-6 w-6 animate-spin" />
                ) : null}
              </TabsList>
            ) : null}
          </div>
        </ClientHydration>
        {isPending ? (
          <div className="w-full">
            <MasonrySkeleton />
          </div>
        ) : (
          children
        )}
      </Tabs>
    </div>
  );
}
