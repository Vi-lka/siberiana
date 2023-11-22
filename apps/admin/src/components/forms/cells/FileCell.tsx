import React from 'react'
import Image from 'next/image'

export default function FileCell({
    value,
    file
}: {
    value: {
        file?: File | null | undefined;
        url: string;
    },
    file?: boolean
}) {

    if (file) {
        return (
            <div className='p-1 border-[1px] border-muted rounded-md overflow-hidden bg-background'>
                <p className="mt-3 break-words text-center text-xs font-light">
                    {!!value.file ? value.file.name : value.url}
                </p>
            </div> 
        )
    }

    return (
        <figure
            className='px-1 py-1 border border-solid border-border rounded-md cursor-pointer bg-muted'
        >
            <Image
                src={value.url}
                width={100}
                height={100}
                alt={!!value.file ? value.file.name : value.url}
                className="mx-auto object-cover rounded-sm"
            />
            <figcaption className="mt-3 break-words text-center text-xs font-light">
                {!!value.file ? value.file.name : value.url}
            </figcaption>
        </figure>
    )
}
