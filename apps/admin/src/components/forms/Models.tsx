import React from "react";
import type { Row } from "@tanstack/react-table";
import Image from "next/image";

import type { ModelForTable } from "@siberiana/schemas";

import FormTextArea from "~/components/tables/inputs/FormTextArea";
import Status from "../tables/global-fields/Status";
import { useSession } from "next-auth/react";

export default function Models({ row }: { row: Row<ModelForTable> }) {
  const session = useSession();
  const isModerator = session.data?.user.roles?.includes("moderator");

  const artifactsArray = row.original.artifacts;
  const petroglyphsArray = row.original.petroglyphs;

  return (
    <div className="flex w-full flex-col gap-6 pt-3">
      <div className="flex w-full flex-wrap items-center gap-6">
        <p className="min-w-full break-words text-sm font-light sm:min-w-[20rem]">
          ID: {row.original.id}
        </p>
        {isModerator ? (
          <div className="min-w-full flex-1 sm:min-w-[20rem]">
            <Status
              defaultStatus={row.original.status}
              formValueName={`models[${row.index}].status`}
              className="border-border w-full max-w-none rounded-md border-[1px]"
            />
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Название</p>
          <FormTextArea
            name={`models[${row.index}].displayName`}
            defaultValue={row.original.displayName}
            className="border-border w-full min-w-[15rem] max-w-xl bg-transparent text-center text-base"
          />
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Описание</p>
          <FormTextArea
            name={`models[${row.index}].description`}
            defaultValue={row.original.description}
            className="border-border w-full max-w-xl bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Артефакты</p>
          <div className="flex flex-col items-center gap-4">
              {artifactsArray.map((item, i) => {
                const imageURL =
                  item.primaryImageURL.length > 0
                    ? item.primaryImageURL
                    : "/images/image-placeholder.png";
                return (
                  <div key={i} className="flex items-center gap-1">
                    <Image
                      src={imageURL}
                      alt={item.displayName}
                      width={60}
                      height={60}
                    />
                    <div>
                      <p className="mb-1 text-[10px]">id: {item.id}</p>
                      <p>{item.displayName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>

        <div className="min-w-full flex-1 sm:min-w-[20rem]">
          <p className="mb-2 text-center font-medium">Петроглифы</p>
          <div className="flex flex-col items-center gap-4">
              {petroglyphsArray.map((item, i) => {
                const imageURL =
                  item.primaryImageURL.length > 0
                    ? item.primaryImageURL
                    : "/images/image-placeholder.png";
                return (
                  <div key={i} className="flex items-center gap-1">
                    <Image
                      src={imageURL}
                      alt={item.displayName}
                      width={60}
                      height={60}
                    />
                    <div>
                      <p className="mb-1 text-[10px]">id: {item.id}</p>
                      <p>{item.displayName}</p>
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-center font-medium">Внешняя ссылка</p>
          <FormTextArea
            name={`models[${row.index}].externalLink`}
            defaultValue={row.original.externalLink}
            className="border-border w-full max-w-none bg-transparent text-center"
          />
      </div>
    </div>
  );
}
