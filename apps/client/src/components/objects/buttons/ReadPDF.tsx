import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@siberiana/ui'
import React from 'react'
import ButtonComponent from '~/components/ui/ButtonComponent'

export default function ReadPDF({
    files,
}:{
    files: string[]
}) {

    if (files.length === 0) return null

    if (files.length === 1) return (
        <a href={files[0]} target='__blank'>
            <ButtonComponent className="px-4">   
                <p>
                    <span className='lg:inline hidden'>Читать в</span> PDF
                </p>
            </ButtonComponent> 
        </a>
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className='font-Inter text-sm uppercase font-normal px-4 py-3 bg-accent hover:bg-beaver hover:text-beaverLight dark:bg-accent dark:text-beaverLight dark:hover:text-darkBlue dark:hover:bg-beaverLight rounded-3xl'>
                <p>
                    <span className='lg:inline hidden'>Читать в</span> PDF
                </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                {files.map((file, index) => (
                    <DropdownMenuItem key={index} className='font-Inter cursor-pointer' asChild>
                        <a href={file} target='__blank'>
                            <p className="max-w-[200px] truncate">
                                {file.substring(file.lastIndexOf('/') + 1)}
                            </p>
                        </a>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
