"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import type { z } from "zod";

import { CollectionForm } from "@siberiana/schemas";
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Form,
  ScrollArea,
  Separator,
  useToast,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import Categories from "~/components/tables/global-fields/Categories";
import FormInput from "~/components/tables/inputs/FormInput";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import { usePutObjects } from "~/lib/auth/siberiana";
import { createCollection } from "~/lib/mutations/collections";
import getShortDescription from "~/lib/utils/getShortDescription";
import TypeSelect from "./TypeSelect";
import InputDropzone from "~/components/tables/inputs/dropzone/InputDropzone";
import LoadingMutation from "~/components/LoadingMutation";

const DEFAULT_VALUES = {
  id: "",
  slug: "",
  displayName: "",
  abbreviation: "",
  primaryImage: {
    file: undefined,
    url: "",
  },
  description: "",
  createdBy: "",
  createdAt: new Date(),
  updatedBy: "",
  updatedAt: new Date(),
} as CollectionForm;

export default function AddCollection({ className }: { className?: string }) {
  const [loading, setLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();

  const form = useForm<z.infer<typeof CollectionForm>>({
    resolver: zodResolver(CollectionForm),
    mode: "onChange",
    defaultValues: DEFAULT_VALUES,
  });

  const requestHeaders = {
    Authorization: `Bearer ${session.data?.access_token}`,
    "Content-Type": "application/json",
  };

  const { upload, progress, isLoading } = usePutObjects()

  const mutation = useMutation({
    mutationKey: ["createCollection", requestHeaders],
    mutationFn: async (values: CollectionForm) => {
      const resUpload = values.primaryImage.file
        ? await upload({ files: [values.primaryImage.file] })
            .then((res) => res.data)
            .catch((err) => {
              console.error(err);
              return null;
            })
        : null;

      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        createCollection(),
        {
          input: {
            displayName: values.displayName,
            description: values.description,
            abbreviation: values.abbreviation,
            categoryID: values.category.id,
            primaryImageURL: resUpload !== null ? resUpload.urls[0] : "",
            slug: values.slug,
            type: values.type,
          },
        },
        requestHeaders,
      );
    },
    onMutate: () => setLoading(true),
    onError: (err) => {
      setLoading(false);
      setOpenDialog(false);
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: <p>{getShortDescription(err.message)}</p>,
        className: "font-Inter",
      });
      console.log(err);
    },
    onSuccess: () => {
      setLoading(false);
      setOpenDialog(false);
      toast({
        title: "Успешно!",
        description: "Коллекция создана",
        className:
          "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
      });
      router.refresh();
    },
  });

  function handleSave(dataForm: z.infer<typeof CollectionForm>) {
    const {
      description,
      ...rest // assigns remaining
    } = dataForm;
    const descriptionNoLines = description.replace(/\n/g, " ");
    const result = {
      description: descriptionNoLines,
      ...rest,
    };

    mutation.mutate(result);
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          disabled={loading}
          className={cn("flex items-center gap-1", className)}
        >
          <Plus /> Создать
        </Button>
      </DialogTrigger>
      <DialogContent className="font-Inter">
        <DialogHeader>
          <DialogTitle>Создать</DialogTitle>
          <DialogDescription>Коллекцию</DialogDescription>
        </DialogHeader>
        {loading 
          ? <LoadingMutation isLoading={isLoading} progress={progress} />  
          : (
          <Form {...form}>
            <form
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onSubmit={form.handleSubmit(handleSave)}
            >
              <Button
                disabled={!(form.formState.isDirty && form.formState.isValid)}
                type="submit"
                className="mb-2 h-fit w-full p-2 text-xs uppercase"
              >
                Создать
              </Button>
              <Separator />
              <ScrollArea
                className="pt-3"
                classNameViewport="lg:max-h-[70vh] max-h-[60vh] md:px-4 px-2"
              >
                <div className="mb-6">
                  <p className="mb-2 font-medium">Название</p>
                  <FormInput
                    name="displayName"
                    className="border-border w-full max-w-lg text-base"
                    defaultValue={DEFAULT_VALUES.displayName}
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">
                    Slug <span className="text-sm font-light">(URL имя)</span>
                  </p>
                  <FormInput
                    name="slug"
                    className="border-border w-full max-w-lg text-sm"
                    defaultValue={DEFAULT_VALUES.slug}
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">
                    Тип{" "}
                    <span className="text-sm font-light">
                      (нельзя изменить после создания)
                    </span>
                  </p>
                  <TypeSelect className="w-full max-w-lg rounded-md border text-base" />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">Категория</p>
                  <Categories
                    defaultCategory={form.getValues("category")}
                    formValueName={`category`}
                    className="w-full max-w-lg rounded-md border text-base"
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">Фото</p>
                  <InputDropzone formValueName="primaryImage" file={false} />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">Аббревиатура</p>
                  <FormInput
                    name="abbreviation"
                    className="border-border w-full max-w-lg text-base"
                    defaultValue={DEFAULT_VALUES.abbreviation}
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">Описание</p>
                  <FormTextArea
                    name="description"
                    className="border-border w-full max-w-lg text-sm"
                    defaultValue={DEFAULT_VALUES.description}
                  />
                </div>
              </ScrollArea>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
