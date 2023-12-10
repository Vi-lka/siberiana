import React from "react";

import type { ArtById, ObjectsDict } from "@siberiana/schemas";

import { SingleItem, SingleItemArray } from "~/components/objects/Infoitems";
import InfoTable from "~/components/objects/InfoTable";

export default function MainInfoBlock({
  dict,
  data,
}: {
  dict: ObjectsDict;
  data: ArtById;
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
        <SingleItemArray label="Жанр" value={data.artGenre} />
        <SingleItemArray label="Стиль" value={data.artStyle} />
        <SingleItemArray label="Техники" value={data.techniques} />
        <SingleItem label="Автор" value={data.author?.displayName} />
        <SingleItem label="Датировка" value={data.dating} />
        <SingleItem label="Размеры" value={data.dimensions} />
        <SingleItem label="Номер" value={data.number} />
      </InfoTable>
    </div>
  );
}
