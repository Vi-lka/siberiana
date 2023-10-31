"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@siberiana/ui/src/lib/utils";
import { TooltipProvider, Tooltip, TooltipTrigger, Button, TooltipContent } from "@siberiana/ui";

type Props = {
  title: string;
  url: string;
  target?: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
} & (TrueShowIconProps | FalseShowIconProps)

type TrueShowIconProps = {
  showIcon?: true;
  children: React.ReactNode
  tooltip: string;
}

type FalseShowIconProps = {
  showIcon?: false;
}

export default function ImgTextOn(props: Props) {
  const [image, setImage] = React.useState("/images/image-placeholder.png");

  React.useEffect(() => {
    if (props.src) {
      setImage(props.src)
    } else {
      setImage("/images/image-placeholder.png")
    }
  }, [props.src])

  return (
    <Link
      href={props.url}
      target={props.target}
      className={cn(
        "bg-beaverLight ring-ring ring-offset-background flex min-h-full w-full overflow-hidden rounded-md transition-all duration-200 hover:-translate-y-2 hover:scale-[1.03] hover:ring-4 hover:ring-offset-2",
        props.className,
      )}
    >
      <div className="relative flex w-full">
        <Image
          src={image}
          width={props.width ? props.width : 400}
          height={props.height ? props.height : 400}
          onError={() => setImage("/images/image-placeholder.png")}
          className={"w-full object-cover"}
          alt={props.title}
        />
        {props.showIcon ? (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="absolute z-10 lg:top-6 lg:right-6 top-3 right-3 lg:w-[52px] lg:h-[52px] w-[44px] h-[44px] p-3 bg-accent text-foreground rounded-full cursor-help">
                  {props.children}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left" className="bg-accent text-foreground font-OpenSans cursor-help">
                <p>{props.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        <div className="absolute bottom-0 h-full w-full bg-black bg-opacity-25" />
        <h2 className="absolute bottom-0 z-10 2xl:mb-4 2xl:ml-4 lg:mb-4 lg:ml-4 mb-2 ml-2 lg:p-4 p-1 w-[85%] font-bold uppercase text-white xl:text-xl lg:text-base md:text-xs text-base">
          {props.title}
        </h2>
      </div>
    </Link>
  );
}
