import React from "react";
import type { Row } from "@tanstack/react-table";

import type { ArtifactForTable } from "@siberiana/schemas";

import FormInput from "~/components/tables/inputs/FormInput";

export default function Artifacts({ row }: { row: Row<ArtifactForTable> }) {
  return (
    <div className="flex w-full flex-col gap-6">
      <p className="break-words font-light">ID: {row.original.id}</p>

      <div>
        <p className="mb-2 font-medium">Инвентарный номер</p>
        <FormInput
          name={`artifacts[${row.index}].inventoryNumber`}
          defaultValue={row.original.inventoryNumber}
          className="border-border w-full max-w-lg bg-transparent text-center"
          placeholder="__"
        />
      </div>
    </div>
  );
}
