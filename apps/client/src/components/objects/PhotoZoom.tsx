"use client"

import React from 'react'
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from '@siberiana/ui';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function PhotoZoom({
    alt,
    src,
}: {
    alt: string,
    src: string,
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
    <Dialog>
        <DialogTrigger className='w-full max-h-fit'>
            <Image
                src={image}
                onError={() => setImage("/images/image-placeholder.png")}
                priority={true}
                width={650}
                height={650}
                className='object-contain max-h-[70vh] mx-auto w-auto rounded-md overflow-hidden'
                alt={alt}
            />
        </DialogTrigger>
        <DialogContent className='sm:max-w-[95vw] max-w-[95vw] h-[90vh] p-0 bg-accent overflow-hidden'>
            <TransformWrapper>
                <TransformComponent
                    contentStyle={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '90vh',
                        width: '95vw',
                    }}
                >
                    <div className="relative w-full h-full">
                        <Image
                            src={image}
                            onError={() => setImage("/images/image-placeholder.png")}
                            fill
                            sizes="150vw"
                            quality={100}
                            className='object-contain'
                            alt={alt}
                        />
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </DialogContent>
    </Dialog>
  )
}
