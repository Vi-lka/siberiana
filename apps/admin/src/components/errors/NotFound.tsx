"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { SearchX, Undo2  } from 'lucide-react'
import { Button } from '@siberiana/ui'

export default function NotFound({ 
    children,
    goBack
}: { 
    children?: React.ReactNode,
    goBack: boolean
}) {

    const router = useRouter()
    
  return (
    <>
        {children}
        
        <div className='flex flex-col items-center text-center gap-10 mx-auto my-10'>
            <div className='flex flex-col items-center text-center gap-4'>
                <SearchX size={36} />

                <h2 className='font-OpenSans uppercase text-3xl font-bold'>
                    Не найдено
                </h2>

                <p className='font-Inter font-normal text-sm'>
                    Не удалось найти запрошенный ресурс
                </p>
            </div>

            {goBack ? (
                <Button 
                    className="p-6 uppercase font-Inter w-full max-w-[240px]"
                    onClick={() => router.back()}
                >
                    Назад
                    <Undo2 className='ml-1' size={18} />
                </Button>
            ) : null}
        </div>
    </>
  )
}
