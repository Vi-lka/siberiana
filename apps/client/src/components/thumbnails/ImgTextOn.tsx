"use client"

import Link from 'next/link'
import Image from "next/image"
import React from 'react'
import type { UrlOrigins } from '~/lib/utils/getURL';
import getURL from '~/lib/utils/getURL';
import { useLocale } from '~/lib/utils/useLocale';
import { cn } from '@siberiana/ui/src/lib/utils';

type Props = {
  title: string,
  url: string,
  src?: string,
  width?: number,
  height?: number,
  fill?: boolean,
  origin?: UrlOrigins,
  className?: string,
}

export default function ImgTextOn(props: Props) {

    const [image, setImage] = React.useState(props.src ? getURL(props.src, props.origin) : '/images/image-placeholder.png');

    const locale = useLocale()

  return (
    <Link 
      href={`${locale}${props.url}`}
      className={cn(
        "flex w-full min-h-full rounded-md bg-beaverLight ring-ring ring-offset-background hover:ring-4 hover:ring-offset-2 hover:scale-105 transition-all duration-200 overflow-hidden",
        props.className,
      )}
    >
      <div className={"relative flex w-full"}>
        <Image
            src={image}
            width={props.width ? props.width : 350}
            height={props.height ? props.height : 350}
            fill={props.fill}
            onError={() => setImage('/images/image-placeholder.png')}
            priority={true}
            className={"w-full object-cover"}
            alt={props.title}
        />
        <div className="absolute bottom-0 w-full h-full bg-black bg-opacity-20"/>
        <h2 className="text-white xl:text-xl lg:text-base md:text-sm font-bold uppercase absolute bottom-0 w-[85%] lg:ml-[7.5%] ml-[4%] mb-[7.5%] p-[5%] z-10">
          {props.title}
        </h2>
      </div>
    </Link>
  )
}
