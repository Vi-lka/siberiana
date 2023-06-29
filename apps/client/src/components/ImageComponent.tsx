import React from "react";
import Image from "next/image";

export default function ImageComponent({
  className,
  src,
  width,
  height,
  fill,
  alt,
}: {
  className?: string;
  src: string;
  width?: number;
  height?: number;
  fill?: boolean;
  alt: string;
}) {
  const imageLoader = ({
    src,
    width,
    quality,
  }: {
    src: string;
    width: number;
    quality?: number;
  }) => {
    return `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${src}?w=${width}&q=${
      quality || 75
    }`;
  };

  return (
    <Image
      className={className}
      loader={imageLoader}
      src={src}
      fill={fill}
      width={width}
      height={height}
      alt={alt}
    />
  );
}
