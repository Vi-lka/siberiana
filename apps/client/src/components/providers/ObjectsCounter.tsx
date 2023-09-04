"use client"
import React from 'react'
import { useSetAtom } from 'jotai'
import { PAPCountAtom, artifactsCountAtom, booksCountAtom } from '~/lib/utils/atoms'

export default function ObjectsCounter({ 
    artifactsCount,
    booksCount,
    PAPCount
}: { 
    artifactsCount?: number,
    booksCount?: number,
    PAPCount?: number
}) {
    const setArtifactsCount = useSetAtom(artifactsCountAtom)
    const setBooksCount = useSetAtom(booksCountAtom)
    const setPAPCount = useSetAtom(PAPCountAtom)
    
    React.useEffect(() => {
        if (artifactsCount !== undefined) {
            setArtifactsCount(artifactsCount)
        }
    }, [artifactsCount, setArtifactsCount])

    React.useEffect(() => {
        if (booksCount !== undefined) {
            setBooksCount(booksCount)
        }
    }, [booksCount, setBooksCount])

    React.useEffect(() => {
        if (PAPCount !== undefined) {
            setPAPCount(PAPCount)
        }
    }, [PAPCount, setPAPCount])

  return null
}
