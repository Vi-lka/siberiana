"use client"

import { Alert, AlertDescription, AlertTitle, Button, Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, ScrollArea, Separator } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { AlertCircle, ChevronRight, Trash2 } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function DeleteCategory({
    id,
    collections,
    className,
}: {
    id: string,
    collections: {
        id: string;
        displayName: string;
    }[]
    className?: string,
}) {

    const handleDelete = () => {
        console.log('delete category: ', id)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"destructive"} className={cn('flex items-center gap-1 w-fit h-fit p-2', className)}>
                    <Trash2 className='w-5 h-5' />
                </Button>
            </DialogTrigger>
            <DialogContent className='font-Inter'>
                <DialogHeader>
                    <DialogTitle>Удалить</DialogTitle>
                    <DialogDescription>
                        Удалить категорию
                    </DialogDescription>
                </DialogHeader>
                <Separator />
                <div className='pt-3'>
                    <h1 className='font-bold text-2xl text-center mb-3'>Вы уверены?</h1>
                    {collections.length > 0
                        ? (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Внимание!</AlertTitle>
                                <AlertDescription>
                                    <p>Вы должны <span className='font-semibold'>удалить коллекции</span>:</p>
                                    <ScrollArea type='always' className='mt-3' classNameViewport='max-h-96 pr-3'>
                                        <ul>
                                            {collections.map(collection => (
                                                <li key={collection.id}>
                                                    <Link href={`/collections/${collection.id}`} passHref>
                                                        <Button variant={"destructive"}>
                                                            {collection.displayName} <ChevronRight/>
                                                        </Button>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </ScrollArea>
                                </AlertDescription>
                            </Alert>
                        )
                        : (
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
                        )
                    }
                </div>
            </DialogContent>
        </Dialog>
    )
}
