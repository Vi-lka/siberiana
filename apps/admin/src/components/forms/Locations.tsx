import React from "react";
import type { Row } from "@tanstack/react-table";

import type { LocationsForTable } from "@siberiana/schemas";

import FormTextArea from "~/components/tables/inputs/FormTextArea";
import Country from "../tables/global-fields/Country";
import Region from "../tables/global-fields/Region";
import District from "../tables/global-fields/District";
import Settlement from "../tables/global-fields/Settlement";

export default function Locations({ row }: { row: Row<LocationsForTable> }) {
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
                name={`locations[${row.index}].displayName`}
                defaultValue={row.original.displayName}
                className="border-border w-full min-w-[15rem] max-w-xl bg-transparent text-center text-base"
              />
            </div>
    
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Описание</p>
              <FormTextArea
                name={`locations[${row.index}].description`}
                defaultValue={row.original.description}
                className="border-border w-full max-w-xl bg-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="min-w-full flex-1 sm:min-w-[15rem]">
              <p className="mb-2 text-center font-medium">Страна</p>
              <Country
                formValueName={`locations[${row.index}].country`}
                defaultCountry={row.original.country}
                className="border-border w-full max-w-md rounded-md border-[1px]"
              />
            </div>
        
            <div className="min-w-full flex-1 sm:min-w-[15rem]">
              <p className="mb-2 text-center font-medium">Регион</p>
              <Region
                formValueName={`locations[${row.index}].region`}
                defaultRegion={row.original.region}
                className="border-border w-full max-w-md rounded-md border-[1px]"
              />
            </div>
        
            <div className="min-w-full flex-1 sm:min-w-[15rem]">
              <p className="mb-2 text-center font-medium">Район</p>
              <District
                formValueName={`locations[${row.index}].district`}
                defaultDistrict={row.original.district}
                className="border-border w-full max-w-md rounded-md border-[1px]"
              />
            </div>
        
            <div className="min-w-full flex-1 sm:min-w-[15rem]">
              <p className="mb-2 text-center font-medium">Населенный пункт</p>
              <Settlement
                formValueName={`locations[${row.index}].settlement`}
                defaultSettlement={row.original.settlement}
                className="border-border w-full max-w-md rounded-md border-[1px]"
              />
            </div>
          </div>
    
          <div className="flex flex-wrap items-center gap-6">
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Артефактов</p>
              <div className="text-center">{row.original.artifacts}</div>
            </div>

            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Книг</p>
              <div className="text-center">{row.original.books}</div>
            </div>
          </div>
    
          <div className="w-full">
            <p className="mb-2 text-center font-medium">Внешняя ссылка</p>
            <FormTextArea
              name={`locations[${row.index}].externalLink`}
              defaultValue={row.original.externalLink}
              className="border-border w-full max-w-none bg-transparent text-center"
            />
          </div>
        </div>
    );
}