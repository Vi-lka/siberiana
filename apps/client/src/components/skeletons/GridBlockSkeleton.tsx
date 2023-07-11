import { Skeleton } from '@siberiana/ui'
import React from 'react'

export default function GridBlockSkeleton() {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-4 md:grid-rows-2 grid-cols-1 grid-rows-5 gap-6 md:aspect-[4/2] aspect-auto">
        <Skeleton className="md:row-span-1 md:col-span-2 md:aspect-auto aspect-square row-span-1 col-span-1" />
        <Skeleton className="md:row-span-1 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1" />
        <Skeleton className="md:row-span-2 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1" />
        <Skeleton className="md:row-span-1 md:col-span-1 md:aspect-auto aspect-square row-span-1 col-span-1" />
        <Skeleton className="md:row-span-1 md:col-span-2 md:aspect-auto aspect-square row-span-1 col-span-1" />
    </div>
  )
}
