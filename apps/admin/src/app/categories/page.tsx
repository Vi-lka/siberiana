import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Separator } from '@siberiana/ui'
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import ImageComp from '~/components/lists/ImageComp'
import MetaData from '~/components/lists/MetaData'
import { getCategories } from '~/lib/queries/collections'
import FormCategories from './FormCategories'
import AddCategory from './AddCategory'
import DeleteCategory from './DeleteCategory'

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
            <div key={Math.random()} className='flex flex-wrap justify-center gap-10 mt-6'>
                {result.value.edges.map(edge => (
                    <div key={edge.node.id} className=''>
                        <Dialog>
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
                                <DialogHeader className='flex flex-row justify-between items-center'>
                                    <div className='flex flex-col space-y-1.5 text-left'>
                                        <DialogTitle>
                                            Изменить
                                        </DialogTitle>
                                        <DialogDescription>
                                            Редактировать категорию
                                        </DialogDescription>
                                    </div>
                                    <DeleteCategory id={edge.node.id} collections={edge.node.collections} className='mr-4 ml-auto mt-0' />
                                </DialogHeader>
                                <FormCategories {...edge.node}/>
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}
            </div>
        </div>
    )
}
