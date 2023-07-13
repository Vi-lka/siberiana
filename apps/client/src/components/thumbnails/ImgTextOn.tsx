"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@siberiana/ui/src/lib/utils";

import type { UrlOrigins } from "~/lib/utils/getURL";
import getURL from "~/lib/utils/getURL";

type Props = {
  title: string;
  url: string;
  src?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  origin?: UrlOrigins;
  className?: string;
};

export default function ImgTextOn(props: Props) {
  const [image, setImage] = React.useState(
    props.src
      ? getURL(props.src, props.origin)
      : "/images/image-placeholder.png",
  );

  return (
    <Link
      href={props.url}
      className={cn(
        "bg-beaverLight ring-ring ring-offset-background flex min-h-full w-full overflow-hidden rounded-md transition-all duration-200 hover:scale-105 hover:ring-4 hover:ring-offset-2",
        props.className,
      )}
    >
      <div className={"relative flex w-full"}>
        <Image
          src={image}
          width={props.width ? props.width : 320}
          height={props.height ? props.height : 320}
          fill={props.fill}
          onError={() => setImage("/images/image-placeholder.png")}
          priority={true}
          className={"w-full object-cover"}
          alt={props.title}
        />
        <div className="absolute bottom-0 h-full w-full bg-black bg-opacity-25" />
        <h2 className="absolute bottom-0 z-10 mb-[7.5%] ml-[4%] w-[85%] p-[5%] text-base font-bold uppercase text-white md:text-[12px] lg:ml-[7.5%] lg:text-base xl:text-xl">
          {props.title}
        </h2>
      </div>
    </Link>
  );
}
