"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { MousePointerClick, UploadCloud, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import type { CustomFile } from "@siberiana/schemas";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function DropzoneImage({
  defaultValue,
  formValueName,
  className,
}: {
  formValueName: string;
  defaultValue: {
    file: CustomFile | null | undefined;
    url: string;
  };
  className?: string;
}) {
  const [imageFile, setFile] = useState<CustomFile>();
  const [imageURL, setURL] = useState<string>();

  const form = useFormContext();

  useEffect(() => {
    if (!!defaultValue.file) {
      setFile(defaultValue.file);
      setURL(URL.createObjectURL(defaultValue.file));
    } else if (defaultValue.url.length > 0) {
      setURL(defaultValue.url);
    }
  }, [defaultValue]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFileUrl = URL.createObjectURL(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
      setURL(newFileUrl);
      form.setValue(
        formValueName,
        { file: acceptedFiles[0], url: newFileUrl },
        { shouldDirty: true, shouldValidate: true, shouldTouch: true },
      );
    },
    [form, formValueName],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    maxSize: 1024 * 1024 * 100, // 100Mb
    multiple: false,
  });

  const handleDelete = () => {
    setFile(undefined);
    setURL(undefined);
    form.setValue(
      formValueName,
      { file: undefined, url: "" },
      { shouldDirty: true, shouldValidate: true, shouldTouch: true },
    );
  };

  if (!!imageURL && imageURL.length > 0)
    return (
      <>
        <span
          className="text-muted-foreground hover:text-foreground my-1 flex cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
          onClick={handleDelete}
        >
          <X className="h-5 w-5" /> Удалить
        </span>
        <div
          {...getRootProps({
            className: cn(
              "lg:px-12 px-0 lg:py-10 py-2 border border-solid border-border rounded-md cursor-pointer bg-muted",
              className,
              form.getFieldState(formValueName).invalid
                ? "border-red-500"
                : form.getFieldState(formValueName).isDirty
                ? "border-green-400"
                : "",
            ),
          })}
        >
          <input {...getInputProps()} />
          <Image
            src={imageURL}
            width={180}
            height={180}
            alt={!!imageFile ? imageFile.name : imageURL}
            className="mx-auto object-cover"
          />
          <p className="mt-3 break-words text-center text-xs font-light">
            {!!imageFile ? imageFile.name : imageURL}
          </p>
        </div>
      </>
    );
  else
    return (
      <div
        {...getRootProps({
          className: cn(
            "p-12 border border-solid border-border rounded-md cursor-pointer bg-muted",
            className,
            form.getFieldState(formValueName).invalid
              ? "border-red-500"
              : form.getFieldState(formValueName).isDirty
              ? "border-green-400"
              : "",
          ),
        })}
      >
        <input {...getInputProps()} />
        <UploadCloud className="text-muted-foreground mx-auto" />
        {isDragActive ? (
          <p className="text-muted-foreground text-center text-xs">
            Drop the files here ...
          </p>
        ) : (
          <p className="text-muted-foreground text-center text-xs">
            <span className="underline-offset-3 underline">Drag & drop</span> or{" "}
            <span className="underline underline-offset-2">
              <MousePointerClick className="inline h-3 w-3" />
              Click
            </span>
          </p>
        )}
      </div>
    );
}
