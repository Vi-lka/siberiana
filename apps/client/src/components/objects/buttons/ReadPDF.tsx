import Link from 'next/link'
import React from 'react'
import ButtonComponent from '~/components/ui/ButtonComponent'

export default function ReadPDF({
    files,
}:{
    files: string[]
}) {

    if (files.length === 0) return null

    return (
        <Link href={files[0]} target='__blank'>
            <ButtonComponent
                className="px-4"
            >   
                <p>
                    <span className='lg:inline hidden'>Читать в</span> PDF
                </p>
            </ButtonComponent> 
        </Link>
    )
}
