import { Skeleton } from '@siberiana/ui'
import React from 'react'

export default function QuizSkeleton() {
  return (
    <div className='hidden md:grid grid-cols-2 gap-6 justify-center'>
      <div className='relative max-w-[800px] w-full 2xl:h-[350px] h-[300px] rounded-md overflow-hidden'>
        <Skeleton className="w-full h-full" />
      </div>

      <div className="flex flex-col justify-between">
        <div>
            <Skeleton className="w-full h-8 mb-6" />
            <Skeleton className="w-full xl:h-34 h-24" />
        </div>

        <div className='grid grid-cols-2 gap-6'>
          <Skeleton className="w-full h-full px-8 py-6" />
          <Skeleton className="w-full h-full px-8 py-6" />
          <Skeleton className="w-full h-full px-8 py-6" />
          <Skeleton className="w-full h-full px-8 py-6" />
        </div>

      </div>
            
    </div>
  )
}
