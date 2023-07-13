"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@siberiana/ui/src/lib/utils";

import type { UrlOrigins } from "~/lib/utils/getURL";
import getURL from "~/lib/utils/getURL";
import Icons from "../ui/IconsSwitch";
import { TooltipProvider, Tooltip, TooltipTrigger, Button, TooltipContent } from "@siberiana/ui";

type Props = {
  title: string;
  url: string;
  src?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  origin?: UrlOrigins;
  className?: string;
} & ({
  showIcon: true;
  icon: string;
  tooltip: string;
} | {
  showIcon: false;
})

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
        {props.showIcon && 
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="absolute z-10 lg:top-6 lg:right-6 top-3 right-3 lg:w-[52px] lg:h-[52px] w-[44px] h-[44px] p-3 bg-accent text-foreground rounded-full">
                  <Icons
                    icon={props.icon}
                    className="w-full h-full"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-accent text-foreground font-OpenSans">
                <p>{props.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        }
        <div className="absolute bottom-0 h-full w-full bg-black bg-opacity-25" />
        <h2 className="absolute bottom-0 z-10 2xl:mb-4 2xl:ml-4 lg:mb-4 lg:ml-4 mb-2 ml-2 lg:p-4 p-1 w-[85%] text-base font-bold uppercase text-white md:text-[12px] lg:text-base xl:text-xl">
          {props.title}
        </h2>
      </div>
    </Link>
  );
}
