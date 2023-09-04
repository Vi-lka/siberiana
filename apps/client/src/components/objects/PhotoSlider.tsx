"use client"

import React from 'react'

import "keen-slider/keen-slider.min.css";

import { useKeenSlider } from "keen-slider/react";

import { Skeleton } from "@siberiana/ui";
import PhotoSliderImg from './PhotoSliderImg';

export default function PhotoSlider({ 
    data 
}: { 
    data: { 
        src: string,
        alt: string,
    }[] 
}) {
    const [created, setCreated] = React.useState<boolean>();

    const [sliderRef] = useKeenSlider({
      loop: true,
      dragSpeed: 0.6,
      renderMode: "performance",
      mode: "free-snap",
      initial: 0,
      slides: {
        origin: "center",
        spacing: typeof window !== "undefined" && window.innerWidth <= 740 ? 3 : 6,
      },
      created() {
        setCreated(true);
      },
      destroyed() {
        setCreated(false);
      },
    });

  return (
    <div ref={sliderRef} className="keen-slider cursor-grab max-h-96 md:aspect-video aspect-square rounded-md bg-accent">
        {data.map((image, index) => (
            <div
              key={index}
              className="keen-slider__slide"
            >
                {created ? (
                    
                    <PhotoSliderImg
                      src={image.src}
                      alt={image.alt}
                    />
                ) : (
                    <Skeleton className="h-full w-full" />
                )}
            </div>
        ))}
    </div>
  )
}