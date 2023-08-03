"use client"

import React from 'react'
import ButtonComponent from './ButtonComponent'
import type { PaginationDictType } from '@siberiana/schemas'
import { Button } from '@siberiana/ui'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaginationControls({ 
    dict, 
    length,
    defaultPageSize,
    path,
    routerParams
}: { 
    dict: PaginationDictType,
    length: number,
    defaultPageSize: number,
    path: string,
    routerParams?: string
}) {

  const [isPendingMore, startTransitionMore] = React.useTransition()
  const [isPendingPage, startTransitionPage] = React.useTransition()

  const router = useRouter()
  const searchParams = useSearchParams()

  const page = searchParams.get('page') ?? '1'
  const per = searchParams.get('per') ?? defaultPageSize

  const max_page = Math.ceil(length / Number(per))

  console.log("max_page: ", max_page)
  console.log("length: ", length)
  console.log("per: ", per)

  const otherParams = routerParams ? `&${routerParams}` : ''

  return (
    <div className='flex lg:gap-0 gap-12 lg:items-start items-center lg:flex-row flex-col lg:justify-end relative'>
        <ButtonComponent 
          className="px-10 py-6 uppercase lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          variant={(Number(page) >= max_page) ? "hidden" : "default"}
          disabled={isPendingPage || isPendingMore}
          onClick={() => startTransitionMore(() => router.push(`/${path}/?page=${page}&per=${Number(per) + defaultPageSize}${otherParams}`, { scroll: false}))}
        >
          <span className="sr-only">{dict.showMore}</span>
          {isPendingMore ? <Loader2 className='animate-spin' /> : dict.showMore}
        </ButtonComponent>

        <div className='flex items-center lg:flex-row flex-col-reverse lg:gap-6 gap-3'>
            <p className='font-Inter'>
                {isPendingPage ? <Loader2 className='animate-spin' /> : `${dict.page} ${page} ${dict.of} ${max_page}`}
            </p>

            <div className="flex items-center space-x-2">
                {/* FIRST */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) <= 1) || isPendingPage || isPendingMore}
                  onClick={() => startTransitionPage(() => router.push(`/${path}/?page=1&per=${per}${otherParams}`))}
                >
                  {/* For SEO */}
                  <Link href={`/${path}/?page=1&per=${per}${otherParams}`} className="hidden">{dict.firstPage}</Link>
                  <span className="sr-only">{dict.firstPage}</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* PREVIOUS */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) <= 1) || isPendingPage || isPendingMore}
                  onClick={() => startTransitionPage(() => router.push(`/${path}/?page=${Number(page) - 1}&per=${per}${otherParams}`))}
                >
                  {/* For SEO */}
                  <Link href={`/${path}/?page=${Number(page) - 1}&per=${per}${otherParams}`} className="hidden">{dict.previousPage}</Link>
                  <span className="sr-only">{dict.previousPage}</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>

                {/* NEXT */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) >= max_page) || isPendingPage || isPendingMore}
                  onClick={() => startTransitionPage(() => router.push(`/${path}/?page=${Number(page) + 1}&per=${per}${otherParams}`))}
                >
                  {/* For SEO */}
                  <Link href={`/${path}/?page=${Number(page) + 1}&per=${per}${otherParams}`} className='hidden'>{dict.nextPage}</Link>
                  <span className="sr-only">{dict.nextPage}</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>

                {/* LAST */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) >= max_page) || isPendingPage || isPendingMore}
                  onClick={() => startTransitionPage(() => router.push(`/${path}/?page=${max_page}&per=${per}${otherParams}`))}
                >
                  {/* For SEO */}
                  <Link href={`/${path}/?page=${max_page}&per=${per}${otherParams}`} className='hidden'>{dict.lastPage}</Link>
                  <span className="sr-only">{dict.lastPage}</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
  )
}
