"use client"

import React from 'react'
import ButtonComponent from '../../ui/ButtonComponent'

export default function Open3DModel({
    data
}: {
    data: {
        displayName: string;
    } | null
}) {

    if (data === null) return null

    return (
        <ButtonComponent 
            disabled
            className="px-4" 
            onClick={() => console.log(data)}
        >
            <p>
                <span className='lg:inline hidden'>Посмотреть в</span> 3D
            </p>
        </ButtonComponent>
    )
}
