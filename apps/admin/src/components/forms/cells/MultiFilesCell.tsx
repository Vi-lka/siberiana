import React from 'react'
import Image from 'next/image'

export default function MultiFilesCell({
    values,
    file
}: {
    values: {
        file?: File | null | undefined;
        url: string;
    }[] | null,
    file?: boolean
}) {

    if (!values) return <p className='text-center'>__</p>

    const gridColumns = values.length < 3 ? values.length : 3

    if (file) {
        return (
            <div className="grid gap-1 w-max max-w-[18rem] mx-auto" style={{gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`}}>
                {values.map((value, index) => (
                    <div key={index} className='p-1 border-[1px] border-muted rounded-md overflow-hidden bg-background'>
                        <p className="mt-3 break-words text-center text-xs font-light">
                            {!!value.file ? value.file.name : value.url}
                        </p>
                    </div> 
                ))}
            </div>
        )
    }

    return (
        <div className="grid gap-1 w-max max-w-[18rem] mx-auto" style={{gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`}}>
            {values.map((value, index) => (
                <figure
                    key={index}
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
            ))}
        </div>
    )
}
