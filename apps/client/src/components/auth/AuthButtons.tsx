import React from 'react'
import ButtonComponent from '../ui/ButtonComponent'
import type { AuthDictType } from '@siberiana/schemas'
import GoogleSvg from '../GoogleSvg'
import { cn } from '@siberiana/ui/src/lib/utils'

export default function AuthButtons({ text, className }: { text: AuthDictType, className?: string }) {

  return (
    <div 
      className={cn(
        "flex flex-col justify-between gap-6 w-full",
        className,
      )}
    >
        <ButtonComponent className='auth-button sm:px-10 px-4 py-6 uppercase' onClick={() => console.log("Sign In with Google")}>
          <GoogleSvg className='w-5 h-5 mr-2' />
          {text.authButtons.google}
        </ButtonComponent>
    </div>
  )
}
