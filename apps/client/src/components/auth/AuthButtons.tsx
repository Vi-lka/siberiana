import React from "react";

import type { AuthDictType } from "@siberiana/schemas";
import { cn } from "@siberiana/ui/src/lib/utils";

import GoogleSvg from "../GoogleSvg";
import ButtonComponent from "../ui/ButtonComponent";

export default function AuthButtons({
  text,
  className,
}: {
  text: AuthDictType;
  className?: string;
}) {
  return (
    <div
      className={cn("flex w-full flex-col justify-between gap-6", className)}
    >
      <ButtonComponent
        className="auth-button px-4 py-6 uppercase sm:px-10"
        onClick={() => console.log("Sign In with Google")}
      >
        <GoogleSvg className="mr-2 h-5 w-5" />
        {text.authButtons.google}
      </ButtonComponent>
    </div>
  );
}
