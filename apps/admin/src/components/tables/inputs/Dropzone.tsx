"use client"

import { Progress, useToast } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { AlertOctagon, MousePointerClick, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useFormContext } from 'react-hook-form'
import { usePutObjects } from '~/lib/auth/siberiana'
import getShortDescription from '~/lib/utils/getShortDescription'

export default function Dropzone({
    defaultValue,
    formValueName,
    bucket,
    className,
}: {
    formValueName: string,
    defaultValue?: string,
    bucket?: string,
    className?: string
}) {
    const [file, setFile] = useState<string>()
    const [error, setError] = useState(false)
    
    const { toast } = useToast()

    const { upload, progress, isLoading } = usePutObjects()

    const form = useFormContext();

    useEffect(() => {
        if (!!defaultValue) setFile(defaultValue)
    }, [defaultValue])

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFileUrl = URL.createObjectURL(acceptedFiles[0])
        setFile(newFileUrl)
        handleSubmit(acceptedFiles)
            .then((res) => {
                res.urls.forEach((url) => {
                    handleAddToForm(url)
                })
                toast({
                    title: "Успешно!",
                    description: <p>Фотография загружена</p>,
                    className: "font-Inter",
                })
                console.log(form.getValues())
            })
            .catch(err => {
                setError(true)
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: <p>{getShortDescription(err as string)}</p>,
                    className: "font-Inter",
                })
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [toast])
    
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {'image/*': []},
        maxSize: 1024 * 1024 * 1024, // 1Gb
        multiple: false
    })
    
    const handleSubmit = async (files: File[]) => {
        const res = await upload({ bucket, files }).then((res) => res.data);
        return res
    };

    const handleAddToForm = (newValue: string) => {
        form.setValue(formValueName, newValue, {shouldDirty: true, shouldValidate: true, shouldTouch: true})
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

    if (!!!file) return (
        <div {...getRootProps({
            className: cn("p-12 border border-solid border-border rounded-md cursor-pointer bg-muted", className)
        })}>
            {isLoading && progress < 100
                ? <Progress value={progress} className="w-full" />
                : (<>
                    <input {...getInputProps()} />
                    <UploadCloud className='mx-auto text-muted-foreground' />
                    {isDragActive 
                        ? <p className='text-xs text-center text-muted-foreground'>Drop the files here ...</p>
                        : 
                        <p className='text-xs text-center text-muted-foreground'>
                            <span className='underline underline-offset-3'>Drag & drop</span> or <span className='underline underline-offset-2'><MousePointerClick className='inline w-3 h-3' />Click</span>
                        </p>
                    }
                </>)
            }
        </div>
    )
    
    return (
        <div className={cn("px-12 py-10 border border-solid border-border rounded-md bg-muted", className)}>
            {isLoading && progress < 100
                ? <Progress value={progress} className="w-full" />
                : (<>
                    <Image src={file} width={200} height={200} alt={file} className='mx-auto'/>
                    <p className='font-light text-xs break-words text-center mt-3'>{file}</p>
                </>)
            }
        </div>
    )
}
