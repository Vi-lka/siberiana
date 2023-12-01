"use client";

import React from "react";
import Image from "next/image";

export default function Member({
  title,
  description,
  src,
}: {
  title: string;
  description: string;
  src?: string;
}) {
  const [image, setImage] = React.useState("/images/image-placeholder.png");

  React.useEffect(() => {
    if (src) {
      setImage(src);
    } else {
      setImage("/images/image-placeholder.png");
    }
  }, [src]);

  return (
    <div className="flex h-fit flex-col gap-3">
      <div className="relative flex aspect-square w-full overflow-hidden rounded-md">
        <Image
          src={image}
          fill
          sizes="(max-width: 1280px) 85vw, 40vw"
          onError={() => setImage("/images/image-placeholder.png")}
          priority={true}
          className="aspect-square w-full object-cover"
          alt={title}
        />
      </div>
      <div className="flex flex-col gap-1">
        <h1 className="text-base font-bold uppercase lg:text-lg">{title}</h1>
        <p className="font-Inter text-xs">{description}</p>
      </div>
    </div>
  );
}
