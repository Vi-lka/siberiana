"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

import type { AuthDict } from "@siberiana/schemas";
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import ButtonComponent from "../ui/ButtonComponent";

type Props = {
  dict: AuthDict;
  className?: string;
};

export const SignInButton = ({ dict, className }: Props) => {
  return (
    <ButtonComponent
      className={className}
      onClick={() => void signIn("keycloak")}
    >
      {dict.signIn}
    </ButtonComponent>
  );
};

export const SignOutButton = ({
  dict,
  className,
  variant,
}: Props & {
  variant?:
    | "link"
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "hidden"
    | null;
}) => {
  return (
    <ButtonComponent
      className={className}
      variant={variant}
      onClick={() => void signOut()}
    >
      {dict.signOut}
    </ButtonComponent>
  );
};

export const SignOutIcon = ({ dict, className }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              "bg-accent text-foreground hover:bg-input hover:text-background rounded-full transition-all",
              className,
            )}
            onClick={() => void signOut()}
          >
            <LogOut className="h-full w-full" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-accent text-foreground font-OpenSans"
        >
          <p>{dict.signOut}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
