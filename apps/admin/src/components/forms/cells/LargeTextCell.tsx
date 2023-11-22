import React from 'react'

export default function LargeTextCell({
    text
}: {
    text: string | undefined
}) {
    return (
        <p className="max-w-xs w-max">{text}</p>
    )
}
