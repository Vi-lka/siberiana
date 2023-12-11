import React from "react";
import Link from "next/link";

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import ImageComponent from "./ImageComponent";

type Props = {
  title: string;
  url: string;
  src: string | undefined;
  target?: string;
  width?: number;
  height?: number;
  className?: string;
} & (TrueShowIconProps | FalseShowIconProps);

type TrueShowIconProps = {
  showIcon?: true;
  children: React.ReactNode;
  tooltip: string;
};

type FalseShowIconProps = {
  showIcon?: false;
};

export default function ImgTextOn(props: Props) {
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
        <ImageComponent
          src={props.src}
          fill={false}
          width={props.width ? props.width : 400}
          height={props.height ? props.height : 400}
          className={"w-full object-cover"}
          alt={props.title}
        />
        {props.showIcon ? (
          <TooltipProvider>
            <Tooltip delayDuration={300}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="bg-accent text-foreground absolute right-3 top-3 z-10 h-[44px] w-[44px] cursor-help rounded-full p-3 lg:right-6 lg:top-6 lg:h-[52px] lg:w-[52px]"
                >
                  {props.children}
                </Button>
              </TooltipTrigger>
              <TooltipContent
                side="left"
                className="bg-accent text-foreground font-OpenSans cursor-help"
              >
                <p>{props.tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
        <div className="absolute bottom-0 h-full w-full bg-black bg-opacity-25" />
        <h2 className="absolute bottom-0 z-10 mb-2 ml-2 w-[85%] p-1 text-base font-bold uppercase text-white md:text-xs lg:mb-4 lg:ml-4 lg:p-4 lg:text-base xl:text-xl 2xl:mb-4 2xl:ml-4">
          {props.title}
        </h2>
      </div>
    </Link>
  );
}
