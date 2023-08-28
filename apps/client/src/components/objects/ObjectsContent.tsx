"use client"

import { TabsContent } from '@siberiana/ui'
import { cn } from '@siberiana/ui/src/lib/utils'
import { useAtomValue } from 'jotai'
import React from 'react'
import { tabObjectsAtom } from '~/lib/utils/atoms'

export default function ObjectsContent({
    value,
    children
}: {
    value: string,
    children: React.ReactNode
}) {

  const tabObject = useAtomValue(tabObjectsAtom)

  return (
    <TabsContent 
      value={value} 
      forceMount 
      className={cn(
        "mt-0",
        tabObject === value ? "flex" : "hidden"
      )}
    >
        {children}
    </TabsContent>
  )
}
