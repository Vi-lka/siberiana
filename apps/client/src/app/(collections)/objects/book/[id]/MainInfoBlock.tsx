import type { BookById, Holders, ObjectsDict } from '@siberiana/schemas'
import { ScrollArea } from '@siberiana/ui'
import React from 'react'

export default function MainInfoBlock({
    dict,
    data,
}: {
    dict: ObjectsDict,
    data: BookById,
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
                <SingleItemArray
                    label='Жанр'
                    value={data.bookGenres}
                />
                <SingleItem
                    label='Год'
                    value={data.year.toString()}
                />
                <SingleItemArray
                    label='Автор'
                    value={data.authors}
                />
                <SingleItemHolders
                    label='Держатель'
                    value={data.holders}
                />
                <SingleItem
                    label='Издатель'
                    value={data.publisher?.displayName}
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
    } else return (
        <div className="flex gap-3">
            <p className="w-1/2 font-semibold">{label}</p>
            <div className='w-1/2 flex flex-col gap-2'>
                {value.map((el, index) => (
                    <p key={index} className="font-normal">
                        {el.displayName}
                    </p>
                ))}
            </div>
        </div>   
    )
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
    } else return (
        <div className="flex gap-3">
            <p className="w-1/2 font-semibold">{label}</p>
            <div className='w-1/2 flex flex-col gap-2'>
                {value.map((el, index) => (
                    <p key={index} className="font-normal">
                        <span className=" font-semibold">
                            {el.organization?.displayName}
                        </span>
                        {el.person?.displayName}
                    </p>
                ))}
            </div>
        </div>   
    )
}
