"use client"

import "keen-slider/keen-slider.min.css";

import React from 'react'
import { useKeenSlider } from "keen-slider/react";
import { Skeleton } from "@siberiana/ui";
import PhotoSliderImg from './PhotoSliderImg';
import { cn } from "@siberiana/ui/src/lib/utils";

export default function PhotoSlider({ 
    data 
}: { 
    data: { 
        src: string,
        alt: string,
    }[] 
}) {
    const [created, setCreated] = React.useState<boolean>();
    const [currentSlide, setCurrentSlide] = React.useState(0)

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
      loop: true,
      renderMode: "performance",
      initial: 0,
      slides: {
        origin: "center",
        spacing: typeof window !== "undefined" && window.innerWidth <= 740 ? 3 : 6,
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
      created() {
        setCreated(true);
      },
      destroyed() {
        setCreated(false);
      },
    });

    console.log(currentSlide)

  return (
    <div className="">
      <div ref={sliderRef} className="keen-slider cursor-grab max-h-96 md:aspect-video aspect-square rounded-md bg-accent">
          {data.map((image, index) => (
              <div
                key={index}
                className="keen-slider__slide zoom-out__slide"
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
      {(created && !!instanceRef.current && data.length > 1) 
        ? (
          <div className="flex items-center gap-3 mt-2">
            <div className="flex gap-2 flex-auto">
              {data.map((_, index) =>  (
                  <button
                    key={index}
                    onClick={() => {
                      instanceRef.current?.moveToIdx(index)
                    }}
                    className="flex-auto py-4"
                  >
                    <div 
                      className={cn(
                        "h-0.5 w-full transition-all",
                        currentSlide === index ? "bg-input" : "bg-accent"
                      )} 
                    />
                  </button>
                )
              )}
            </div>
          </div>
        )
        : <Skeleton className="h-2 w-full mt-6" />
      }
    </div>
  )
}
