"use client";

import React from "react";

import "keen-slider/keen-slider.min.css";

import { useKeenSlider } from "keen-slider/react";

import type { SliderType } from "@siberiana/schemas";

import ImageComponent from "../ui/ImageComponent";

export default function HomeSlider({ data }: { data: SliderType }) {
  const [created, setCreated] = React.useState<boolean>();

  const [sliderRef] = useKeenSlider({
    loop: true,
    dragSpeed: 0.6,
    renderMode: "performance",
    mode: "free-snap",
    initial: 1,
    slides: {
      origin: "center",
      perView: 2.4,
      spacing:
        typeof window !== "undefined" && window.innerWidth <= 740 ? 15 : 30,
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
      <div
        ref={sliderRef}
        className="keen-slider home-slider absolute cursor-grab"
      >
        {data.map((image, index) => (
          <div
            key={index}
            className="keen-slider__slide h-[35vh] sm:h-[40vh] lg:h-[45vh] xl:h-[50vh] 2xl:h-[55vh]"
          >
            {created ? (
              <ImageComponent
                src={image.attributes.url}
                alt={
                  image.attributes.alternativeText
                    ? image.attributes.alternativeText
                    : ""
                }
                fill
                className={"object-cover"}
              />
            ) : (
              <div className="from-muted/50 to-muted dark:bg-accent h-full w-full bg-gradient-to-b" />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
