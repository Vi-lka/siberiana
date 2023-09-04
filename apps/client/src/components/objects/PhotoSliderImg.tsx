"use client"

import React from 'react'
import Image from "next/image";
import { cn } from '@siberiana/ui/src/lib/utils';

export default function PhotoSliderImg({
    alt,
    src,
}: {
    alt: string,
    src?: string,
}) {

    const [image, setImage] = React.useState("/images/image-placeholder.png");

    React.useEffect(() => {
        if (!!src) {
            setImage(src)
        } else {
          setImage("/images/image-placeholder.png")
        }
    }, [src])

    return (
        <Image
            src={image}
            onError={() => setImage("/images/image-placeholder.png")}
            priority={true}
            fill
            sizes="(min-width: 768px) 40vw, 85vw"
            className={cn(
                "mx-auto",
                !!src ? "object-contain" : "object-cover"
            )}
            alt={alt}
        />
    )
}