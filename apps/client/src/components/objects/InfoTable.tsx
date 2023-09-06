"use client"

import { ScrollArea, Table, TableBody } from "@siberiana/ui"
import { cn } from "@siberiana/ui/src/lib/utils"
import { ChevronUp, ChevronDown } from "lucide-react"
import React from "react"


export default function InfoTable({ children }: { children: React.ReactNode }) {

    const [more, setMore] = React.useState(false)

    return (
        <>
            <ScrollArea type="hover" classNameViewport={cn(
                `transition-[max-height] duration-300 ease-in-out`,
                more ? "max-h-[100rem]" : "max-h-[300px]"
            )}>
                <Table className='font-Inter text-sm'>
                    <TableBody>
                        {children}
                    </TableBody>
                </Table>
            </ScrollArea>
            <div
                className="font-Inter text-sm text-beaver dark:text-beaverLight flex  items-center gap-1 uppercase cursor-pointer hover:underline"
                onClick={() => setMore(value => !value)}
            >
                {more 
                    ? (<>
                        <p>Свернуть</p>
                        <ChevronUp  className="stroke-1 h-6 w-6" />
                    </>)
                    : (<>
                        <p>Все метаданные</p>
                        <ChevronDown className="stroke-1 h-6 w-6" />
                    </>)
                }
            </div>
        </>
    )
}