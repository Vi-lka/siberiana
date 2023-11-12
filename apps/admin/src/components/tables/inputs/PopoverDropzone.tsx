import React from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

import { Popover, PopoverContent, PopoverTrigger } from "@siberiana/ui";

import Dropzone from "./Dropzone";

export default function PopoverDropzone({
  formValueName,
  bucket,
  className,
}: {
  formValueName: string;
  bucket?: string;
  className?: string;
}) {
  const form = useFormContext();

  const image = form.getValues(formValueName) as string | undefined;

  return (
    <Popover>
      <PopoverTrigger className="overflow-hidden rounded-[6px]">
        <Image
          src={image ? image : "/images/image-placeholder.png"}
          alt={image ? image : "/images/image-placeholder.png"}
          width={80}
          height={80}
        />
      </PopoverTrigger>
      <PopoverContent className="font-Inter">
        <div className="mb-6">
          <p className="mb-2 font-medium">Фото</p>
          <Dropzone
            formValueName={formValueName}
            defaultValue={image}
            bucket={bucket}
            className={className}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
