"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@siberiana/ui/src/lib/utils";

import type { UrlOrigins } from "~/lib/utils/getURL";
import getURL from "~/lib/utils/getURL";

type Props = {
  title: string | null;
  children?: React.ReactNode;
  url: string;
  target?: string;
  src?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  origin?: UrlOrigins;
  className?: string;
}

export default function ImgTextBelow(props: Props) {
  const [image, setImage] = React.useState(
    props.src
      ? getURL(props.src, props.origin)
      : "/images/image-placeholder.png",
  );

  return (
    <div className="flex flex-col gap-3 h-fit">
        <Link
          href={props.url}
          target={props.target}
          className={cn(
            "bg-beaverLight ring-ring ring-offset-background flex min-h-full w-full overflow-hidden rounded-md transition-all duration-200 hover:-translate-y-2 hover:scale-[1.04] hover:ring-4 hover:ring-offset-2",
            props.className,
          )}
        >
          <div className="relative flex w-full">
            <Image
              src={image}
              width={props.width ? props.width : 320}
              height={props.height ? props.height : 320}
              fill={props.fill}
              onError={() => setImage("/images/image-placeholder.png")}
              priority={true}
              className={"w-full object-cover"}
              alt={props.title ? props.title : ""}
            />
            <div className="absolute bottom-0 h-full w-full bg-black bg-opacity-10" />
          </div>
        </Link>
        
        {props.children}
    </div>
  );
}
