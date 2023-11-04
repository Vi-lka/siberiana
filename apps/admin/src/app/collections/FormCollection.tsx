"use client"

import React from 'react'
import { CollectionNode } from '@siberiana/schemas'
import { Button, Form, ScrollArea, Separator } from '@siberiana/ui'
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import FormInputText from '~/components/tables/inputs/FormInputText';
import FormTextArea from '~/components/tables/inputs/FormTextArea';
import Dropzone from '~/components/tables/inputs/Dropzone';
import Categories from '~/components/tables/global-fields/Categories';
import type { z } from 'zod';
import { getName } from './TypeSelect';

export default function FormCollection(props: CollectionNode) {
    const form = useForm<z.infer<typeof CollectionNode>>({
        resolver: zodResolver(CollectionNode),
        mode: 'onChange',
        defaultValues: props
    });

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
                        <p className='mb-2 font-medium'>Тип</p>
                        <p>{getName(props.type)}</p>
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
