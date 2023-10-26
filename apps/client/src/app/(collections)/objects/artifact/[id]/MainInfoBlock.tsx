import type { ArtifactById, ObjectsDict } from '@siberiana/schemas'
import React from 'react'
import InfoTable from '~/components/objects/InfoTable'
import { SingleItem, SingleItemArray } from '~/components/objects/Infoitems'

export default function MainInfoBlock({
    dict,
    data,
}: {
    dict: ObjectsDict,
    data: ArtifactById,
}) {

    return (
        <div className='w-full'>
            <h2 className="text-foreground lg:text-xl text-lg font-bold uppercase mb-3">
                {dict.mainInfo.title}
            </h2>

            <InfoTable>
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
                <SingleItemArray
                    label='Проекты'
                    value={data.projects}
                />
                <SingleItemArray
                    label='Публикации'
                    value={data.publications}
                />
            </InfoTable>
        </div>
    )
}
