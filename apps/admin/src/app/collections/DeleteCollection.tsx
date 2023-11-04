"use client"

import { Alert, AlertDescription, AlertTitle, Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, Separator, useToast } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { useMutation } from '@tanstack/react-query'
import request from 'graphql-request'
import { AlertCircle, Loader2, Trash2 } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'
import { deleteCollection } from '~/lib/mutations/collections'
import getShortDescription from '~/lib/utils/getShortDescription'

export default function DeleteCollection({
    id,
    className,
}: {
    id: string,
    className?: string,
}) {
    const [loading, setLoading] = React.useState(false)
    const [openDialog, setOpenDialog] = React.useState(false)
    const { toast } = useToast()
    const router = useRouter()
    const session = useSession()

    const requestHeaders = {
        Authorization: `Bearer ${session.data?.access_token}`,
        'Content-Type': 'application/json',
    };

    const mutation = useMutation({
        mutationKey: ['deleteCollection', requestHeaders],
        mutationFn: (id: string) => 
          request(
            `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
            deleteCollection(),
            { deleteCollectionId: id },
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
                description: "Коллекция удалена",
                className: "font-Inter",
            })
            router.refresh()
        },
    })

    const handleDelete = () => {
        mutation.mutate(id)
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button disabled={loading} variant={"destructive"} className={cn('flex items-center gap-1 w-fit h-fit p-2', className)}>
                    <Trash2 className='w-5 h-5' />
                </Button>
            </DialogTrigger>
            <DialogContent className='font-Inter'>
                <DialogHeader>
                    <DialogTitle>Удалить</DialogTitle>
                    <DialogDescription>
                        Удалить коллекцию
                    </DialogDescription>
                </DialogHeader>
                {loading
                    ? <Loader2 className='animate-spin w-12 h-12 mx-auto mt-3' />
                    : (<>
                        <Separator />
                        <div className='pt-3'>
                            <h1 className='font-bold text-2xl text-center mb-3'>Вы уверены?</h1>
                            <Alert variant="destructive" className='mb-3'>
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Внимание!</AlertTitle>
                                <AlertDescription>
                                    <p>Это действие <span className='font-semibold'>удалит все объекты коллекции!!!</span></p>
                                </AlertDescription>
                            </Alert>
                            <div className="w-full flex gap-6 justify-center items-center">
                                <DialogClose asChild>
                                    <Button  variant={"destructive"} onClick={handleDelete}>
                                        Удалить
                                    </Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button type="button" variant="secondary">
                                      Отмена
                                    </Button>
                                </DialogClose>
                            </div>
                        </div>
                    </>)
                }
            </DialogContent>
        </Dialog>
    )
}
