"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AlertOctagon, MousePointerClick, UploadCloud } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

import { Progress, useToast } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import { usePutObjects } from "~/lib/auth/siberiana";
import getShortDescription from "~/lib/utils/getShortDescription";

export default function Dropzone({
  defaultValue,
  formValueName,
  bucket,
  className,
}: {
  formValueName: string;
  defaultValue?: string;
  bucket?: string;
  className?: string;
}) {
  const [file, setFile] = useState<string>();
  const [error, setError] = useState(false);

  const { toast } = useToast();

  const { upload, progress, isLoading } = usePutObjects();

  const form = useFormContext();

  useEffect(() => {
    if (!!defaultValue) setFile(defaultValue);
  }, [defaultValue]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const newFileUrl = URL.createObjectURL(acceptedFiles[0]);
      setFile(newFileUrl);
      handleSubmit(acceptedFiles)
        .then((res) => {
          res.urls.forEach((url) => {
            handleAddToForm(url);
          });
          toast({
            title: "Успешно!",
            description: <p>Фотография загружена</p>,
            className: "font-Inter",
          });
          console.log(form.getValues());
        })
        .catch((err) => {
          setError(true);
          toast({
            variant: "destructive",
            title: "Error",
            description: <p>{getShortDescription(err as string)}</p>,
            className: "font-Inter",
          });
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [toast],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxSize: 1024 * 1024 * 1024, // 1Gb
    multiple: false,
  });

  const handleSubmit = async (files: File[]) => {
    const res = await upload({ bucket, files }).then((res) => res.data);
    return res;
  };

  const handleAddToForm = (newValue: string) => {
    form.setValue(formValueName, newValue, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
  };

  if (error)
    return (
      <div
        {...getRootProps({
          className: cn(
            "p-12 border border-solid border-border rounded-md cursor-pointer bg-muted",
            className,
          ),
        })}
      >
        <input {...getInputProps()} />
        <AlertOctagon className="mx-auto text-red-500" />
        <p className="text-center text-xs text-red-500">Ошибка!</p>
        <p className="text-muted-foreground text-center text-xs">
          Что-то пошло не так
        </p>
      </div>
    );

  if (!!!file)
    return (
      <div
        {...getRootProps({
          className: cn(
            "p-12 border border-solid border-border rounded-md cursor-pointer bg-muted",
            className,
          ),
        })}
      >
        {isLoading && progress < 100 ? (
          <Progress value={progress} className="w-full" />
        ) : (
          <>
            <input {...getInputProps()} />
            <UploadCloud className="text-muted-foreground mx-auto" />
            {isDragActive ? (
              <p className="text-muted-foreground text-center text-xs">
                Drop the files here ...
              </p>
            ) : (
              <p className="text-muted-foreground text-center text-xs">
                <span className="underline-offset-3 underline">
                  Drag & drop
                </span>{" "}
                or{" "}
                <span className="underline underline-offset-2">
                  <MousePointerClick className="inline h-3 w-3" />
                  Click
                </span>
              </p>
            )}
          </>
        )}
      </div>
    );

  return (
    <div
      className={cn(
        "border-border bg-muted rounded-md border border-solid px-0 py-2 lg:px-12 lg:py-10",
        className,
      )}
    >
      {isLoading && progress < 100 ? (
        <Progress value={progress} className="w-full" />
      ) : (
        <>
          <Image
            src={file}
            width={180}
            height={180}
            alt={file}
            className="mx-auto object-cover"
          />
          <p className="mt-3 break-words text-center text-xs font-light">
            {file}
          </p>
        </>
      )}
    </div>
  );
}
