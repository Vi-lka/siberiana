import React from "react";

import type { HerbariumById, ObjectsDict } from "@siberiana/schemas";

import { SingleItem } from "~/components/objects/Infoitems";
import InfoTable from "~/components/objects/InfoTable";

export default function MainInfoBlock({
  dict,
  data,
}: {
  dict: ObjectsDict;
  data: HerbariumById;
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
        <SingleItem label="Отдел" value={data.group?.displayName} />
        <SingleItem label="Семейство" value={data.familia?.displayName} />
        <SingleItem label="Род" value={data.genus?.displayName} />
        <SingleItem label="Вид" value={data.species?.displayName} />
        <SingleItem label="Коллектор" value={data.author?.displayName} />
        <SingleItem
          label="Дата сбора"
          value={data.date?.toLocaleDateString("ru")}
        />
        <SingleItem label="Место сбора" value={data.location} />
      </InfoTable>
    </div>
  );
}
