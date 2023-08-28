"use client"

import React from 'react'
import ButtonComponent from './ButtonComponent'
import type { PaginationDictType } from '@siberiana/schemas'
import { Button, Input } from '@siberiana/ui'
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@siberiana/ui/src/lib/utils'

export default function PaginationControls({ 
    dict, 
    length,
    defaultPageSize,
    pageParam,
    perParam,
    className,
    classNameMore
}: { 
    dict: PaginationDictType,
    length: number,
    defaultPageSize: number,
    pageParam?: string,
    perParam?: string,
    className?: string,
    classNameMore?: string
}) {

  const [isPendingMore, startTransitionMore] = React.useTransition()
  const [isPendingPage, startTransitionPage] = React.useTransition()

  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const pageP = pageParam ?? 'page'
  const perP = perParam ?? 'per'

  const page = searchParams.get(pageP) ?? '1'
  const per = searchParams.get(perP) ?? defaultPageSize

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
        params.set(pageP, value);
        startTransitionPage(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      } else {
        params.delete(pageP);
      }
    },
    [pageP, pathname, router],
  );

  const handlePageSizeParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set(perP, value);
        startTransitionMore(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        params.delete(perP);
      }
    },
    [perP, pathname, router],
  );

  console.log(pageInput)

  return (
    <div className={cn(
      'flex xl:gap-0 gap-12 xl:items-start items-center xl:flex-row flex-col xl:justify-end relative',
      className
    )}>
      {Number(pageInput) === 1 
        ? (
          <ButtonComponent 
            className={cn(
              "px-10 py-6 uppercase xl:absolute xl:left-1/2 xl:-translate-x-1/2",
              classNameMore
            )}
            variant={(Number(page) >= max_page) ? "hidden" : "default"}
            disabled={isPendingPage || isPendingMore}
            onClick={() => handlePageSizeParams((Number(per) + defaultPageSize).toString())}
          >
            <span className="sr-only">{dict.showMore}</span>
            {isPendingMore ? <Loader2 className='animate-spin' /> : dict.showMore}
          </ButtonComponent>
        )
        : null
      }

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
                  <Link href={`${pathname}/?${pageP}=1&${perP}=${per}`} className="hidden">{dict.firstPage}</Link>
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
                  <Link href={`${pathname}/?${pageP}=${Number(page) - 1}&${perP}=${per}`} className="hidden">{dict.previousPage}</Link>
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
                  <Link href={`${pathname}/?${pageP}=${Number(page) + 1}&${perP}=${per}`} className='hidden'>{dict.nextPage}</Link>
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
                  <Link href={`${pathname}/?${pageP}=${max_page}&${perP}=${per}`} className='hidden'>{dict.lastPage}</Link>
                  <span className="sr-only">{dict.lastPage}</span>
                  <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    </div>
  )
}
