import React from "react";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { CustomFile } from "@siberiana/schemas";
import { ScrollArea } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

export default function MultiFilesCell({
  name,
  defaultValues,
  file,
  className,
}: {
  name: string;
  defaultValues:
    | {
        file?: CustomFile | null | undefined;
        url: string;
      }[]
    | null;
  file?: boolean;
  className?: string;
}) {
  const form = useFormContext();

  const values = form.getValues(name) as
    | {
        file: CustomFile | null | undefined;
        url: string;
      }[]
    | null;

  if (!values || values.length === 0) return <p className="text-center">__</p>;

  const gridColumns = values.length < 3 ? values.length : 3;

  if (file) {
    return (
      <div
        className={cn(
          "border-border relative cursor-pointer rounded-md border border-solid p-1",
          className,
          form.getFieldState(name).invalid
            ? "border-red-500"
            : form.getFieldState(name).isDirty
            ? "border-green-400"
            : "",
        )}
      >
        <div
          className="mx-auto grid w-max max-w-[18rem] gap-1"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          }}
        >
          {values.map((value, index) => (
            <div
              key={index}
              className="border-muted bg-background overflow-hidden rounded-md border-[1px] p-1"
            >
              <p className="mt-3 break-words text-center text-xs font-light">
                {!!value.file ? value.file.name : value.url}
              </p>
            </div>
          ))}
        </div>
        {form.getFieldState(name).isDirty ? (
          <RotateCcw
            className="text-muted-foreground hover:text-foreground absolute right-1 top-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              form.setValue(name, defaultValues, {
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
    <div
      className={cn(
        "border-border relative cursor-pointer rounded-md border border-solid p-1",
        className,
        form.getFieldState(name).invalid
          ? "border-red-500"
          : form.getFieldState(name).isDirty
          ? "border-green-400"
          : "",
      )}
    >
      <ScrollArea
        className={values.length > 3 ? "pr-3" : ""}
        classNameViewport="max-h-40"
        type={values.length > 3 ? "always" : "scroll"}
      >
        <div
          className="mx-auto grid w-max max-w-[18rem] gap-1"
          style={{
            gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`,
          }}
        >
          {values.map((value, index) => (
            <figure
              key={index}
              className="border-border bg-muted cursor-pointer rounded-md border border-solid px-1 py-1"
            >
              <Image
                src={
                  value.url.length > 0
                    ? value.url
                    : "/images/image-placeholder.png"
                }
                width={100}
                height={100}
                alt={!!value.file ? value.file.name : value.url}
                className="mx-auto rounded-sm object-cover"
              />
              <figcaption className="mt-3 break-words text-center text-xs font-light">
                {!!value.file ? value.file.name : value.url}
              </figcaption>
            </figure>
          ))}
        </div>
      </ScrollArea>
      {form.getFieldState(name).isDirty ? (
        <RotateCcw
          className="text-muted-foreground hover:text-foreground absolute right-1 top-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            form.setValue(name, defaultValues, {
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
