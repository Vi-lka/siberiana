import React from "react";
import Image from "next/image";
import { ErrorMessage } from "@hookform/error-message";
import { useFormContext } from "react-hook-form";

import type { ImageFile } from "@siberiana/schemas";
import { Popover, PopoverContent, PopoverTrigger } from "@siberiana/ui";

import DropzoneImage from "./DropzoneImage";

export default function PopoverDropzone({
  formValueName,
  className,
}: {
  formValueName: string;
  className?: string;
}) {
  const form = useFormContext();

  const image = form.getValues(formValueName) as {
    file: ImageFile | null | undefined;
    url: string;
  };

  const imageURL =
    image.url.length > 0
      ? image.url
      : image.file
      ? URL.createObjectURL(image.file)
      : "/images/image-placeholder.png";

  const imageAlt =
    image.url.length > 0 ? image.url : image.file ? image.file.name : "No File";

  return (
    <>
      <Popover>
        <PopoverTrigger className="overflow-hidden rounded-[6px]">
          <Image src={imageURL} alt={imageAlt} width={80} height={80} />
        </PopoverTrigger>
        <PopoverContent className="font-Inter">
          <div className="mb-6">
            <p className="mb-2 font-medium">Фото</p>
            <DropzoneImage
              formValueName={formValueName}
              defaultValue={image}
              className={className}
            />
          </div>
        </PopoverContent>
      </Popover>
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
