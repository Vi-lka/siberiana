import { Skeleton } from '@siberiana/ui'
import React from 'react'

export default function HomeSliderSkeleton() {
  return (
    <div
      className="home-slider w-full h-fit"
    >
      <div             
        className="w-full h-[35vh] sm:h-[40vh] lg:h-[45vh] xl:h-[50vh] 2xl:h-[55vh]"
      > 
        <Skeleton className="w-full h-full" />
      </div> 
    </div>
  )
}
