"use client"

import React from 'react'
import ButtonComponent from '../../ui/ButtonComponent'
import { ArrowDownCircle } from 'lucide-react'

export default function UnloadCSV({
    session,
}: {
    session: boolean,
}) {

    return (
        <ButtonComponent 
            disabled
            className="px-4"
            onClick={() => console.log(session)}
        >
            <p className='flex items-center gap-1'>
                <span className='lg:block hidden'>Выгрузить в</span> CSV <ArrowDownCircle className='w-5 h-5' />
            </p>
        </ButtonComponent>
    )
}