"use client"

import { cn } from '@siberiana/ui/src/lib/utils'
import { useAtomValue } from 'jotai'
import React from 'react'
import { tabObjectsAtom } from '~/lib/utils/atoms'

export default function FilterTab({
  value,
  children,
  className,
}: {
  value: string,
  children: React.ReactNode,
  className?: string,
}) {

  const tabObject = useAtomValue(tabObjectsAtom)

  return (
    <div
      className={cn(
        className,
        (tabObject !== value) && "hidden"
      )}
    >
      {children}
    </div>
  )
}
