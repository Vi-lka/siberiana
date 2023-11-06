"use client"

import React from 'react'
import { CollectionNode } from '@siberiana/schemas'
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Form, ScrollArea, Separator, useToast } from '@siberiana/ui'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputText from '~/components/tables/inputs/FormInputText';
import FormTextArea from '~/components/tables/inputs/FormTextArea';
import Dropzone from '~/components/tables/inputs/Dropzone';
import Categories from '~/components/tables/global-fields/Categories';
import type { z } from 'zod';
import { getName } from './TypeSelect';
import { useMutation } from '@tanstack/react-query';
import request from 'graphql-request';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import getShortDescription from '~/lib/utils/getShortDescription';
import ImageComp from '~/components/lists/ImageComp';
import MetaData from '~/components/lists/MetaData';
import DeleteCollection from './DeleteCollection';
import { Loader2 } from 'lucide-react';
import { updateCollection } from '~/lib/mutations/collections';

export default function UpdateCollection(props: CollectionNode) {
    
    const [loading, setLoading] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const session = useSession()

    const form = useForm<z.infer<typeof CollectionNode>>({
        resolver: zodResolver(CollectionNode),
        mode: 'onChange',
        defaultValues: props
    });

    const requestHeaders = {
        Authorization: `Bearer ${session.data?.access_token}`,
        'Content-Type': 'application/json',
    };

    const mutation = useMutation({
        mutationKey: ['updateCollection', requestHeaders],
        mutationFn: (values: CollectionNode) => 
          request(
            `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
            updateCollection(),
            {
                updateCollectionId: props.id,
                input: {
                  displayName: values.displayName,
                  description: values.description,
                  slug: values.slug,
                  abbreviation: values.abbreviation,
                  primaryImageURL: values.primaryImageURL,
                  categoryID: values.category.id,
                }
            },
            requestHeaders
          ),
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
                description: "Коллекция обновлена",
                className: "font-Inter text-background dark:text-foreground bg-lime-600 dark:bg-lime-800 border-none",
            })
            router.refresh()
        },
    })

    function handleSave(dataForm: z.infer<typeof CollectionNode>) {
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
                    src={props.primaryImageURL}
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
                    <div className='flex flex-col space-y-1.5 text-left'>
                        <DialogTitle>
                            Изменить
                        </DialogTitle>
                        <DialogDescription>
                            Редактировать коллекцию
                        </DialogDescription>
                    </div>
                    <DeleteCollection id={props.id} className='mr-4 ml-auto mt-0' />
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
                                <ScrollArea className='pt-3' classNameViewport='max-h-[70vh] md:px-4 px-2'>
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Название</p>
                                        <FormInputText name='displayName' className='w-full max-w-lg text-base border-border' />
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Slug <span className='font-light text-sm'>(URL имя)</span></p>
                                        <FormInputText name='slug' className='w-full max-w-lg text-sm border-border' />
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Тип</p>
                                        <p>{getName(props.type)}</p>
                                    </div>

                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Категория</p>
                                        <Categories 
                                            defaultCategory={form.getValues("category")} 
                                            formValueName={`category`} 
                                            className='w-full max-w-lg border rounded-md text-base' 
                                        />
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Фото</p>
                                        <Dropzone formValueName="primaryImageURL" defaultValue={props.primaryImageURL} />
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Аббревиатура</p>
                                        <FormInputText name='abbreviation' className='w-full max-w-lg text-base border-border' />
                                    </div>
                            
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Описание</p>
                                        <FormTextArea name='description' className='w-full max-w-lg text-sm border-border' defaultValue={props.description} />
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
