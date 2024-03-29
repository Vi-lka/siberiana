"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";
import { ChevronRight } from "lucide-react";
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

import LoadingMutation from "~/components/LoadingMutation";
import Categories from "~/components/tables/global-fields/Categories";
import InputDropzone from "~/components/tables/inputs/dropzone/InputDropzone";
import FormInput from "~/components/tables/inputs/FormInput";
import FormTextArea from "~/components/tables/inputs/FormTextArea";
import { usePutObjects } from "~/lib/auth/siberiana";
import { updateCollection } from "~/lib/mutations/collections";
import getShortDescription from "~/lib/utils/getShortDescription";
import ImageComp from "../ImageComp";
import MetaData from "../MetaData";
import DeleteCollection from "./DeleteCollection";
import { getName } from "./TypeSelect";

export default function UpdateCollection(props: CollectionForm) {
  const [loading, setLoading] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();

  const form = useForm<z.infer<typeof CollectionForm>>({
    resolver: zodResolver(CollectionForm),
    mode: "onChange",
    defaultValues: props,
  });

  const requestHeaders = {
    Authorization: `Bearer ${session.data?.access_token}`,
    "Content-Type": "application/json",
  };

  const { upload, progress, isLoading } = usePutObjects();

  const mutation = useMutation({
    mutationKey: ["updateCollection", requestHeaders],
    mutationFn: async (values: CollectionForm) => {
      const resUpload =
        values.primaryImage.url !== props.primaryImage.url &&
        values.primaryImage.file
          ? await upload({ files: [values.primaryImage.file] })
              .then((res) => res.data)
              .catch((err) => {
                console.error(err);
                return null;
              })
          : null;

      return request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        updateCollection(),
        {
          updateCollectionId: props.id,
          input: {
            displayName: values.displayName,
            description: values.description,
            slug: values.slug,
            abbreviation: values.abbreviation,
            primaryImageURL:
              resUpload !== null ? resUpload.urls[0] : values.primaryImage.url,
            categoryID: values.category.id,
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
        description: "Коллекция обновлена",
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
      <DialogTrigger
        disabled={loading}
        className="flex h-fit flex-col justify-start gap-2"
      >
        <ImageComp
          src={props.primaryImage.url}
          title={props.displayName}
          className={"aspect-[1.5/1] max-h-[220px] min-h-[215px]"}
          classNameImage="w-full object-cover h-full"
        />
        <Separator />
        <MetaData
          createdBy={props.createdBy}
          createdAt={props.createdAt}
          updatedBy={props.updatedBy}
          updatedAt={props.updatedAt}
        />
      </DialogTrigger>
      <DialogContent className="font-Inter">
        <DialogHeader className="flex flex-row items-center justify-between">
          <div className="flex flex-col space-y-1.5 text-left">
            <DialogTitle>Изменить</DialogTitle>
            <DialogDescription>
              Коллекцию:{" "}
              <span className="break-all text-xs font-semibold lg:text-base">
                {props.displayName}
              </span>
            </DialogDescription>
          </div>
          <DeleteCollection
            id={props.id}
            name={props.displayName}
            className="ml-auto mr-4 mt-0"
          />
        </DialogHeader>
        {loading ? (
          <LoadingMutation isLoadingFile={isLoading} progress={progress} />
        ) : (
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
                Сохранить
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
                    defaultValue={props.displayName}
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">
                    Slug <span className="text-sm font-light">(URL имя)</span>
                  </p>
                  <FormInput
                    name="slug"
                    className="border-border w-full max-w-lg text-sm"
                    defaultValue={props.slug}
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">Тип</p>
                  <Link
                    href={`/${props.type}?collection=${props.slug}`}
                    className="flex items-center underline underline-offset-2"
                  >
                    {getName(props.type)} <ChevronRight className="h-5 w-5" />
                  </Link>
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
                  <InputDropzone
                    formValueName="primaryImage"
                    defaultValue={props.primaryImage}
                    file={false}
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">Аббревиатура</p>
                  <FormInput
                    name="abbreviation"
                    className="border-border w-full max-w-lg text-base"
                    defaultValue={props.abbreviation}
                  />
                </div>

                <div className="mb-6">
                  <p className="mb-2 font-medium">Описание</p>
                  <FormTextArea
                    name="description"
                    className="border-border w-full max-w-lg text-sm"
                    defaultValue={props.description}
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
