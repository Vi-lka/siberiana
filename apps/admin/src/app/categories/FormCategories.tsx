"use client"

import { CategoryNode } from '@siberiana/schemas'
import { Button, Form, ScrollArea, Separator } from '@siberiana/ui'
import React from 'react'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import type { z } from 'zod';
import FormInputText from '~/components/tables/inputs/FormInputText';
import FormTextArea from '~/components/tables/inputs/FormTextArea';
import Collections from '~/components/tables/global-fields/Collections';
import Dropzone from '~/components/tables/inputs/Dropzone';


export default function FormCategories(props: CategoryNode) {

    const form = useForm<z.infer<typeof CategoryNode>>({
        resolver: zodResolver(CategoryNode),
        mode: 'onChange',
        defaultValues: props
    });

    function handleSave(dataForm: z.infer<typeof CategoryNode>) {
        const {
            description,
            ...rest // assigns remaining
        } = dataForm;

        const descriptionNoLines = description.replace(/\n/g, " ")

        const result = { 
            description: descriptionNoLines,
            ...rest
        }

        console.log(result);
    }

    return (
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
                        <p className='mb-2 font-medium'>Slug (URL имя)</p>
                        <FormInputText name='slug' className='w-full max-w-lg text-sm border-border' />
                    </div>

                    <div className="mb-6">
                        <p className='mb-2 font-medium'>Фото</p>
                        <Dropzone />
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
                        <p className='mb-2 font-medium'>Коллекции</p>
                        <Collections defaultCollections={form.getValues("collections")} formValueName={`collections`} className='w-full max-w-lg border rounded-md text-base' />
                    </div>
                </ScrollArea>
            </form>
        </Form>
    )
}
