"use client";

import React from "react";
import { LogOut } from "lucide-react";
import { signIn, signOut } from "next-auth/react";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

type Props = {
  className?: string;
};

export const SignInButton = ({ className }: Props) => {
  return (
    <Button
      className={className}
      onClick={() =>
        void signIn("keycloak", { callbackUrl: process.env.NEXTAUTH_URL_ADMIN })
      }
    >
      Войти
    </Button>
  );
};

export const SignOutButton = ({
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
    <Button
      className={className}
      variant={variant}
      onClick={() =>
        void signOut({ callbackUrl: process.env.NEXTAUTH_URL_ADMIN })
      }
    >
      Выйти
    </Button>
  );
};

export const SignOutIcon = ({ className }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              "bg-accent text-foreground hover:bg-input hover:text-background rounded-full transition-all",
              className,
            )}
            onClick={() =>
              void signOut({ callbackUrl: process.env.NEXTAUTH_URL_ADMIN })
            }
          >
            <LogOut className="h-full w-full" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="bottom"
          className="bg-accent text-foreground font-OpenSans"
        >
          <p>Выйти</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
