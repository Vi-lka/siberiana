"use client"

import { CollectionNode } from '@siberiana/schemas'
import { Button, Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Form, ScrollArea, Separator, useToast } from '@siberiana/ui'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from 'zod';
import FormInputText from '~/components/tables/inputs/FormInputText';
import FormTextArea from '~/components/tables/inputs/FormTextArea';
import { Loader2, Plus } from 'lucide-react';
import { cn } from '@siberiana/ui/src/lib/utils';
import Dropzone from '~/components/tables/inputs/Dropzone';
import { useMutation } from '@tanstack/react-query';
import request from 'graphql-request';
import { createCollection } from '~/lib/mutations/collections';
import { useSession } from 'next-auth/react';
import getShortDescription from '~/lib/utils/getShortDescription';
import { useRouter } from 'next/navigation';
import Categories from '~/components/tables/global-fields/Categories';
import TypeSelect from './TypeSelect';

const DEFAULT_VALUES = {
    id: "",
    slug: "",
    displayName: "",
    abbreviation: "",
    primaryImageURL: "",
    description: "",
    category: {
        id: "",
        displayName: "__"
    },
    createdBy: "",
    createdAt: new Date(),
    updatedBy: "",
    updatedAt: new Date()
} as CollectionNode

export default function AddCollection({
    className
}: {
    className?: string
}) {

    const [loading, setLoading] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const session = useSession()

    const form = useForm<z.infer<typeof CollectionNode>>({
        resolver: zodResolver(CollectionNode),
        mode: 'onChange',
        defaultValues: DEFAULT_VALUES
    });

    const requestHeaders = {
        Authorization: `Bearer ${session.data?.access_token}`,
        'Content-Type': 'application/json',
    };

    const mutation = useMutation({
        mutationKey: ['createCollection', requestHeaders],
        mutationFn: (values: CollectionNode) => 
          request(
            `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
            createCollection(),
            {input: {
                displayName: values.displayName,
                description: values.description,
                abbreviation: values.abbreviation,
                categoryID: values.category.id,
                primaryImageURL: values.primaryImageURL,
                slug: values.slug,
                type: values.type,
            }},
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
                description: "Коллекция создана",
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
            <DialogTrigger asChild>
                <Button disabled={loading} className={cn('flex items-center gap-1', className)}>
                    <Plus/> Создать
                </Button>
            </DialogTrigger>
            <DialogContent className='font-Inter'>
                <DialogHeader>
                    <DialogTitle>Создать</DialogTitle>
                    <DialogDescription>
                        Добавить коллекцию
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
                                <ScrollArea className='pt-3' classNameViewport='max-h-[70vh] md:px-4 px-2'>
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Название</p>
                                        <FormInputText name='displayName' className='w-full max-w-lg text-base border-border' />
                                    </div>
                        
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Slug (URL имя)</p>
                                        <FormInputText name='slug' className='w-full max-w-lg text-sm border-border' />
                                    </div>

                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Тип</p>
                                        <TypeSelect className='w-full max-w-lg border rounded-md text-base' />
                                    </div>
                        
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Фото</p>
                                        <Dropzone formValueName="primaryImageURL" />
                                    </div>
                        
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Аббревиатура</p>
                                        <FormInputText name='abbreviation' className='w-full max-w-lg text-base border-border' />
                                    </div>
                        
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Описание</p>
                                        <FormTextArea name='description' className='w-full max-w-lg text-sm border-border' />
                                    </div>
                        
                                    <div className="mb-6">
                                        <p className='mb-2 font-medium'>Категория</p>
                                        <Categories 
                                            defaultCategory={form.getValues("category")} 
                                            formValueName={`category`} 
                                            className='w-full max-w-lg border rounded-md text-base' 
                                        />
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
