import React from 'react'
import Image from 'next/image'
import type { CustomFile } from '@siberiana/schemas';
import { useFormContext } from 'react-hook-form';
import { RotateCcw } from 'lucide-react';
import { cn } from '@siberiana/ui/src/lib/utils';

export default function MultiFilesCell({
    name,
    defaultValues,
    file,
    className
}: {
    name: string,
    defaultValues: {
        file?: CustomFile | null | undefined;
        url: string;
    }[] | null,
    file?: boolean,
    className?: string,
}) {

    const form = useFormContext();

    const values = form.getValues(name) as {
        file: CustomFile | null | undefined;
        url: string;
    }[] | null;

    if (!values || values.length === 0) return <p className='text-center'>__</p>

    const gridColumns = values.length < 3 ? values.length : 3

    if (file) {
        return (
            <div
                className={cn(
                    "relative p-1 border border-solid border-border rounded-md cursor-pointer",
                    className,
                    form.getFieldState(name).invalid
                    ? "border-red-500"
                    : form.getFieldState(name).isDirty
                    ? "border-green-400"
                    : "",
                )}
            >
                <div className="grid gap-1 w-max max-w-[18rem] mx-auto" style={{gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`}}>
                    {values.map((value, index) => (
                        <div key={index} className='p-1 border-[1px] border-muted rounded-md overflow-hidden bg-background'>
                            <p className="mt-3 break-words text-center text-xs font-light">
                                {!!value.file ? value.file.name : value.url}
                            </p>
                        </div> 
                    ))}
                </div>
                {form.getFieldState(name).isDirty ? (
                    <RotateCcw
                        className="text-muted-foreground hover:text-foreground absolute top-1 right-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
                        onClick={(e) => {
                            e.stopPropagation()
                            e.preventDefault()
                            form.setValue(name, defaultValues, {
                                shouldDirty: true,
                                shouldValidate: true,
                                shouldTouch: true,
                            })
                        }}
                    />
                ) : null}
            </div>
        )
    }

    return (
        <div 
            className={cn(
                "relative p-1 border border-solid border-border rounded-md cursor-pointer",
                className,
                form.getFieldState(name).invalid
                ? "border-red-500"
                : form.getFieldState(name).isDirty
                ? "border-green-400"
                : "",
            )}
        >
            <div className="grid gap-1 w-max max-w-[18rem] mx-auto" style={{gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`}}>
                {values.map((value, index) => (
                    <figure
                        key={index}
                        className='px-1 py-1 border border-solid border-border rounded-md cursor-pointer bg-muted'
                    >
                        <Image
                            src={value.url.length > 0 ? value.url : "/images/image-placeholder.png"}
                            width={100}
                            height={100}
                            alt={!!value.file ? value.file.name : value.url}
                            className="mx-auto object-cover rounded-sm"
                        />
                        <figcaption className="mt-3 break-words text-center text-xs font-light">
                            {!!value.file ? value.file.name : value.url}
                        </figcaption>
                    </figure>
                ))}
            </div>
            {form.getFieldState(name).isDirty ? (
                <RotateCcw
                    className="text-muted-foreground hover:text-foreground absolute top-1 right-1 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
                    onClick={(e) => {
                        e.stopPropagation()
                        e.preventDefault()
                        form.setValue(name, defaultValues, {
                            shouldDirty: true,
                            shouldValidate: true,
                            shouldTouch: true,
                        })
                    }}
                />
            ) : null}
        </div>
    )
}
