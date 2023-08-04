"use client"

import React from 'react'
import ButtonComponent from './ButtonComponent'
import type { PaginationDictType } from '@siberiana/schemas'
import { Button, Input } from '@siberiana/ui'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function PaginationControls({ 
    dict, 
    length,
    defaultPageSize,
}: { 
    dict: PaginationDictType,
    length: number,
    defaultPageSize: number,
}) {

  const [isPendingMore, startTransitionMore] = React.useTransition()
  const [isPendingPage, startTransitionPage] = React.useTransition()

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const page = searchParams.get('page') ?? '1'
  const per = searchParams.get('per') ?? defaultPageSize

  const [pageInput, setPageInput] = React.useState(page)

  React.useEffect(() => {
    setPageInput(page)
  }, [page])
  
  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {

    if (Number(event.target.value) > max_page) {

      setPageInput(max_page.toString())
    
    } else if (!event.target.value) {

      setPageInput(event.target.value)

    } else if (Number(event.target.value) < 1) {
      
      setPageInput('1')
    
    } else setPageInput(event.target.value)
  }

  const max_page = Math.ceil(length / Number(per))

  const handlePageParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set("page", value);
        startTransitionPage(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      } else {
        params.delete("page");
      }
    },
    [pathname, router],
  );

  const handlePageSizeParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set("per", value);
        startTransitionMore(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        params.delete("per");
      }
    },
    [pathname, router],
  );

  return (
    <div className='flex lg:gap-0 gap-12 lg:items-start items-center lg:flex-row flex-col lg:justify-end relative'>
        <ButtonComponent 
          className="px-10 py-6 uppercase lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          variant={(Number(page) >= max_page) ? "hidden" : "default"}
          disabled={isPendingPage || isPendingMore}
          onClick={() => handlePageSizeParams((Number(per) + defaultPageSize).toString())}
        >
          <span className="sr-only">{dict.showMore}</span>
          {isPendingMore ? <Loader2 className='animate-spin' /> : dict.showMore}
        </ButtonComponent>

        <div className='flex items-center lg:flex-row flex-col-reverse lg:gap-6 gap-3' style={{ display: Number(per) >= length ? 'none' : 'flex'}}>

            <p className='font-Inter flex items-center'>
                {isPendingPage ? 
                  <Loader2 className='animate-spin' /> 
                  : 
                  (
                    <>
                      {dict.page}
                      <Input 
                        className='w-14 mx-2 font-Inter font-normal text-base'
                        type="number" 
                        value={pageInput} 
                        onChange={handleChangeInput}
                        onKeyDownCapture={event => {
                          if (event.key === 'Enter') {
                            handlePageParams(pageInput)
                          }
                        }}
                        onBlurCapture={() => handlePageParams(pageInput)}
                      />
                      {dict.of} {max_page}
                    </>
                  )}
            </p>

            <div className="flex items-center space-x-2">
                {/* FIRST */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) <= 1) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams('1')}
                >
                  {/* For SEO */}
                  <Link href={`${pathname}/?page=1&per=${per}`} className="hidden">{dict.firstPage}</Link>
                  <span className="sr-only">{dict.firstPage}</span>
                  <ChevronsLeft className="h-4 w-4" />
                </Button>

                {/* PREVIOUS */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) <= 1) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams((Number(page) - 1).toString())}
                >
                  {/* For SEO */}
                  <Link href={`${pathname}/?page=${Number(page) - 1}&per=${per}`} className="hidden">{dict.previousPage}</Link>
                  <span className="sr-only">{dict.previousPage}</span>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>

                {/* NEXT */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) >= max_page) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams((Number(page) + 1).toString())}
                >
                  {/* For SEO */}
                  <Link href={`${pathname}/?page=${Number(page) + 1}&per=${per}`} className='hidden'>{dict.nextPage}</Link>
                  <span className="sr-only">{dict.nextPage}</span>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>

                {/* LAST */}
                <Button
                  variant="outline"
                  className="h-10 w-10 p-0"
                  disabled={(Number(page) >= max_page) || isPendingPage || isPendingMore}
                  onClick={() => handlePageParams(max_page.toString())}
                >
                  {/* For SEO */}
                  <Link href={`${pathname}/?page=${max_page}&per=${per}`} className='hidden'>{dict.lastPage}</Link>
                  <span className="sr-only">{dict.lastPage}</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
  )
}
