import type { ArtifactById, Holders, ObjectsDict } from '@siberiana/schemas'
import { Collapsible, CollapsibleTrigger, CollapsibleContent, ScrollArea } from '@siberiana/ui'
import { ChevronsUpDown } from 'lucide-react'
import React from 'react'

export default function MainInfoBlock({
    dict,
    data,
}: {
    dict: ObjectsDict,
    data: ArtifactById,
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
                    label='Период'
                    value={data.period?.displayName}
                />
                <SingleItem
                    label='Датировка'
                    value={data.dating}
                />
                <SingleItem
                    label='Типология'
                    value={data.typology}
                />
                <SingleItem
                    label='Культура'
                    value={data.culturalAffiliation?.displayName}
                />
                <SingleItemArray
                    label='Техника'
                    value={data.techniques}
                />
                <SingleItemArray
                    label='Материал изготовления'
                    value={data.mediums}
                />
                <SingleItem
                    label='Химический состав'
                    value={data.chemicalComposition}
                />
                <SingleItem
                    label='Размеры'
                    value={data.dimensions}
                />
                <SingleItem
                    label='Вес, г'
                    value={data.weight}
                />
                <SingleItem
                    label='Расположение'
                    value={data.location?.displayName}
                />
                <SingleItem
                    label='Комплекс'
                    value={data.set?.displayName}
                />
                <SingleItem
                    label='Памятник'
                    value={data.monument?.displayName}
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
                <SingleItemArray
                    label='Автор'
                    value={data.authors}
                />
                <SingleItemHolders
                    label='Держатель'
                    value={data.holders}
                />
                <SingleItemArray
                    label='Проекты'
                    value={data.projects}
                />
                <SingleItemArray
                    label='Публикации'
                    value={data.publications}
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

function SingleItemArray({
    label,
    value
}: {
    label: string,
    value: { displayName: string }[],
}) {
    if (value.length === 0) {
        return null
    } else if (value.length === 1) {
        return (
            <div className="flex gap-3">
                <p className="w-1/2 font-semibold">{label}</p>
                <p className="w-1/2 font-normal">{value[0].displayName}</p>
            </div>   
        )
    } else {
        const withoutFirst = value.slice(1);
        return (
            <div className="flex gap-3">
                <p className="w-1/2 font-semibold">{label}</p>
                <Collapsible className='w-1/2'>
                    <CollapsibleTrigger className='flex gap-2 items-center rounded-md hover:bg-accent hover:px-2 transition-all'>
                        <span className="font-normal">
                            {value[0].displayName}
                        </span>
                        <ChevronsUpDown className="h-6 w-6 border-2 p-0.5 rounded-md" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {withoutFirst.map((el, index) => (
                        <p key={index} className="font-normal">
                            {el.displayName}
                        </p>
                      ))}
                    </CollapsibleContent>
                </Collapsible>
            </div>   
        )
    }
}

function SingleItemHolders({
    label,
    value
}: {
    label: string,
    value: Holders,
}) {
    if (value.length === 0) {
        return null
    } else if (value.length === 1) {
        return (
            <div className="flex gap-3">
                <p className="w-1/2 font-semibold">{label}</p>
                <p className="w-1/2 font-normal">
                    {value[0].organization?.displayName}
                    {value[0].person?.displayName}
                </p>
            </div>   
        )
    } else {
        const withoutFirst = value.slice(1);
        return (
            <div className="flex gap-3">
                <p className="w-1/2 font-semibold">{label}</p>
                <Collapsible className='w-1/2'>
                    <CollapsibleTrigger className='flex gap-2 items-center rounded-md hover:bg-accent hover:px-2 transition-all'>
                        <span className="font-normal">
                            {value[0].organization?.displayName}
                            {value[0].person?.displayName}
                        </span>
                        <ChevronsUpDown className="h-6 w-6 border-2 p-0.5 rounded-md" />
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      {withoutFirst.map((el, index) => (
                        <p key={index} className="font-normal">
                            {el.organization?.displayName}
                            {el.person?.displayName}
                        </p>
                      ))}
                    </CollapsibleContent>
                </Collapsible>
            </div>   
        )
    }
}
