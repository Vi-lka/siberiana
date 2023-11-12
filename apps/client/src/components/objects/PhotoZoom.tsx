"use client";

import React from "react";
import Image from "next/image";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";

import { Dialog, DialogContent, DialogTrigger } from "@siberiana/ui";

export default function PhotoZoom({ alt, src }: { alt: string; src: string }) {
  const [image, setImage] = React.useState("/images/image-placeholder.png");

  React.useEffect(() => {
    if (!!src) {
      setImage(src);
    } else {
      setImage("/images/image-placeholder.png");
    }
  }, [src]);

  return (
    <Dialog>
      <DialogTrigger className="max-h-fit w-full">
        <Image
          src={image}
          onError={() => setImage("/images/image-placeholder.png")}
          priority={true}
          width={650}
          height={650}
          className="mx-auto max-h-[70vh] w-auto overflow-hidden rounded-md object-contain"
          alt={alt}
        />
      </DialogTrigger>
      <DialogContent className="bg-accent h-[90vh] max-w-[95vw] overflow-hidden p-0 sm:max-w-[95vw]">
        <TransformWrapper>
          <TransformComponent
            contentStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "90vh",
              width: "95vw",
            }}
          >
            <div className="relative h-full w-full">
              <Image
                src={image}
                onError={() => setImage("/images/image-placeholder.png")}
                fill
                sizes="150vw"
                quality={100}
                className="object-contain"
                alt={alt}
              />
            </div>
          </TransformComponent>
        </TransformWrapper>
      </DialogContent>
    </Dialog>
  );
}
