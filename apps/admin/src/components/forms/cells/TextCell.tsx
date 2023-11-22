import React from 'react'

export default function TextCell({
    text
}: {
    text: string | undefined
}) {
    return (
        <p className="text-center max-w-xs break-words">{text ? text : "__"}</p>
    )
}
