import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

import type { CustomFile, ImageFile } from "@siberiana/schemas";

import DropzoneImage from "./DropzoneImage";
import DropzoneFile from "./DropzoneFile";

export default function InputDropzone({
  formValueName,
  file,
  className,
}: {
  formValueName: string;
  file?: boolean,
  className?: string;
}) {
  const form = useFormContext();

  const value = file 
    ? form.getValues(formValueName) as {
        file: CustomFile | null | undefined;
        url: string;
      }
    : form.getValues(formValueName) as {
        file: ImageFile | null | undefined;
        url: string;
      }  

  return (
    <>
      {file 
        ? (
          <DropzoneFile
            formValueName={formValueName}
            defaultValue={value}
            className={className}
          />
        )
        : (
          <DropzoneImage
            formValueName={formValueName}
            defaultValue={value}
            className={className}
          />
        )
      }

      <ErrorMessage
        errors={form.formState.errors}
        name={formValueName}
        render={({ message }) => (
          <p className="text-destructive text-sm font-medium">{message}</p>
        )}
      />
    </>
  );
}
