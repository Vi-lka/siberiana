"use client"

import type { DictionaryType, ObjectsArrayType } from '@siberiana/schemas'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@siberiana/ui'
import React from 'react'
import ObjectsGrid from './ObjectsGrid'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import PaginationControls from '~/components/ui/PaginationControls'
import { ClientHydration } from '~/components/providers/ClientHydration'
import MasonrySkeleton from '~/components/skeletons/MasonrySkeleton'

type Props = {
    artifacts: ObjectsArrayType,
    books: ObjectsArrayType,
    protectedAreaPictures: ObjectsArrayType,
    dict: DictionaryType,
    defaultPageSize: number
}

export default function ObjectTypeTabs({
    artifacts,
    books,
    protectedAreaPictures,
    dict,
    defaultPageSize
}: Props) {

    const [isPending, startTransition] = React.useTransition()
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const type = searchParams.get('type') ?? undefined
    
    const allData = [
        { data: artifacts, type: "artifacts", title: dict.objects.artifacts }, 
        { data: books, type: "books", title: dict.objects.books },
        { data: protectedAreaPictures, type: "protected_area_pictures", title: dict.objects.protectedAreaPictures },
    ]

    function getDefaultTab(type?: string): string {
        if (!!type) return type

        // If no type return whit max count
        const allCounts = allData.map(el => el.data.totalCount)
        const maxCount = Math.max(...allCounts)
        const indexOfMaxCount = allCounts.indexOf(maxCount)

        const defaultTab = allData[indexOfMaxCount].type

        return defaultTab
    }

    const notEmptyData = allData.filter(function(el) {
        if (el.data.totalCount === 0) {
          return false; // skip empty
        }
        return true;
    })
    
    const tabsTriggers = notEmptyData.map(el  => {
        const value = el.type
        const title = el.title
        const count = el.data.totalCount
        return { value, title, count }
    })

    const tabsContent = notEmptyData.map(el => {
        const value = el.type
        const content = el.data
        return { value, content }
    })

    const handleChangeTabs = React.useCallback(
        (value: string) => {
          const params = new URLSearchParams(window.location.search);
          if (value.length > 0) {
            params.set("type", value);
            startTransition(() => {
              router.push(`${pathname}?${params.toString()}`, { scroll: false });
            });
          } else {
            params.delete("type");
          }
        },
        [pathname, router],
    );


    return (
        <div className='w-full flex flex-col'>
            <Tabs
                className="w-full" 
                defaultValue={getDefaultTab(type)} 
                onValueChange={handleChangeTabs}
            >
                <div className="flex gap-3 items-center flex-wrap">
                    <TabsList className='flex-wrap h-fit'>
                        {tabsTriggers.map((triger, index) => (
                            <TabsTrigger key={index} value={triger.value}>
                                {triger.title} {triger.count}
                            </TabsTrigger> 
                        ))}
                    </TabsList>
                    {isPending ? <Loader2 className='animate-spin md:w-6 md:h-6 w-4 h-4 m-0' /> : null}
                </div>
                {tabsContent.map((tab, index) => (
                    <TabsContent key={index} value={tab.value}>
                        <div className='w-full'>
                            <ClientHydration fallback={
                                <MasonrySkeleton />
                            }>
                                <ObjectsGrid data={tab.content} />

                                <div className="mb-24 mt-6">
                                    <PaginationControls
                                        dict={dict.pagination}
                                        length={tab.content.totalCount}
                                        defaultPageSize={defaultPageSize}
                                        classNameMore='xl:left-[38%]'
                                        pageParam={"page_" + tab.value}
                                        perParam={"per_" + tab.value}
                                    />
                                </div>
                            </ClientHydration>
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    )
}
