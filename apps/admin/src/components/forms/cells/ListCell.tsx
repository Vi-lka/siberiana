import { CircleDot } from 'lucide-react'
import React from 'react'

export default function ListCell({
    values
}: {
    values: {
        id: string;
        displayName: string;
    }[]
}) {

    if (values.length === 0) return <p className='text-center'>__</p>

    return (
        <ul className="flex flex-col gap-1">
            {values.map(value => (
                <li key={value.id} className="flex items-center p-2 text-xs">
                    <CircleDot className='w-3 h-3 mr-1.5' /> 
                    <p className='flex-1 break-words'>{value.displayName}</p>
                </li>
            ))}
        </ul>
    )
}
