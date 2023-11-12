"use client"

import { CategoryForm } from '@siberiana/schemas'
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Form, ScrollArea, Separator, useToast } from '@siberiana/ui'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from 'zod';
import FormInputText from '~/components/tables/inputs/FormInputText';
import FormTextArea from '~/components/tables/inputs/FormTextArea';
import { Loader2, Plus } from 'lucide-react';
import { cn } from '@siberiana/ui/src/lib/utils';
import { useMutation } from '@tanstack/react-query';
import request from 'graphql-request';
import { createCategory } from '~/lib/mutations/collections';
import { useSession } from 'next-auth/react';
import getShortDescription from '~/lib/utils/getShortDescription';
import { useRouter } from 'next/navigation';
import { putObjects } from '~/lib/auth/siberiana';
import InputDropzone from '~/components/tables/inputs/InputDropzone';

const DEFAULT_VALUES = {
    id: "",
    slug: "",
    displayName: "",
    abbreviation: "",
    primaryImage: {
        file: undefined,
        url: ""
    },
    description: "",
    collections: [],
    createdBy: "",
    createdAt: new Date(),
    updatedBy: "",
    updatedAt: new Date()
} as CategoryForm

export default function AddCategory({
    className
}: {
    className?: string
}) {

    const [loading, setLoading] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const session = useSession()

    function getCollectionsIds(collections: { id: string, displayName: string }[]) {
        if (collections.length === 0) return null

        const ids = collections.map(collection => collection.id)
        return ids
    }

    const form = useForm<z.infer<typeof CategoryForm>>({
        resolver: zodResolver(CategoryForm),
        mode: 'onChange',
        defaultValues: DEFAULT_VALUES
    });

    const requestHeaders = {
        Authorization: `Bearer ${session.data?.access_token}`,
        'Content-Type': 'application/json',
    };

    const mutation = useMutation({
        mutationKey: ['createCategory', requestHeaders],
        mutationFn: async (values: CategoryForm) => {
            const resUpload = values.primaryImage.file 
                ? await putObjects({ files: [values.primaryImage.file] })
                    .then((res) => res.data)
                    .catch((err) => {
                        console.error(err)
                        return null
                    })
                : null

          return request(
            `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
            createCategory(),
            {input: {
                displayName: values.displayName,
                description: values.description,
                abbreviation: values.abbreviation,
                collectionIDs: getCollectionsIds(values.collections),
                primaryImageURL: resUpload !== null ? resUpload.urls[0] : "",
                slug: values.slug
            }},
            requestHeaders
          )
        },
        onMutate: () => setLoading(true),
        onError: (err) => {
            setLoading(false)
            setOpenDialog(false)
            toast({
                variant: "destructive",
                title: "Oшибка!",
                description: <p>{getShortDescription(err.message)}</p>,
                className: "font-Inter"
            })
            console.log(err)
        },
        onSuccess: () => {
            setLoading(false)
            setOpenDialog(false)
            toast({
                title: "Успешно!",
                description: "Категория создана",
                className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
            })
            router.refresh()
        },
    })

    function handleSave(dataForm: z.infer<typeof CategoryForm>) {
        const {
            description,
            ...rest // assigns remaining
        } = dataForm;
        const descriptionNoLines = description.replace(/\n/g, " ")
        const result = { 
            description: descriptionNoLines,
            ...rest
        }

        mutation.mutate(result)
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button disabled={loading} className={cn('flex items-center gap-1', className)}>
                    <Plus/> Создать
                </Button>
            </DialogTrigger>
            <DialogContent className='font-Inter'>
                <DialogHeader>
                    <DialogTitle>Создать</DialogTitle>
                    <DialogDescription>
                        Категорию
                    </DialogDescription>
                </DialogHeader>
                {loading
                    ? <Loader2 className='animate-spin w-12 h-12 mx-auto mt-3' />
                    : (
                        <Form {...form}>
                            <form
                                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                onSubmit={form.handleSubmit(handleSave)}
                            >
                                <Button
                                    disabled={!(form.formState.isDirty && form.formState.isValid)}
                                    type="submit"
                                    className="w-full mb-2 p-2 h-fit text-xs uppercase"
                                >
                                  Создать
                                </Button>
                                <Separator />
                                <ScrollArea className='pt-3' classNameViewport='lg:max-h-[70vh] max-h-[60vh] md:px-4 px-2'>
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Название</p>
                                        <FormInputText name='displayName' className='w-full max-w-lg text-base border-border' defaultValue={DEFAULT_VALUES.displayName} />
                                    </div>
                        
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Slug <span className='font-light text-sm'>(URL имя)</span></p>
                                        <FormInputText name='slug' className='w-full max-w-lg text-sm border-border' defaultValue={DEFAULT_VALUES.slug} />
                                    </div>
                        
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Фото</p>
                                        <InputDropzone formValueName="primaryImage"/>
                                    </div>
                        
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Аббревиатура</p>
                                        <FormInputText name='abbreviation' className='w-full max-w-lg text-base border-border' defaultValue={DEFAULT_VALUES.abbreviation} />
                                    </div>
                        
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Описание</p>
                                        <FormTextArea name='description' className='w-full max-w-lg text-sm border-border' defaultValue={DEFAULT_VALUES.description}  />
                                    </div>
                                </ScrollArea>
                            </form>
                        </Form>
                    )
                }
            </DialogContent>
        </Dialog>
    )
}
