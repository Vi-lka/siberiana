"use client"

import type { ImageFile } from '@siberiana/schemas'
import { cn } from '@siberiana/ui/src/lib/utils'
import { AlertOctagon, MousePointerClick, UploadCloud, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'

export default function Dropzone({
    defaultValue,
    formValueName,
    className,
}: {
    formValueName: string,
    defaultValue: {
        file: ImageFile | null | undefined, 
        url: string
    }
    className?: string
}) {
    const [imageFile, setFile] = useState<ImageFile>()
    const [imageURL, setURL] = useState<string>()
    const [error] = useState(false)

    const form = useFormContext();

    useEffect(() => {
        if (!!defaultValue.file) {

            setFile(defaultValue.file)
            setURL(URL.createObjectURL(defaultValue.file))

        } else if (defaultValue.url.length > 0) {

            setURL(defaultValue.url)

        }
    }, [defaultValue])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFileUrl = URL.createObjectURL(acceptedFiles[0])
        setFile(acceptedFiles[0])
        setURL(newFileUrl)
        form.setValue(formValueName, { file: acceptedFiles[0], url: newFileUrl }, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
        // handleSubmit(acceptedFiles)
        //     .then((res) => {
        //         res.urls.forEach((url) => {
        //             handleAddToForm(url)
        //         })
        //         toast({
        //             title: "Успешно!",
        //             description: <p>Фотография загружена</p>,
        //             className: "font-Inter",
        //         })
        //         console.log(form.getValues())
        //     })
        //     .catch(err => {
        //         setError(true)
        //         toast({
        //             variant: "destructive",
        //             title: "Error",
        //             description: <p>{getShortDescription(err as string)}</p>,
        //             className: "font-Inter",
        //         })
        //     })
    }, [form, formValueName])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*': [".jpeg", ".jpg", ".png", ".webp"]},
        maxSize: 1024 * 1024 * 100, // 100Mb
        multiple: false
    })
    
    // const handleSubmit = async (files: File[]) => {
    //     const res = await upload({ bucket, files }).then((res) => res.data);
    //     return res
    // };

    // const handleAddToForm = (newValue: ImageFile) => {
    //     form.setValue(formValueName, newValue, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
    // }

    const handleDelete = () => {
        setFile(undefined)
        setURL(undefined)
        form.setValue(formValueName, { file: undefined, url: "" }, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
    }

    if (error) return (
        <div {...getRootProps({
            className: cn("p-12 border border-solid border-border rounded-md cursor-pointer bg-muted", className)
        })}>
            <input {...getInputProps()} />
            <AlertOctagon className='mx-auto text-red-500'/>
            <p className='text-xs text-center text-red-500'>Ошибка!</p>
            <p className='text-xs text-center text-muted-foreground'>Что-то пошло не так</p>
        </div>
    )

    if (imageFile && imageURL) return (<>
        <span 
          className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
          onClick={handleDelete}
        >
          <X className="h-5 w-5"/> Удалить
        </span>
        <div {...getRootProps({
            className: cn("lg:px-12 px-0 lg:py-10 py-2 border border-solid border-border rounded-md cursor-pointer bg-muted", className)
        })}>
            <input {...getInputProps()} />
            <Image src={imageURL} width={180} height={180} alt={imageFile.name} className='mx-auto object-cover'/>
            <p className='font-light text-xs break-words text-center mt-3'>{imageFile.name}</p>
        </div>
    </>)

    if (!imageFile && imageURL) return (<>
        <span 
          className="my-1 text-xs text-muted-foreground flex items-center justify-center cursor-pointer hover:text-foreground hover:scale-110 transition-all" 
          onClick={handleDelete}
        >
          <X className="h-5 w-5"/> Удалить
        </span>
        <div {...getRootProps({
            className: cn("lg:px-12 px-0 lg:py-10 py-2 border border-solid border-border rounded-md cursor-pointer bg-muted", className)
        })}>
            <input {...getInputProps()} />
            <Image src={imageURL} width={180} height={180} alt={imageURL} className='mx-auto object-cover'/>
            <p className='font-light text-xs break-words text-center mt-3'>{imageURL}</p>
        </div>
    </>)

    else return (
        <div {...getRootProps({
            className: cn("p-12 border border-solid border-border rounded-md cursor-pointer bg-muted", className)
        })}>
            <input {...getInputProps()} />
            <UploadCloud className='mx-auto text-muted-foreground' />
            {isDragActive 
                ? <p className='text-xs text-center text-muted-foreground'>Drop the files here ...</p>
                : 
                <p className='text-xs text-center text-muted-foreground'>
                    <span className='underline underline-offset-3'>Drag & drop</span> or <span className='underline underline-offset-2'><MousePointerClick className='inline w-3 h-3' />Click</span>
                </p>
            }
        </div>
    )
}
