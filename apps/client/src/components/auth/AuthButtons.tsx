import React from 'react'
import ButtonComponent from '../ui/ButtonComponent'
import type { AuthDictType } from '@siberiana/schemas'

export default function AuthButtons({ text }: { text: AuthDictType }) {

  return (
    <div className='flex flex-col justify-between gap-6 mt-4'>
        <p className=' text-center'>{text.or}</p>
        <ButtonComponent className='px-10 py-6' onClick={() => console.log("Sign In with Google")}>
            {text.authButtons.google}
        </ButtonComponent>
        <ButtonComponent className='px-10 py-6' onClick={() => console.log("Sign In with Google")}>
            {text.authButtons.google}
        </ButtonComponent>
    </div>
  )
}
