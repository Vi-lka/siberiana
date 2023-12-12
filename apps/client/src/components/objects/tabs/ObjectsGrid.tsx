"use client";

import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import type { CollectionsEnum, ObjectsArray } from "@siberiana/schemas";

import ImgObject from "~/components/thumbnails/ImgObject";
import { useAtomValue } from "jotai";
import { tabObjectsAtom } from "~/lib/utils/atoms";

export default function ObjectsGrid({
  data,
  hrefTo,
  type
}: {
  data: ObjectsArray;
  hrefTo: string;
  type: CollectionsEnum;
}) {
  const tab = useAtomValue(tabObjectsAtom);

  if (type !== tab) return null // prevent images preload

  return (
    <ResponsiveMasonry
      key={Math.random()}
      columnsCountBreakPoints={{
        270: 1,
        400: 2,
        900: 3,
        1200: 4,
        2000: 5,
        2800: 6,
      }}
      className="mt-6"
    >
      <Masonry gutter={"1.5rem"} className="max-[400px]:items-center">
        {data.edges.map((object, index) => (
          <ImgObject
            key={index}
            className={"h-fit w-full"}
            title={object.node.displayName}
            src={object.node.primaryImageURL}
            href={`objects/${hrefTo}/${object.node.id}`}
            width={320}
            height={320}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}
