"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@siberiana/ui/src/lib/utils";

type Props = {
  title: string | null;
  children?: React.ReactNode;
  href: string;
  target?: string;
  src?: string;
  width?: number;
  height?: number;
  className?: string;
  classNameImage?: string;
};

export default function ImgTextBelow(props: Props) {
  const [image, setImage] = React.useState("/images/image-placeholder.png");
  const [isPlaceholder, setIsPlaceholder] = React.useState(true);

  React.useEffect(() => {
    if (props.src) {
      setImage(props.src);
    } else {
      setImage("/images/image-placeholder.png");
    }
  }, [props.src]);

  React.useEffect(() => {
    if (image === "/images/image-placeholder.png") {
      setIsPlaceholder(true);
    } else {
      setIsPlaceholder(false);
    }
  }, [image]);

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
          <Image
            src={image}
            width={props.width ? props.width : 320}
            height={props.height ? props.height : 320}
            onError={() => setImage("/images/image-placeholder.png")}
            className={
              props.classNameImage && !isPlaceholder
                ? props.classNameImage
                : "w-full object-cover"
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
