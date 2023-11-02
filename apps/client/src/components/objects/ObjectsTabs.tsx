"use client"

import type { Dictionary } from '@siberiana/schemas'
import { Skeleton, Tabs, TabsList, TabsTrigger } from '@siberiana/ui'
import React from 'react'
import { useAtomValue, useAtom } from 'jotai'
import { PAPCountAtom, artifactsCountAtom, booksCountAtom, tabObjectsAtom } from '~/lib/utils/atoms'
import { ClientHydration } from '../providers/ClientHydration'
import { cn } from '@siberiana/ui/src/lib/utils'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function ObjectTabs({
    dict,
    children
}: {
    dict: Dictionary,
    children: React.ReactNode
}) {
    const artifactsCount = useAtomValue(artifactsCountAtom)
    const booksCount = useAtomValue(booksCountAtom)
    const PAPCount = useAtomValue(PAPCountAtom)

    const [tabObject, setTabObject] = useAtom(tabObjectsAtom)

    const [_, startTransition] = React.useTransition();

    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()

    const type =  searchParams.get("type") ?? undefined

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

    const handleChangeTab = React.useCallback(
        (value: string) => {
            setTabObject(value)
            const params = new URLSearchParams(window.location.search);
            params.set("type", value);
            startTransition(() => {
                router.push(`${pathname}?${params.toString()}`, { scroll: false });
            });
        },
        [pathname, router, setTabObject],
    )

    const goToFilledTab = React.useCallback(
        () => {
            if (artifactsCount > 0) handleChangeTab("artifacts")
            else if (booksCount > 0) handleChangeTab("books")
            else if (PAPCount > 0) handleChangeTab("protected_area_pictures")
        },
        [PAPCount, artifactsCount, booksCount, handleChangeTab],
    )

    React.useEffect(() => {
        switch (type) {
            case "artifacts":
                (artifactsCount > 0) ? handleChangeTab("artifacts") : goToFilledTab()
                break;
            case "books":
                (booksCount > 0) ? handleChangeTab("books") : goToFilledTab()
                break;
            case "protected_area_pictures":
                (PAPCount > 0) ? handleChangeTab("protected_area_pictures") : goToFilledTab()
                break;
            default:
                goToFilledTab()
                break;
        }
    }, [PAPCount, artifactsCount, booksCount, goToFilledTab, handleChangeTab, type])
    
    function isSingleTab() {
        return (notEmptyTabs.length === 1) ? true : false;
    }

    return (
        <div className='w-full flex flex-col'>
            <Tabs
                className="w-full"
                value={tabObject}
                onValueChange={(value: string) => handleChangeTab(value)}
            >
                <ClientHydration fallback={
                  <Skeleton className='w-full h-10 mt-2' />
                }>
                    <div className="flex gap-3 items-center flex-wrap mt-2 lg:mr-40">
                        {notEmptyTabs.length > 0 
                            ? (
                                <TabsList
                                    className={cn(
                                        "flex-wrap h-fit font-OpenSans",
                                        isSingleTab() && "bg-transparent" 
                                    )}
                                >
                                    {notEmptyTabs.map((tab, index) => (
                                        <TabsTrigger 
                                            key={index} 
                                            value={tab.value} 
                                            className={isSingleTab() 
                                                ? "cursor-default" 
                                                : ""
                                            }
                                        >
                                            {isSingleTab() 
                                                ? <p key={Math.random()}>{dict.objects.count}: {tab.count}</p>
                                                : <p>{tab.title} <sup>{tab.count}</sup></p>
                                            }
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
