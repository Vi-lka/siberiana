"use client"
/* eslint-disable @typescript-eslint/no-misused-promises */

import type { AuthDictType } from '@siberiana/schemas'
import React from 'react'
import ButtonComponent from '../ui/ButtonComponent'
import { signIn, signOut } from 'next-auth/react'

type Props = {
  dict: AuthDictType,
  className?: string,
}

export const SignInButton = ({
    dict,
    className,
}: Props) => {
  return (
    <ButtonComponent 
      className={className}
      onClick={() => signIn("keycloak")}
    >
      {dict.signIn}
    </ButtonComponent>
  )
}

export const SignOutButton = ({
  dict,
  className,
}: Props) => {
return (
  <ButtonComponent 
    className={className}
    onClick={() => signOut()}
  >
    {dict.signOut}
  </ButtonComponent>
)
}
