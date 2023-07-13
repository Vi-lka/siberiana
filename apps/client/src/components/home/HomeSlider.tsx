"use client";

import React from "react";

import "keen-slider/keen-slider.min.css";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

import type { SliderType } from "@siberiana/schemas";
import { Skeleton } from "@siberiana/ui";

import getImageURL from "~/lib/utils/getURL";

export default function HomeSlider({ data }: { data: SliderType }) {
  const [created, setCreated] = React.useState<boolean>();

  const [sliderRef] = useKeenSlider({
    loop: true,
    dragSpeed: 0.6,
    renderMode: "performance",
    mode: "free-snap",
    initial: 0,
    slides: {
      origin: "center",
      perView:
        typeof window !== "undefined" && window.innerWidth <= 500 ? 1.4 : 2.4,
      spacing:
        typeof window !== "undefined" && window.innerWidth <= 740 ? 10 : 24,
    },
    created() {
      setCreated(true);
    },
    destroyed() {
      setCreated(false);
    },
  });

  return (
    <>
      <div ref={sliderRef} className="keen-slider home-slider cursor-grab">
        {data.map((image, index) => (
          <div
            key={index}
            className="keen-slider__slide h-[40vh] lg:h-[45vh] xl:h-[50vh] 2xl:h-[55vh]"
          >
            {created ? (
              <Image
                src={getImageURL(image.attributes.url, "strapi")}
                fill
                className={"object-cover"}
                alt={
                  image.attributes.alternativeText
                    ? image.attributes.alternativeText
                    : ""
                }
                priority={true}
                sizes="(max-width: 500px) 65vw, 35vw"
              />
            ) : (
              <Skeleton className="h-full w-full" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
