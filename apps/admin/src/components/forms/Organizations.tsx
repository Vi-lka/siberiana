import React from "react";
import type { Row } from "@tanstack/react-table";

import type { OrganizationsForTable } from "@siberiana/schemas";

import FormTextArea from "~/components/tables/inputs/FormTextArea";
import OrganizationType from "../tables/global-fields/OrganizationType";
import { FormSelect } from "../tables/inputs/FormSelect";

export default function Organizations({ row }: { row: Row<OrganizationsForTable> }) {
    return (
        <div className="flex w-full flex-col gap-6 pt-3">
          <div className="flex w-full flex-wrap items-center gap-6">
            <p className="min-w-full break-words text-sm font-light sm:min-w-[20rem]">
              ID: {row.original.id}
            </p>
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Тип</p>
              <OrganizationType
                defaultType={row.original.type}
                formValueName={`organizations[${row.index}].type`}
                className="border-border w-full max-w-none rounded-md border-[1px]"
              />
            </div>
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Входит в Консорциум?</p>
              {/* TODO: Create toggle form field!!! */}
              <div className="h-full w-full">
                <FormSelect
                  defaultValue={row.original.isInAConsortium}
                  itemsData={[
                    { id: "yes", displayName: "Да" },
                    { id: "no", displayName: "Нет" },
                  ]}
                  formValueName={`organizations[${row.index}].isInAConsortium`}
                  haveDelete={false}
                  variant="nopadding"
                  className="border-border w-full max-w-none rounded-md border-[1px]"
                />
              </div>
              {/* TODO: Create toggle form field!!! */}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Название</p>
              <FormTextArea
                name={`organizations[${row.index}].displayName`}
                defaultValue={row.original.displayName}
                className="border-border w-full min-w-[15rem] max-w-none bg-transparent text-center text-base"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Личностей</p>
              <div className="text-center">{row.original.people}</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Адрес</p>
              <FormTextArea
                name={`organizations[${row.index}].address`}
                defaultValue={row.original.address}
                className="border-border w-full max-w-xl bg-transparent"
              />
            </div>
    
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Описание</p>
              <FormTextArea
                name={`organizations[${row.index}].description`}
                defaultValue={row.original.description}
                className="border-border w-full max-w-xl bg-transparent"
              />
            </div>
          </div>
    
          <div className="w-full">
            <p className="mb-2 text-center font-medium">Внешняя ссылка</p>
            <FormTextArea
              name={`organizations[${row.index}].externalLink`}
              defaultValue={row.original.externalLink}
              className="border-border w-full max-w-none bg-transparent text-center"
            />
          </div>
        </div>
    );
}