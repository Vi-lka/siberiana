"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SearchX, Undo2 } from "lucide-react";

import type { ErrorsDict } from "@siberiana/schemas";

import ButtonComponent from "../ui/ButtonComponent";

export default function NotFound({
  dict,
  children,
  goBack,
}: {
  dict: ErrorsDict;
  children?: React.ReactNode;
  goBack: boolean;
}) {
  const router = useRouter();

  return (
    <>
      {children}

      <div className="mx-auto my-10 flex flex-col items-center gap-10 text-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <SearchX size={36} />

          <h2 className="font-OpenSans text-3xl font-bold uppercase">
            {dict.notFound.title}
          </h2>

          <p className="font-Inter text-sm font-normal">
            {dict.notFound.description}
          </p>
        </div>

        {goBack ? (
          <ButtonComponent
            className="font-Inter w-full max-w-[240px] p-6 uppercase"
            onClick={() => router.back()}
          >
            {dict.notFound.goBack}
            <Undo2 className="ml-1" size={18} />
          </ButtonComponent>
        ) : null}
      </div>
    </>
  );
}
