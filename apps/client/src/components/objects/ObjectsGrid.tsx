"use client";

import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

import type { ObjectsArray } from "@siberiana/schemas";

import ImgObject from "~/components/thumbnails/ImgObject";

export default function ObjectsGrid({
  data,
  hrefTo,
}: {
  data: ObjectsArray;
  hrefTo: string;
}) {
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
