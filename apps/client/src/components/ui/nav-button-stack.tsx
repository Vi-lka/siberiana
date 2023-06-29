"use client";

import React from "react";

import {
  Button,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
} from "@siberiana/ui";

import { DialogComponent as AuthDialog } from "./dialog";
import LocaleSwitcher from "./locale-switcher";
import NavSheet from "./nav-sheet";
import { ModeToggle } from "./theme-toggle";

export default function NavButtonStack() {
  return (
    <>
      <ModeToggle />
      <LocaleSwitcher />

      {/* Desktop */}
      <div className="hidden lg:block">
        <AuthDialog name={"Войти"}>
          <DialogHeader>
            <DialogTitle>Войти</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you`re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input id="username" value="@peduarte" className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </AuthDialog>
      </div>

      {/* Mobile */}
      <div className="block pl-2 lg:hidden">
        <NavSheet />
      </div>
    </>
  );
}
