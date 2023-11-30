import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { RotateCcw } from "lucide-react";
import type { Accept } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import type { CustomFile } from "@siberiana/schemas";

import DropzoneFile from "./DropzoneFile";
import DropzoneImage from "./DropzoneImage";

type Value = {
  file?: CustomFile | null | undefined;
  url: string;
};

type InputDropzone = {
  formValueName: string;
  defaultValue: Value;
  className?: string;
} & (InputFile | InputImage);

type InputFile = {
  file: true;
  accept: Accept;
  maxSize: number;
};

type InputImage = {
  file: false;
};

export default function InputDropzone(props: InputDropzone) {
  const form = useFormContext();

  const value = form.getValues(props.formValueName) as Value;

  const handleReset = () => {
    form.setValue(props.formValueName, props.defaultValue, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  const customDirty = value.url !== props.defaultValue.url;

  return (
    <>
      <div className="relative">
        {props.file ? (
          <DropzoneFile
            formValueName={props.formValueName}
            accept={props.accept}
            maxSize={props.maxSize}
            className={props.className}
          />
        ) : (
          <DropzoneImage
            formValueName={props.formValueName}
            className={props.className}
          />
        )}
        {form.getFieldState(props.formValueName).isDirty || customDirty ? (
          <RotateCcw
            className="text-muted-foreground hover:text-foreground absolute right-1 top-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
            onClick={handleReset}
          />
        ) : null}
      </div>

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
