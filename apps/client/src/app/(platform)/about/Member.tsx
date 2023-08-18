"use client"

import React from 'react'
import Image from "next/image";
import getURL from '~/lib/utils/getURL';

export default function Member({
    title,
    description,
    src
}: {
    title: string,
    description: string,
    src?: string
}) {

    const [image, setImage] = React.useState("/images/image-placeholder.png");

    React.useEffect(() => {
        if (src) {
          setImage(getURL(src, "strapi"))
        } else {
          setImage("/images/image-placeholder.png")
        }
      }, [src])

  return (
    <div className="flex flex-col gap-3 h-fit">
        <div className="relative flex w-full aspect-square overflow-hidden rounded-md">
          <Image
            src={image}
            fill
            sizes="(max-width: 1280px) 45vw, 35vw"
            onError={() => setImage("/images/image-placeholder.png")}
            priority={true}
            className="w-full object-cover aspect-square"
            alt={title}
          />
        </div>
        <div className="flex flex-col gap-1">
            <h1 className="uppercase font-bold lg:text-lg text-base">
                {title}
            </h1>
            <p className="font-Inter text-xs">
                {description}
            </p>
        </div>
    </div>
  )
}
