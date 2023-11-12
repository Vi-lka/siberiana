import React from "react";
import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@siberiana/ui";

import { SignInButton } from "../auth/NextAuthButtons";

export default function NoSession({ alert = false }: { alert?: boolean }) {
  return (
    <div className="font-Inter flex w-full flex-col items-center py-10">
      {alert ? (
        <Alert variant="destructive" className="w-fit">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-OpenSans">Доступ запрещен</AlertTitle>
          <AlertDescription>
            Нет прав доступа. / Срок действия сеанса истек.
          </AlertDescription>
        </Alert>
      ) : null}

      <SignInButton className="font-Inter mt-6 px-10 py-6 text-base font-normal uppercase" />
    </div>
  );
}
