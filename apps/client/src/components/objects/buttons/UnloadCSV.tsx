"use client";

import React from "react";
import { ArrowDownCircle } from "lucide-react";

import ButtonComponent from "../../ui/ButtonComponent";

export default function UnloadCSV({ session }: { session: boolean }) {
  return (
    <ButtonComponent
      disabled
      className="px-4"
      onClick={() => console.log(session)}
    >
      <p className="flex items-center gap-1">
        <span className="hidden lg:block">Выгрузить в</span> CSV{" "}
        <ArrowDownCircle className="h-5 w-5" />
      </p>
    </ButtonComponent>
  );
}
