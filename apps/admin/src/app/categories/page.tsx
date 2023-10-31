import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Separator } from '@siberiana/ui'
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import ImageComp from '~/components/lists/ImageComp'
import MetaData from '~/components/lists/MetaData'
import { getCategories } from '~/lib/queries/collections'
import FormCategories from './FormCategories'
import AddCategory from './AddCategory'

export default async function CategoriesPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const search = searchParams['search'] as string | undefined

    const [ result ] = await Promise.allSettled([ 
        getCategories({ 
          first: null,
          search,
        }) 
    ])
    if (result.status === 'rejected') {
        return (
          <ErrorHandler
            error={result.reason as unknown}
            place="Categories Page"
            notFound 
            goBack
          />
        )
    }
      
    return (
        <div className='font-OpenSans px-2 py-10 md:ml-[14rem]'>
            <AddCategory className='mr-6 ml-auto' />
            <div className='flex flex-wrap justify-center gap-10 mt-6'>
                {result.value.edges.map(edge => (
                    <Dialog key={edge.node.id}>
                        <DialogTrigger className='flex flex-col gap-2 justify-start h-fit'>
                            <ImageComp
                                src={edge.node.primaryImageURL}
                                title={edge.node.displayName}
                                className={"aspect-[1.5/1]"}
                                classNameImage='w-full object-cover'
                            />
                            <Separator/>
                            <MetaData 
                                createdBy={edge.node.createdBy}
                                createdAt={edge.node.createdAt}
                                updatedBy={edge.node.updatedBy}
                                updatedAt={edge.node.updatedAt}
                            />
                        </DialogTrigger>
                        <DialogContent className='font-Inter'>
                            <DialogHeader>
                                <DialogTitle>Изменить</DialogTitle>
                                <DialogDescription>
                                    Редактировать категорию
                                </DialogDescription>
                                <FormCategories {...edge.node}/>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                ))}
            </div>
        </div>
    )
}
