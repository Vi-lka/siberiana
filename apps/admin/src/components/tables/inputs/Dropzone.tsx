"use client"

import { Progress, useToast } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { AlertOctagon, MousePointerClick, UploadCloud } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { usePutObjects } from '~/lib/auth/siberiana'
import getShortDescription from '~/lib/utils/getShortDescription'

export default function Dropzone({
    className,
}: {
    className?: string
}) {
    const [file, setFile] = useState<string>()
    const [response, setResponse] = useState<{ urls: Array<string> } | null>(null)
    const [error, setError] = useState(false)
    
    const { toast } = useToast()

    const { upload, progress, isLoading } = usePutObjects()

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const newFileUrl = URL.createObjectURL(acceptedFiles[0])
        setFile(newFileUrl)
        handleSubmit(acceptedFiles)
            .then((res) => {
                setResponse(res)
                toast({
                    title: "Успешно!",
                    description: <p>Фотография загружена</p>,
                    className: "font-Inter",
                })
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
      const res = await upload({ files }).then((res) => res.data);
      return res
    };

    if (error) return (
        <div {...getRootProps({
            className: cn("p-12 border border-solid border-border rounded-md cursor-pointer bg-muted", className)
        })}>
            <input {...getInputProps()} />
            <AlertOctagon className='mx-auto text-red-500'/>
            <p className='text-xs text-center text-red-500'>Ошибка!</p>
            <p className='text-xs text-center text-muted-foreground'>Попробуйте снова</p>
        </div>
    )

    if (!!!file) return (
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
            {isLoading && progress < 100
                ? <Progress value={progress} className="w-full" />
                : null
            }
        </div>
    )

    console.log(response)
    
    return (
        <div className={cn("p-12 border border-solid border-border rounded-md bg-muted", className)}>
            <Image src={file} width={200} height={200} alt='' className='mx-auto'/>
            {isLoading && progress < 100
                ? <Progress value={progress} className="w-full" />
                : null
            }
        </div>
    )
}
