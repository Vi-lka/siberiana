"use client";

import React from "react";

import "keen-slider/keen-slider.min.css";

import Image from "next/image";
import { useKeenSlider } from "keen-slider/react";

import type { Slider } from "@siberiana/schemas";
import { Skeleton } from "@siberiana/ui";

export default function HomeSlider({ data }: { data: Slider }) {
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
                src={image.attributes.url}
                className={"object-cover"}
                alt={
                  image.attributes.alternativeText
                    ? image.attributes.alternativeText
                    : ""
                }
                priority={true}
                fill
                sizes="(max-width: 500px) 80vw, 90vw"
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
