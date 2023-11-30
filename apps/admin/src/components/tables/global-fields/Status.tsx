"use client";

import React from "react";

import getStatusName from "~/lib/utils/getStatusName";
import { FormSelect } from "../inputs/FormSelect";

export default function Status({
  formValueName,
  defaultStatus,
  className,
}: {
  formValueName: string;
  defaultStatus: {
    id: string;
    displayName: string;
  } | null;
  className?: string;
}) {
  const itemsData = [
    { id: "listed", displayName: getStatusName("listed") },
    { id: "unlisted", displayName: getStatusName("unlisted") },
    { id: "draft", displayName: getStatusName("draft") },
  ] as { id: string; displayName: string }[];

  return (
    <div className="h-full w-full">
      <FormSelect
        defaultValue={defaultStatus}
        itemsData={itemsData}
        formValueName={formValueName}
        haveDelete={false}
        variant="nopadding"
        className={className}
      />
    </div>
  );
}
