import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, Separator } from '@siberiana/ui'
import React from 'react'
import ErrorHandler from '~/components/errors/ErrorHandler'
import ImageComp from '~/components/lists/ImageComp'
import MetaData from '~/components/lists/MetaData'
import { getCollections } from '~/lib/queries/collections'
import FormCollection from './FormCollection'
import AddCollection from './AddCollection'
import DeleteCollection from './DeleteCollection'

export const dynamic = 'force-dynamic'

export default async function CollectionsPage({
    searchParams
}: {
    searchParams: { [key: string]: string | string[] | undefined },
}) {

    const search = searchParams['search'] as string | undefined

    const [ result ] = await Promise.allSettled([ 
        getCollections({ 
          first: null,
          search,
        }) 
    ])
    if (result.status === 'rejected') {
        return (
          <ErrorHandler
            error={result.reason as unknown}
            place="Collections Page"
            notFound 
            goBack
          />
        )
    }
      
    return (
        <div key={Math.random()} className='font-OpenSans px-2 py-10 md:ml-[14rem]'>
            <AddCollection className='mr-6 ml-auto' />
            <div className='flex flex-wrap justify-center gap-10 mt-6'>
                {result.value.edges.map(edge => (
                    <div key={edge.node.id} className=''>
                        <Dialog>
                            <DialogTrigger className='flex flex-col gap-2 justify-start h-fit'>
                                <ImageComp
                                    src={edge.node.primaryImageURL}
                                    title={edge.node.displayName}
                                    className={"aspect-[1.5/1] min-h-[215px] max-h-[220px]"}
                                    classNameImage='w-full object-cover h-full'
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
                                            Редактировать коллекцию
                                        </DialogDescription>
                                    </div>
                                    <DeleteCollection id={edge.node.id} className='mr-4 ml-auto mt-0' />
                                </DialogHeader>
                                <FormCollection {...edge.node}/>
                            </DialogContent>
                        </Dialog>
                    </div>
                ))}
            </div>
        </div>
    )
}
