"use client";

import type { SimilarObject } from "@siberiana/schemas";

import ImgObject from "../thumbnails/ImgObject";

export default function SimilarObjects({ data }: { data: SimilarObject[] }) {
  return (
    <div className="flex flex-col gap-10 md:grid md:grid-cols-4 md:gap-4 xl:gap-10">
      {data.map((img) => (
        <ImgObject
          href={img.id}
          key={img.id}
          src={img.primaryImageURL}
          title={img.displayName}
        />
      ))}
    </div>
  );
}
