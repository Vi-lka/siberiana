import React from "react";

import type { ObjectsDict, PAPById } from "@siberiana/schemas";

import {
  SingleItem,
  SingleItemProtectedArea,
} from "~/components/objects/Infoitems";
import InfoTable from "~/components/objects/InfoTable";

export default function MainInfoBlock({
  dict,
  data,
}: {
  dict: ObjectsDict;
  data: PAPById;
}) {
  return (
    <div className="w-full">
      <h2 className="text-foreground mb-3 text-lg font-bold uppercase lg:text-xl">
        {dict.mainInfo.title}
      </h2>

      <InfoTable>
        <SingleItem
          label="Категория"
          value={data.collection.category.displayName}
        />
        <SingleItem label="Коллекция" value={data.collection.displayName} />
        <SingleItem
          label="Права пользователя"
          value={data.license?.displayName}
        />
        <SingleItem
          label="Дата съемки"
          value={data.shootingDate?.toLocaleDateString("ru")}
        />
        <SingleItemProtectedArea label="ООПТ" value={data.protectedArea} />
        <SingleItem label="Расположение" value={data.location?.displayName} />
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
      </InfoTable>
    </div>
  );
}
