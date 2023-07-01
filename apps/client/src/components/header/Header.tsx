import React from "react";
import Link from "next/link";

import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@siberiana/ui";

import { getDictionary } from "~/lib/utils/getDictionary";
import LogoSvg from "../LogoSvg";
import { DialogComponent as AuthDialog } from "../ui/dialog";
import { ModeToggle } from "../ui/theme-toggle";
import LocaleSwitcher from "./locale-switcher";
import NavMenu from "./nav-menu";
import NavSheet from "./nav-sheet";

export default async function Header({ lang }: { lang: string }) {
  const dict = await getDictionary(lang);

  return (
    <div className="font-Inter text-graphite dark:text-beaverLight dark:bg-darkBlue fixed z-50 w-full bg-white p-4">
      <div className="mx-auto flex w-[95%] max-w-[1600px] items-center justify-between xl:w-[85%]">
        <div className="flex w-1/5">
          <Link
            href={`/${lang}`}
            className="relative h-[2.5rem] w-[7rem] md:h-[3.5rem] md:w-[9rem]"
          >
            <LogoSvg isAdaptive />
          </Link>
        </div>

        <div className="hidden w-fit lg:block">
          <NavMenu menuData={dict.menu} />
        </div>

        <div className="flex w-1/5 items-center justify-end gap-2 xl:gap-3">
          <ModeToggle />
          <LocaleSwitcher />

          {/* Desktop */}
          <div className="hidden lg:block">
            <AuthDialog name={dict.loginButton}>
              <DialogHeader>
                <DialogTitle>Войти</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you`re
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Pedro Duarte"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="@peduarte"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </AuthDialog>
          </div>

          {/* Mobile */}
          <div className="block pl-2 lg:hidden">
            <NavSheet menuData={dict.menu} />
          </div>
        </div>
      </div>
    </div>
  );
}
