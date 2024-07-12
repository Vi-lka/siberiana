"use client";

import React from "react";
import { Menu, X } from "lucide-react";

import {
  Button,
  NavigationMenu,
  NavigationMenuList,
  ScrollArea,
  Separator,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import {
  artifactsMenuItems,
  artsMenuItems,
  booksMenuItems,
  holdersMenuItems,
  locationsMenuItems,
  ooptMenuItems,
  organizationsMenuItems,
  projectsMenuItems,
} from "~/lib/static/menu";
import { MenuBarGroup, MenuBarSingle } from "./MenuBarItems";

function getWindowSize() {
  if (typeof window !== "undefined") {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }
}

export default function MenuBar() {
  // Yes, not elegant, but simple and works)
  const [open, setOpen] = React.useState(false);
  const [windowSize, setWindowSize] = React.useState(getWindowSize());

  React.useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  React.useEffect(() => {
    if (window.innerWidth <= 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [windowSize?.innerWidth]);

  return (
    <>
      <Button
        className="fixed left-1/2 z-50 mt-4 block -translate-x-1/2 transform md:hidden"
        onClick={() => setOpen((open) => !open)}
      >
        {open ? <X /> : <Menu />}
      </Button>
      <NavigationMenu
        orientation="vertical"
        className="nav-bar bg-background fixed z-30 mt-16 max-w-[14rem] rounded-b-md border border-l-0 border-t-0 pr-1 shadow-md md:mt-20"
      >
        <ScrollArea
          className={cn(
            "font-Inter mb-1 w-full p-1 pr-2",
            open ? "flex" : "hidden",
          )}
          classNameViewport={"max-h-[85dvh] min-h-[80vh]"}
        >
          <NavigationMenuList className="flex w-full flex-col items-start gap-3 p-2 text-left">
            <MenuBarSingle href="/categories">Категории</MenuBarSingle>
            <MenuBarSingle href="/collections">Коллекции</MenuBarSingle>

            <Separator className="bg-primary" />

            <MenuBarGroup menuItem={artifactsMenuItems} href="/artifacts" />
            <MenuBarGroup menuItem={booksMenuItems} href="/books" />
            <MenuBarGroup menuItem={ooptMenuItems} href="/oopt" />
            <MenuBarGroup menuItem={artsMenuItems} href="/arts" />

            <Separator className="bg-primary" />

            <MenuBarGroup menuItem={locationsMenuItems} href="/locations" />

            <Separator className="bg-primary" />

            <MenuBarGroup menuItem={holdersMenuItems} href="/holders" />
            <MenuBarGroup
              menuItem={organizationsMenuItems}
              href="/organizations"
            />
            <MenuBarSingle href="/persons">Личности</MenuBarSingle>

            <Separator className="bg-primary" />

            <MenuBarGroup menuItem={projectsMenuItems} href="/projects" />
            <MenuBarSingle href="/publications">Публикации</MenuBarSingle>
            <MenuBarSingle href="/licenses">Лицензии</MenuBarSingle>
          </NavigationMenuList>
        </ScrollArea>
      </NavigationMenu>
    </>
  );
}
