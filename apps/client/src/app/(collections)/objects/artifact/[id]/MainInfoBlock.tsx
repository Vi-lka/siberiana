import type { ArtifactById, Holders, ObjectsDict } from '@siberiana/schemas'
import { ScrollArea, Table, TableBody, TableCell, TableRow } from '@siberiana/ui'
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
            <Table className='text-sm'>
                <TableBody>
                    {/* <TableRow>
                        <TableCell className="w-[400px]">INV001</TableCell>
                        <TableCell>Paid</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>INV001</TableCell>
                        <TableCell>Paid</TableCell>
                    </TableRow> */}
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
                </TableBody>
            </Table>

            <div className="md:w-4/5 w-full flex flex-col gap-3">

            </div> 
        </ScrollArea>
    </div>
  )
}

function SingleItem({ label, value }: { label: string, value: string | undefined }) {
    if (!!value && (value.length > 1)) {
        return (
            <TableRow>
                <TableCell className="py-3 w-2/5 text-base font-semibold">{label}</TableCell>
                <TableCell className="py-3 w-3/5 font-normal">{value}</TableCell>
            </TableRow>
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
            <TableRow>
                <TableCell className="py-3 w-2/5 text-base font-semibold">{label}</TableCell>
                <TableCell className="py-3 w-3/5 font-normal">{value[0].displayName}</TableCell>
            </TableRow>  
        )
    } else return (
        <TableRow>
            <TableCell className="py-3 w-2/5 text-base font-semibold">{label}</TableCell>
            <TableCell className="py-3 w-3/5 flex flex-col gap-2 font-normal">
                {value.map((el, index) => (
                    <p key={index}>{el.displayName}</p>
                ))}
            </TableCell>
        </TableRow>   
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
            <TableRow>
                <TableCell className="py-3 w-2/5 text-base font-semibold">{label}</TableCell>
                <TableCell className="py-3 w-3/5 font-normal">
                    {value[0].organization?.displayName}
                    {value[0].person?.displayName}
                </TableCell>
            </TableRow>    
        )
    } else return (
        <TableRow>
            <TableCell className="py-3 w-2/5 text-base font-semibold">{label}</TableCell>
            <TableCell className="py-3 w-3/5 flex flex-col gap-2">
                {value.map((el, index) => (
                    <p key={index} className="font-normal">
                        <span className=" font-semibold">
                            {el.organization?.displayName}
                        </span>
                        {el.person?.displayName}
                    </p>
                ))}
            </TableCell>
        </TableRow>
    )
}
