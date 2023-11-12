"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SearchX, Undo2 } from "lucide-react";

import { Button } from "@siberiana/ui";

export default function NotFound({
  children,
  goBack,
}: {
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
            Не найдено
          </h2>

          <p className="font-Inter text-sm font-normal">
            Не удалось найти запрошенный ресурс
          </p>
        </div>

        {goBack ? (
          <Button
            className="font-Inter w-full max-w-[240px] p-6 uppercase"
            onClick={() => router.back()}
          >
            Назад
            <Undo2 className="ml-1" size={18} />
          </Button>
        ) : null}
      </div>
    </>
  );
}
