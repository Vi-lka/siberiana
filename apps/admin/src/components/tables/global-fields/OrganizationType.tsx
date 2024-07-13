"use client";

import React from "react";

import { FormSelect } from "../inputs/FormSelect";
import getOrganiztionTypeName from "~/lib/utils/getOrganiztionTypeName";

export default function OrganizationType({
  formValueName,
  defaultType,
  className,
}: {
  formValueName: string;
  defaultType: {
    id: string;
    displayName: string;
  } | null;
  className?: string;
}) {
  const itemsData = [
    { id: "museum", displayName: getOrganiztionTypeName("museum") },
    { id: "archive", displayName: getOrganiztionTypeName("archive") },
    { id: "library", displayName: getOrganiztionTypeName("library") },
    { id: "other", displayName: getOrganiztionTypeName("other") },
  ] as { id: string; displayName: string }[];

  return (
    <div className="h-full w-full">
      <FormSelect
        defaultValue={defaultType}
        itemsData={itemsData}
        formValueName={formValueName}
        haveDelete={false}
        variant="nopadding"
        className={className}
      />
    </div>
  );
}
