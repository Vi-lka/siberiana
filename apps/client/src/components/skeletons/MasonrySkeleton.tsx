import { Skeleton } from '@siberiana/ui'
import React from 'react'

export default function MasonrySkeleton() {
  return (
    <div className="
        w-full mx-auto mt-6 
        min-[2800px]:columns-6
        min-[2000px]:columns-5
        min-[1200px]:columns-4
        min-[900px]:columns-3
        min-[400px]:columns-2
        columns-1
        gap-6
    ">
      <Skeleton className="w-full aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>

      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>

      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>

      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>

      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-square"/>

      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-square"/>
      <Skeleton className="w-full mt-6 aspect-video"/>
    </div>
  )
}
