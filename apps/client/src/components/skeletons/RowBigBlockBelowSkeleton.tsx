import { Skeleton } from '@siberiana/ui'
import React from 'react'

export default function RowBigBlockBelowSkeleton() {
  return (
    <div className="md:w-full w-[85%] mx-auto grid md:grid-cols-2 grid-cols-1 gap-7">
      <div className="flex flex-col gap-3 h-fit aspect-[2.04/1] w-full">
          <Skeleton className="aspect-[2.04/1] w-full px-8 py-6" />
          <Skeleton className="w-full py-10" />
      </div>
      <div className="flex flex-col gap-3 h-fit aspect-[2.04/1] w-full">
          <Skeleton className="aspect-[2.04/1] w-full px-8 py-6" />
          <Skeleton className="w-full py-10" />
      </div>
      <div className="flex flex-col gap-3 h-fit aspect-[2.04/1] w-full">
          <Skeleton className="aspect-[2.04/1] w-full px-8 py-6" />
          <Skeleton className="w-full py-10" />
      </div>
      <div className="flex flex-col gap-3 h-fit aspect-[2.04/1] w-full">
          <Skeleton className="aspect-[2.04/1] w-full px-8 py-6" />
          <Skeleton className="w-full py-10" />
      </div>
    </div>
  )
}
