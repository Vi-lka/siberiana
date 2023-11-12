"use client"

import { CategoryForm } from '@siberiana/schemas'
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Form, ScrollArea, Separator, useToast } from '@siberiana/ui'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from 'zod';
import FormInputText from '~/components/tables/inputs/FormInputText';
import FormTextArea from '~/components/tables/inputs/FormTextArea';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import ImageComp from '~/components/lists/ImageComp';
import MetaData from '~/components/lists/MetaData';
import DeleteCategory from './DeleteCategory';
import { useMutation } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import request from 'graphql-request';
import getShortDescription from '~/lib/utils/getShortDescription';
import { updateCategory } from '~/lib/mutations/collections';
import { putObjects } from '~/lib/auth/siberiana';
import InputDropzone from '~/components/tables/inputs/InputDropzone';

export default function UpdateCategory(props: CategoryForm) {
    
    const [loading, setLoading] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const session = useSession()

    const form = useForm<z.infer<typeof CategoryForm>>({
        resolver: zodResolver(CategoryForm),
        mode: 'onChange',
        defaultValues: props
    });

    const requestHeaders = {
        Authorization: `Bearer ${session.data?.access_token}`,
        'Content-Type': 'application/json',
    };

    const mutation = useMutation({
        mutationKey: ['updateCategory', requestHeaders],
        mutationFn: async (values: CategoryForm) => {
            const resUpload = (values.primaryImage.url !== props.primaryImage.url) && values.primaryImage.file 
                ? await putObjects({ files: [values.primaryImage.file] })
                    .then((res) => res.data)
                    .catch((err) => {
                        console.error(err)
                        return null
                    })
                : null

          return request(
            `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
            updateCategory(),
            {
                updateCategoryId: props.id,
                input: {
                  displayName: values.displayName,
                  description: values.description,
                  slug: values.slug,
                  abbreviation: values.abbreviation,
                  primaryImageURL: resUpload !== null ? resUpload.urls[0] : values.primaryImage.url,
                }
            },
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
                description: "Категория обновлена",
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
            <DialogTrigger disabled={loading} className='flex flex-col gap-2 justify-start h-fit'>
                <ImageComp
                    src={props.primaryImage.url}
                    title={props.displayName}
                    className={"aspect-[1.5/1] min-h-[215px] max-h-[220px]"}
                    classNameImage='w-full object-cover h-full'
                />
                <Separator/>
                <MetaData 
                    createdBy={props.createdBy}
                    createdAt={props.createdAt}
                    updatedBy={props.updatedBy}
                    updatedAt={props.updatedAt}
                />
            </DialogTrigger>
            <DialogContent className='font-Inter'>
                <DialogHeader className='flex flex-row justify-between items-center'>
                    <div className='flex flex-col space-y-1.5 text-left ml-0 mr-auto'>
                        <DialogTitle>
                            Изменить
                        </DialogTitle>
                        <DialogDescription>
                            Категорию: <span className="font-semibold lg:text-base text-xs break-all">{props.displayName}</span>
                        </DialogDescription>
                    </div>
                    <DeleteCategory id={props.id} name={props.displayName} collections={props.collections} className='mr-4 ml-auto mt-0' />
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
                                  Сохранить
                                </Button>
                                <Separator />
                                <ScrollArea className='pt-3' classNameViewport='lg:max-h-[70vh] max-h-[60vh] md:px-4 px-2'>
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Название</p>
                                        <FormInputText name='displayName' className='w-full max-w-lg text-base border-border'  defaultValue={props.displayName} />
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Slug <span className='font-light text-sm'>(URL имя)</span></p>
                                        <FormInputText name='slug' className='w-full max-w-lg text-sm border-border' defaultValue={props.slug} />
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Фото</p>
                                        <InputDropzone formValueName="primaryImage"/>
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Аббревиатура</p>
                                        <FormInputText name='abbreviation' className='w-full max-w-lg text-base border-border' defaultValue={props.abbreviation} />
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Описание</p>
                                        <FormTextArea name='description' className='w-full max-w-lg text-sm border-border' defaultValue={props.description} />
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Коллекции</p>
                                        {props.collections.map(item => (
                                            <p key={item.id} className='text-center mb-3'>{item.displayName}</p>
                                        ))}
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
