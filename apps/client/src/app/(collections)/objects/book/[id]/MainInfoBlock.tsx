import React from "react";

import type { BookById, ObjectsDict } from "@siberiana/schemas";

import { SingleItem, SingleItemArray } from "~/components/objects/Infoitems";
import InfoTable from "~/components/objects/InfoTable";

export default function MainInfoBlock({
  dict,
  data,
}: {
  dict: ObjectsDict;
  data: BookById;
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
        <SingleItemArray label="Раздел" value={data.bookGenres} />
        <SingleItemArray label="Автор" value={data.authors} />
        <SingleItem label="Год издания" value={data.year.toString()} />
        <SingleItem label="Издатель" value={data.publisher?.displayName} />
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
