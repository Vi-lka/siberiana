"use client"

import { cn } from '@siberiana/ui/src/lib/utils'
import { ChevronDown, ChevronUp  } from 'lucide-react'
import React from 'react'
import getShortDescription from '~/lib/utils/getShortDescription'

export default function Description({ text }: { text: string }) {

    const [more, setMore] = React.useState(false)

    const maxLength = 30

    if (text.length <= 1) return null

    return (
        <>
            <p className={cn(
                `font-Inter md:text-base text-sm mt-3 overflow-hidden transition-[max-height] duration-300 ease-in-out`,
                more ? "max-h-[100rem]" : "max-h-40"
            )}>
                {more 
                    ? text 
                    : getShortDescription(text, maxLength)
                }
            </p>
            {text.split(" ").length > maxLength
                ? (
                    <div
                        className="font-Inter text-sm text-beaver dark:text-beaverLight flex items-center gap-1 uppercase cursor-pointer hover:underline"
                        onClick={() => setMore(value => !value)}
                    >
                        {more 
                            ? (<>
                                <p>Свернуть</p>
                                <ChevronUp  className="stroke-1 h-6 w-6" />
                            </>)
                            : (<>
                                <p>Читать далее</p>
                                <ChevronDown className="stroke-1 h-6 w-6" />
                            </>)
                        }
                    </div>
                )
                : null
            }
        </>
    )
}
