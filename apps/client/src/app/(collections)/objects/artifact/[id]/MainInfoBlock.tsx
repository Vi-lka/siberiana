import React from "react";

import type { ArtifactById, ObjectsDict } from "@siberiana/schemas";

import { SingleItem, SingleItemArray } from "~/components/objects/Infoitems";
import InfoTable from "~/components/objects/InfoTable";

export default function MainInfoBlock({
  dict,
  data,
}: {
  dict: ObjectsDict;
  data: ArtifactById;
}) {
  return (
    <div className="w-full">
      <h2 className="text-foreground mb-3 text-lg font-bold uppercase lg:text-xl">
        {dict.mainInfo.title}
      </h2>

      <InfoTable>
        <SingleItem label="Категория" value={data.collection.category.displayName} />
        <SingleItem label="Коллекция" value={data.collection.displayName} />
        <SingleItem label="Инвентарный номер" value={data.inventoryNumber} />
        <SingleItem label="КП номер" value={data.kpNumber} />
        <SingleItem label="Госкатагол номер" value={data.goskatalogNumber} />

        <SingleItem label="Права пользователя" value={data.license?.displayName} />

        <SingleItem label="Датировка" value={data.dating} />
        <SingleItem label="Типология" value={data.typology} />
        <SingleItem
          label="Культура"
          value={data.culturalAffiliation?.displayName}
        />
        <SingleItemArray label="Техника" value={data.techniques} />
        <SingleItemArray label="Материал изготовления" value={data.mediums} />
        <SingleItem
          label="Химический состав"
          value={data.chemicalComposition}
        />
        <SingleItem label="Размеры" value={data.dimensions} />
        <SingleItem label="Вес, г" value={data.weight} />
        
        <SingleItem label="Расположение" value={data.location?.displayName} />
        <SingleItem label="Комплекс" value={data.set?.displayName} />
        <SingleItem label="Памятник" value={data.monument?.displayName} />
        <SingleItem
          label="Страна"
          value={data.location?.country?.displayName}
        />
        <SingleItem label="Регион" value={data.location?.region?.displayName} />
        <SingleItem
          label="Район"
          value={data.location?.district?.displayName}
        />
        <SingleItem
          label="Населенный пункт"
          value={data.location?.settlement?.displayName}
        />

        <SingleItem label="Организация" value={data.organization?.displayName} />
        <SingleItemArray label="Автор" value={data.authors} />
        <SingleItemArray label="Проекты" value={data.projects} />
        <SingleItemArray label="Публикации" value={data.publications} />
      </InfoTable>
    </div>
  );
}
