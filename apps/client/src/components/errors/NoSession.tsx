import React from "react";
import { AlertCircle } from "lucide-react";

import { Dictionary } from "@siberiana/schemas";
import { Alert, AlertDescription, AlertTitle } from "@siberiana/ui";

import { getDictionary } from "~/lib/utils/getDictionary";
import { SignInButton } from "../auth/NextAuthButtons";

export default async function NoSession() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  return (
    <div className="flex w-full flex-col items-center py-10">
      <Alert variant="destructive" className="w-fit">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>{dictResult.errors.sessionTitle}</AlertTitle>
        <AlertDescription>
          {dictResult.errors.sessionDescription}
        </AlertDescription>
      </Alert>

      <SignInButton
        className="font-Inter mt-6 px-10 py-6 text-base font-normal uppercase"
        dict={dictResult.auth}
      />
    </div>
  );
}
