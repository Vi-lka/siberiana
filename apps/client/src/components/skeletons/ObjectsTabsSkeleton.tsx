import { Skeleton } from '@siberiana/ui'
import React from 'react'
import MasonrySkeleton from './MasonrySkeleton'

export default function ObjectsTabsSkeleton() {
  return (
    <div className="w-full mt-6">
        <Skeleton className='w-56 h-10' />

        <div className="w-full relative md:pt-8 pt-0">
            <div className="md:absolute right-0 top-0 flex gap-6 items-center md:justify-end justify-between md:mt-2 mt-4">
                <Skeleton className='w-10 h-10 md:hidden block' />
                <Skeleton className='w-36 h-10' />
            </div>

            <div className="flex gap-6 w-full justify-between mb-12">
                <div className="w-1/4 md:block hidden">
                    <Skeleton className='w-full h-full' />
                </div>
                <div className='md:w-3/4 w-full'>
                    <MasonrySkeleton />
                </div>
            </div>
        </div>
    </div>
  )
}
