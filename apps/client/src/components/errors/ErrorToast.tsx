"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Repeat } from "lucide-react";
import type { ZodIssue } from "zod";

import type { ErrorsDict } from "@siberiana/schemas";
import { ToastAction, useToast } from "@siberiana/ui";
import getShortDescription from "~/lib/utils/getShortDescription";

export default function ErrorToast({
  error,
  place,
  dict,
}: {
  error: string | ZodIssue[];
  place: string,
  dict: ErrorsDict;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const messageError = React.useMemo(
    function generateMessageError() {
      if (typeof error === "string") {
        return error;
      } else {
        const messageslist = error.map((issue) => {
          const message = issue.message;
          return message;
        });
        return messageslist.join("\n");
      }
    },
    [error],
  );

  React.useEffect(() => {
    toast({
      variant: "destructive",
      title: dict.title,
      description: <p>In {place}: {getShortDescription(messageError)}</p>,
      className: "font-Inter",
      action: (
        <ToastAction
          className="px-2 py-6 text-sm"
          altText={dict.tryAgain}
          onClick={() => router.refresh()}
        >
          <Repeat className="h-8 w-8" />
        </ToastAction>
      ),
    });
  }, [dict, messageError, place, router, toast]);

  return null
}
