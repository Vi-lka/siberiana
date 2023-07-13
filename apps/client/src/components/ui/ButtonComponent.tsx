import type { PropsWithChildren } from "react";
import React from "react";

import { Button } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

type ButtonComponentProps = {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null;
  size?: "default" | "sm" | "lg" | null;
  className?: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
};

export default function ButtonComponent(
  props: PropsWithChildren<ButtonComponentProps>,
) {
  return (
    <Button
      variant={props.variant}
      className={cn(
        "hover:bg-beaver hover:text-beaverLight dark:bg-accent dark:text-beaverLight dark:hover:text-darkBlue dark:hover:bg-beaverLight rounded-3xl",
        props.className,
      )}
      size={props.size}
      type={props.type}
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  );
}
