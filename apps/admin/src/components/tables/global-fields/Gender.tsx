"use client";

import React from "react";

import { FormSelect } from "../inputs/FormSelect";
import getGenderName from "~/lib/utils/getGenderName";

export default function Gender({
  formValueName,
  defaultGender,
  className,
}: {
  formValueName: string;
  defaultGender: {
    id: string;
    displayName: string;
  } | null;
  className?: string;
}) {
  const itemsData = [
    { id: "male", displayName: getGenderName("male") },
    { id: "female", displayName: getGenderName("female") },
  ] as { id: string; displayName: string }[];

  return (
    <div className="h-full w-full">
      <FormSelect
        defaultValue={defaultGender}
        itemsData={itemsData}
        formValueName={formValueName}
        haveDelete={false}
        variant="nopadding"
        className={className}
      />
    </div>
  );
}
