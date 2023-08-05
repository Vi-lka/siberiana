"use client"

import type { ErrorsDictType } from '@siberiana/schemas'
import { useRouter } from 'next/navigation'
import React from 'react'
import ButtonComponent from './ButtonComponent'
import { SearchX, Undo2  } from 'lucide-react'

export default function NotFound({ 
    dict, 
    children,
    goBack
}: { 
    dict: ErrorsDictType, 
    children?: React.ReactNode,
    goBack: boolean
}) {

    const router = useRouter()
    
  return (
    <>
        {children}
        
        <div className='flex flex-col items-center text-center gap-10 w-max mx-auto mt-10'>
            <div className='flex flex-col items-center text-center gap-4'>
                <SearchX size={36} />

                <h2 className='font-OpenSans uppercase text-3xl font-bold'>
                    {dict.notFound.title}
                </h2>

                <p className='font-Inter font-normal text-sm'>
                    {dict.notFound.description}
                </p>
            </div>

            {goBack ? (
                <ButtonComponent 
                    className="p-6 uppercase font-Inter w-full"
                    onClick={() => router.back()}
                >
                    {dict.notFound.goBack}
                    <Undo2 className='ml-1' size={18} />
                </ButtonComponent>
            ) : null}
        </div>
    </>
  )
}
