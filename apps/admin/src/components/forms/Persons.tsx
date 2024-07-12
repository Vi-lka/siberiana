import React from "react";
import type { Row } from "@tanstack/react-table";

import type { PersonsForTable } from "@siberiana/schemas";

import FormTextArea from "~/components/tables/inputs/FormTextArea";
import FormInput from "../tables/inputs/FormInput";
import Gender from "../tables/global-fields/Gender";

export default function Persons({ row }: { row: Row<PersonsForTable> }) {
    return (
        <div className="flex w-full flex-col gap-6 pt-3">
          <div className="flex w-full flex-wrap items-center gap-6">
            <p className="min-w-full break-words text-sm font-light sm:min-w-[20rem]">
              ID: {row.original.id}
            </p>
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
             <Gender
               defaultGender={row.original.gender}
               formValueName={`persons[${row.index}].gender`}
               className="border-border w-full max-w-none rounded-md border-[1px]"
             />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">ФИО</p>
              <FormTextArea
                name={`persons[${row.index}].displayName`}
                defaultValue={row.original.displayName}
                className="border-border w-full min-w-[15rem] max-w-none bg-transparent text-center text-base"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <div className="min-w-full flex-1 sm:min-w-[15rem]">
              <p className="mb-2 text-center font-medium">Имя</p>
              <FormInput
                name={`persons[${row.index}].givenName`}
                defaultValue={row.original.givenName}
                className="border-border w-full max-w-lg bg-transparent text-center"
                placeholder="__"
              />
            </div>
          
            <div className="min-w-full flex-1 sm:min-w-[15rem]">
              <p className="mb-2 text-center font-medium">Фамилия</p>
              <FormInput
                name={`persons[${row.index}].familyName`}
                defaultValue={row.original.familyName}
                className="border-border w-full max-w-lg bg-transparent text-center"
                placeholder="__"
              />
            </div>
          
            <div className="min-w-full flex-1 sm:min-w-[15rem]">
              <p className="mb-2 text-center font-medium">Отчество</p>
              <FormInput
                name={`persons[${row.index}].patronymicName`}
                defaultValue={row.original.patronymicName}
                className="border-border w-full max-w-lg bg-transparent text-center"
                placeholder="__"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">    
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Должность</p>
              <FormTextArea
                name={`persons[${row.index}].occupation`}
                defaultValue={row.original.occupation}
                className="border-border w-full max-w-xl bg-transparent"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
          <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Адрес</p>
              <FormTextArea
                name={`persons[${row.index}].address`}
                defaultValue={row.original.address}
                className="border-border w-full max-w-xl bg-transparent"
              />
            </div>
    
            <div className="min-w-full flex-1 sm:min-w-[20rem]">
              <p className="mb-2 text-center font-medium">Описание</p>
              <FormTextArea
                name={`persons[${row.index}].description`}
                defaultValue={row.original.description}
                className="border-border w-full max-w-xl bg-transparent"
              />
            </div>
          </div>
    
          <div className="w-full">
            <p className="mb-2 text-center font-medium">Внешняя ссылка</p>
            <FormTextArea
              name={`persons[${row.index}].externalLink`}
              defaultValue={row.original.externalLink}
              className="border-border w-full max-w-none bg-transparent text-center"
            />
          </div>
        </div>
    );
}