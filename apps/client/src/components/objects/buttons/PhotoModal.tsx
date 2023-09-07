"use client"

import { Dialog, DialogContent, DialogTrigger } from '@siberiana/ui/src/dialog'
import { ArrowLeft, ArrowRight, Maximize } from 'lucide-react'
import React from 'react'
import { Skeleton } from '@siberiana/ui'
import { useKeenSlider } from 'keen-slider/react'
import { cn } from '@siberiana/ui/src/lib/utils'
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import Image from "next/image";

export default function PhotoModal({ 
  data,
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
    drag: false,
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

  return (
    <Dialog onOpenChange={() => setCurrentSlide(0)}>
      <DialogTrigger>
        <Maximize className="w-6 h-6 cursor-pointer hover:scale-125 transition-all" />
      </DialogTrigger>
      <DialogContent className='relative sm:max-w-[95vw] max-w-[95vw] h-[90vh] p-0 bg-accent overflow-hidden'>
        <div ref={sliderRef} className="keen-slider cursor-grab h-full w-full rounded-md bg-accent">
          {data.map((image, index) => (
            <div
              key={index}
              className="keen-slider__slide zoom-out__slide"
              onClick={(e) => e.stopPropagation()}
            >
              {created 
                ? (
                  <TransformWrapper>
                    <TransformComponent
                        contentStyle={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90vh',
                            width: '95vw',
                        }}
                    >
                        <div className="relative w-full h-full">
                            <Image
                                src={image.src}
                                fill
                                sizes="100vw"
                                quality={100}
                                className='object-contain'
                                alt={image.alt}
                            />
                        </div>
                    </TransformComponent>
                  </TransformWrapper>
                ) : (
                  <Skeleton className="h-full w-full" />
                )
              }
            </div>
          ))}
        </div>
        {(created && !!instanceRef.current) 
          ? (data.length > 1 
              ? (<>
                  <div className="flex items-center gap-6 w-full h-fit absolute bottom-0 bg-graphite bg-opacity-20">
                    <div className="flex gap-2 flex-auto">
                      {data.map((_, index) =>  (
                        <button
                          key={index}
                          onClick={() => instanceRef.current?.moveToIdx(index) }
                          className="flex-auto py-2 mx-1"
                        >
                          <div 
                            className={cn(
                              "h-0.5 w-full transition-all",
                              currentSlide === index ? "bg-input" : "bg-background"
                            )} 
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                  <ArrowLeft 
                    className="w-8 h-8 text-input bg-accent bg-opacity-20 rounded-md cursor-pointer hover:scale-125 transition-all absolute md:top-1/2 md:translate-y-1/2 bottom-6 left-2"
                    onClick={() => instanceRef.current?.prev() } 
                  />
                  <ArrowRight 
                    className="w-8 h-8 text-input bg-accent bg-opacity-20 rounded-md cursor-pointer hover:scale-125 transition-all absolute md:top-1/2 md:translate-y-1/2 bottom-6 right-2" 
                    onClick={() => instanceRef.current?.next() } 
                  />
                </>)
              : null
            )
          : <Skeleton className="h-3 w-full mt-6" />
        }
      </DialogContent>
    </Dialog>
  )
}
