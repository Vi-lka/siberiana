import React from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { CustomFile } from "@siberiana/schemas";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function FileCell({
  name,
  defaultValue,
  file,
  className,
}: {
  name: string;
  defaultValue: {
    file?: CustomFile | null | undefined;
    url: string;
  };
  file?: boolean;
  className?: string;
}) {
  const form = useFormContext();

  const value = form.getValues(name) as {
    file: CustomFile | null | undefined;
    url: string;
  };

  if (file) {
    return (
      <div
        className={cn(
          "border-muted bg-background relative overflow-hidden rounded-md border-[1px] p-1",
          className,
          form.getFieldState(name).invalid
            ? "border-red-500"
            : form.getFieldState(name).isDirty
              ? "border-green-400"
              : "",
        )}
      >
        <p className="mt-3 break-words text-center text-xs font-light">
          {!!value.file ? value.file.name : value.url}
        </p>
        {form.getFieldState(name).isDirty ? (
          <RotateCcw
            className="text-muted-foreground hover:text-foreground absolute right-1 top-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              form.setValue(name, defaultValue, {
                shouldDirty: true,
                shouldValidate: true,
                shouldTouch: true,
              });
            }}
          />
        ) : null}
      </div>
    );
  }

  return (
    <figure
      className={cn(
        "border-border bg-muted relative cursor-pointer rounded-md border border-solid px-1 py-1",
        className,
        form.getFieldState(name).invalid
          ? "border-red-500"
          : form.getFieldState(name).isDirty
            ? "border-green-400"
            : "",
      )}
    >
      <Image
        src={value.url.length > 0 ? value.url : "/images/image-placeholder.png"}
        width={100}
        height={100}
        alt={!!value.file ? value.file.name : value.url}
        className="mx-auto rounded-sm object-cover"
      />
      <figcaption className="mt-3 break-words text-center text-xs font-light">
        {!!value.file ? value.file.name : value.url}
      </figcaption>
      {form.getFieldState(name).isDirty ? (
        <RotateCcw
          className="text-muted-foreground hover:text-foreground absolute right-1 top-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.setValue(name, defaultValue, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
          }}
        />
      ) : null}
    </figure>
  );
}
