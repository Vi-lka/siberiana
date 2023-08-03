import { Skeleton } from '@siberiana/ui'
import React from 'react'

export default function RowBigBlockSkeleton() {
  return (
    <div>
        <div className="mb-10 flex items-center justify-between">
          <Skeleton className="h-full w-[65%] py-5 md:w-[40%]" />
          <Skeleton className="h-full w-[20%] py-5" />
        </div>

        <div className="md:w-full w-[85%] mx-auto grid md:grid-cols-2 grid-cols-1 gap-7">
            <Skeleton className="md:aspect-[2/1] aspect-square w-full px-8 py-6" />
            <Skeleton className="md:aspect-[2/1] aspect-square w-full px-8 py-6" />
            <Skeleton className="md:aspect-[2/1] aspect-square w-full px-8 py-6" />
            <Skeleton className="md:aspect-[2/1] aspect-square w-full px-8 py-6" />
        </div>
    </div>
  )
}
