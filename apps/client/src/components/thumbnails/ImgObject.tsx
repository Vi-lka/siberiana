import React from "react";
import Link from "next/link";

import { cn } from "@siberiana/ui/src/lib/utils";

import ImageComponent from "./ImageComponent";

type Props = {
  title: string | null;
  href: string;
  src: string | undefined;
  target?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function ImgObject(props: Props) {
  return (
    <Link
      href={props.href}
      target={props.target}
      className={cn(
        "object bg-background flex max-h-[35rem] w-full break-inside-avoid",
        props.className,
      )}
    >
      <div className="flex w-full flex-col gap-1">
        <ImageComponent
          src={props.src}
          fill={false}
          width={props.width ? props.width : 450}
          height={props.height ? props.height : 450}
          className="outline-accent ring-ring ring-offset-background w-full overflow-hidden rounded-md object-contain shadow-md outline outline-1 outline-offset-1 transition-all duration-200"
          alt={props.title ? props.title : ""}
          priority
        />

        <p className="font-Inter decoration-primary text-sm font-normal decoration-[3px] underline-offset-4 transition-all duration-200 dark:decoration-2 lg:text-base">
          {props.title}
        </p>
      </div>
    </Link>
  );
}
