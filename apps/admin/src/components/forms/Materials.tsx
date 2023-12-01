import React from "react";
import type { Row } from "@tanstack/react-table";

import type { MaterialForTable } from "@siberiana/schemas";

import FormTextArea from "~/components/tables/inputs/FormTextArea";

export default function Materials({ row }: { row: Row<MaterialForTable> }) {
  return (
    <div className="flex w-full flex-col gap-6 pt-3">
      <div className="flex w-full flex-wrap items-center gap-6">
        <p className="min-w-full break-words text-sm font-light sm:min-w-[20rem]">
          ID: {row.original.id}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Название</p>
          <FormTextArea
            name={`materials[${row.index}].displayName`}
            defaultValue={row.original.displayName}
            className="border-border w-full min-w-[15rem] max-w-xl bg-transparent text-center text-base"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Описание</p>
          <FormTextArea
            name={`materials[${row.index}].description`}
            defaultValue={row.original.description}
            className="border-border w-full max-w-xl bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Артефактов</p>
          <div className="text-center">{row.original.artifacts}</div>
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Внешняя ссылка</p>
          <FormTextArea
            name={`materials[${row.index}].externalLink`}
            defaultValue={row.original.externalLink}
            className="border-border w-full max-w-none bg-transparent text-center"
          />
        </div>
      </div>
    </div>
  );
}
