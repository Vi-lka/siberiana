"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@siberiana/ui/src/lib/utils";
import type { UrlOrigins } from "~/lib/utils/getURL";
import getURL from "~/lib/utils/getURL";

type Props = {
  title: string | null;
  href: string;
  target?: string;
  src?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  origin?: UrlOrigins;
  className?: string;
}

export default function ImgObject(props: Props) {
  const [image, setImage] = React.useState("/images/image-placeholder.png");
  const [isPlaceholder, setIsPlaceholder] = React.useState(true);

  React.useEffect(() => {
    if (props.src) {
      setImage(getURL(props.src, props.origin))
    } else {
      setImage("/images/image-placeholder.png")
    }
  }, [props.origin, props.src])

  React.useEffect(() => {
    if (image === "/images/image-placeholder.png") {
      setIsPlaceholder(true)
    } else {
      setIsPlaceholder(false)
    }
  }, [image])

  return (
    <Link
      href={props.href}
      target={props.target}
      className={cn(
        "object break-inside-avoid bg-background flex w-full",
        props.className,
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <Image
          src={image}
          width={props.width ? props.width : 320}
          height={props.height ? props.height : 320}
          fill={props.fill}
          onError={() => setImage("/images/image-placeholder.png")}
          priority={true}
          className={cn(
            "w-full overflow-hidden rounded-md outline outline-offset-1 outline-1 outline-accent shadow-md ring-ring ring-offset-background transition-all duration-200",
            (!isPlaceholder) ? 
              "object-contain"
              : 
              "object-cover"
          )}
          alt={props.title ? props.title : ""}
        />

        <p className="lg:text-base text-sm font-Inter font-normal transition-all duration-200">
            {props.title}
        </p>
      </div>
    </Link>
  );
}
