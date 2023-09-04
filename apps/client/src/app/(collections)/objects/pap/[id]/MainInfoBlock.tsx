import type { PAPById, ObjectsDict, ProtectedArea } from '@siberiana/schemas'
import { ScrollArea, Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@siberiana/ui'
import React from 'react'

export default function MainInfoBlock({
    dict,
    data,
}: {
    dict: ObjectsDict,
    data: PAPById,
}) {

  return (
    <div className='w-full'>
        <h2 className="text-foreground lg:text-xl text-lg font-bold uppercase mb-6">
            {dict.mainInfo.title}
        </h2>

        <ScrollArea type="always" classNameViewport="max-h-[350px]">
            <div className="md:w-4/5 w-full flex flex-col gap-3">
                <SingleItem
                    label='Категория'
                    value={data.collection.category.displayName}
                />
                <SingleItem
                    label='Коллекция'
                    value={data.collection.displayName}
                />
                <SingleItem
                    label='Права пользователя'
                    value={data.license?.displayName}
                />
                <SingleItem
                    label='Дата съемки'
                    value={new Date(data.shootingDate).toLocaleDateString("ru")}
                />
                <SingleItemProtectedArea
                    label='ООПТ'
                    value={data.protectedArea}
                />
                <SingleItem
                    label='Расположение'
                    value={data.location?.displayName}
                />
                <SingleItem
                    label='Страна'
                    value={data.location?.country?.displayName}
                />
                <SingleItem
                    label='Регион'
                    value={data.location?.region?.displayName}
                />
                <SingleItem
                    label='Район'
                    value={data.location?.district?.displayName}
                />
                <SingleItem
                    label='Населенный пункт'
                    value={data.location?.settlement?.displayName}
                />
            </div> 
        </ScrollArea>
    </div>
  )
}

function SingleItem({ label, value }: { label: string, value: string | undefined }) {
    if (!!value && (value.length > 1)) {
        return (
            <div className="flex gap-3">
                <p className="w-1/2 font-semibold">{label}</p>
                <p className="w-1/2 font-normal">{value}</p>
            </div>
        )
    } else return null
}

function SingleItemProtectedArea({
    label,
    value
}: {
    label: string,
    value: ProtectedArea,
}) {
    return (
        <div className="flex gap-3">
            <p className="w-1/2 font-semibold">{label}</p>
            <Accordion type="single" collapsible className='w-1/2'>
              <AccordionItem value="item-1">
                <AccordionTrigger className='py-0 font-normal'>
                    {value.displayName}
                </AccordionTrigger>
                <AccordionContent className='text-xs'>
                    <p>{value.description}</p>
                    <p>
                        <span className='font-semibold'>Категория ООПТ:</span> {value.protectedAreaCategory?.displayName}
                    </p>
                    <p>
                        <span className='font-semibold'>Область:</span> {value.area}
                    </p>
                    <p>
                        <span className='font-semibold'>Дата создания:</span> {new Date(value.establishmentDate).toLocaleDateString("ru")}
                    </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
        </div>   
    )
}
