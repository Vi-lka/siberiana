"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Repeat } from "lucide-react";
import type { ZodIssue } from "zod";
import { ToastAction, useToast } from "@siberiana/ui";
import getShortDescription from "~/lib/utils/getShortDescription";

export default function ErrorToast({
  error,
  place,
}: {
  error: string | ZodIssue[];
  place: string,
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
      title: "Error",
      description: <p>In {place}: {getShortDescription(messageError)}</p>,
      className: "font-Inter",
      action: (
        <ToastAction
          className="px-2 py-6 text-sm"
          altText={"Попробовать снова"}
          onClick={() => router.refresh()}
        >
          <Repeat className="h-8 w-8" />
        </ToastAction>
      ),
    });
  }, [messageError, place, router, toast]);

  return null
}
