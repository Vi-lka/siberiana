import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

import type { CustomFile } from "@siberiana/schemas";

import DropzoneImage from "./DropzoneImage";
import DropzoneFile from "./DropzoneFile";
import type { Accept } from "react-dropzone";

type InputDropzone = {
  formValueName: string;
  className?: string;
} & (InputFile | InputImage)

type InputFile = {
  file: true,
  accept: Accept;
  maxSize: number;
}

type InputImage = {
  file: false,
}

export default function InputDropzone(props: InputDropzone) {
  const form = useFormContext();

  const value = form.getValues(props.formValueName) as {
    file: CustomFile | null | undefined;
    url: string;
  }
  
  return (
    <>
      {props.file 
        ? (
          <DropzoneFile
            formValueName={props.formValueName}
            defaultValue={value}
            accept={props.accept}
            maxSize={props.maxSize}
            className={props.className}
          />
        )
        : (
          <DropzoneImage
            formValueName={props.formValueName}
            defaultValue={value}
            className={props.className}
          />
        )
      }

      <ErrorMessage
        errors={form.formState.errors}
        name={props.formValueName}
        render={({ message }) => (
          <p className="text-destructive text-sm font-medium">{message}</p>
        )}
      />
    </>
  );
}
