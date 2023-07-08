import { Skeleton } from '@siberiana/ui'
import React from 'react'

export default function RowBlockSkeleton() {
  return (
    <div className="max-w-[1600px] w-[85%] mx-auto mt-16 mb-24">
        <div className="flex justify-between items-center mb-10">
            <Skeleton className="h-full py-4 md:w-[40%] w-[65%]" />
            <Skeleton className="h-full py-4 w-[20%]" />
        </div>

        <div className="grid gap-5 md:grid-cols-4 grid-cols-1">
            <Skeleton className="w-full aspect-square px-8 py-6" />
            <Skeleton className="w-full aspect-square px-8 py-6" />
            <Skeleton className="w-full aspect-square px-8 py-6" />
            <Skeleton className="w-full aspect-square px-8 py-6" />
        </div>
    </div>
  )
}
