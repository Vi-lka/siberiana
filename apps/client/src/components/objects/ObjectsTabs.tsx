"use client"

import type { DictionaryType } from '@siberiana/schemas'
import { Skeleton, Tabs, TabsList, TabsTrigger } from '@siberiana/ui'
import React from 'react'
import { useAtomValue, useAtom } from 'jotai'
import { PAPCountAtom, artifactsCountAtom, booksCountAtom, tabObjectsAtom } from '~/lib/utils/atoms'
import { ClientHydration } from '../providers/ClientHydration'

export default function ObjectTabs({
    dict,
    children
}: {
    dict: DictionaryType,
    children: React.ReactNode
}) {
    const artifactsCount = useAtomValue(artifactsCountAtom)
    const booksCount = useAtomValue(booksCountAtom)
    const PAPCount = useAtomValue(PAPCountAtom)

    const [tabObject, setTabObject] = useAtom(tabObjectsAtom)

    const tabs = [
        { value: "artifacts", title: dict.objects.artifacts, count: artifactsCount },
        { value: "books", title: dict.objects.books, count: booksCount },
        { value: "protected_area_pictures", title: dict.objects.protectedAreaPictures, count: PAPCount }
    ]

    const notEmptyTabs = tabs.filter(function(el) {
        if (el.count === 0) {
          return false; // skip empty
        }
        return true;
    })

    React.useEffect(() => {
        const allCounts = [artifactsCount, booksCount, PAPCount]
        const maxCount = Math.max(...allCounts)
        
        switch (maxCount) {
            case artifactsCount:
                setTabObject("artifacts")
                break;
            case booksCount:
                setTabObject("books")
                break;
            case PAPCount:
                setTabObject("protected_area_pictures")
                break;
            default:
                break;
        }
    }, [PAPCount, artifactsCount, booksCount, setTabObject])
    
    function isSingleTab() {
        return (notEmptyTabs.length === 1) ? true : false;
    }

    return (
        <div className='w-full flex flex-col'>
            <Tabs
                className="w-full"
                value={tabObject}
                onValueChange={(value: string) => setTabObject(value)}
            >
                <ClientHydration fallback={
                  <Skeleton className='w-56 h-10' />
                }>
                    <div className="flex gap-3 items-center flex-wrap">
                        {notEmptyTabs.length > 0 
                            ? (
                                <TabsList className="flex-wrap h-fit" >
                                    {notEmptyTabs.map((tab, index) => (
                                        <TabsTrigger 
                                            key={index} 
                                            value={tab.value} 
                                            className={isSingleTab() ? "cursor-default" : ""}
                                        >
                                            {tab.title} {tab.count}
                                        </TabsTrigger> 
                                    ))}
                                </TabsList>
                            )
                            : null 
                        }
                    </div>
                </ClientHydration>
                {children}
            </Tabs>
        </div>
    )
}
