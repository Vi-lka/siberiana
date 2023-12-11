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
  classNameImage?: string;
  children?: React.ReactNode;
};

export default function ImgTextBelow(props: Props) {
  return (
    <div className="flex h-fit flex-col gap-3">
      <Link
        href={props.href}
        target={props.target}
        className={cn(
          "bg-background ring-ring ring-offset-background flex min-h-full w-full overflow-hidden rounded-md transition-all duration-200 hover:-translate-y-2 hover:scale-[1.03] hover:ring-4 hover:ring-offset-2",
          props.className,
        )}
      >
        <div className="relative flex w-full">
          <ImageComponent
            src={props.src}
            fill={false}
            width={props.width ? props.width : 400}
            height={props.height ? props.height : 400}
            className={
              props.classNameImage
                ? props.classNameImage
                : "w-full object-contain"
            }
            alt={props.title ? props.title : ""}
          />
          {/* <div className="absolute bottom-0 h-full w-full bg-black bg-opacity-10" /> */}
        </div>
      </Link>

      {props.children}
    </div>
  );
}
