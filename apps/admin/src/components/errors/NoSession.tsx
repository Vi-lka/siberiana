import { Alert, AlertDescription, AlertTitle } from '@siberiana/ui';
import { AlertCircle } from 'lucide-react';
import React from 'react'
import { SignInButton } from '../auth/NextAuthButtons';

export default function NoSession({
  alert = false,
}: {
  alert?: boolean;
}) {

  return (
    <div className='w-full flex flex-col items-center py-10 font-Inter'>
      {alert 
        ? (
            <Alert variant="destructive" className='w-fit'>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle className='font-OpenSans'>Доступ запрещен</AlertTitle>
              <AlertDescription>
                Нет прав доступа. / Срок действия сеанса истек.
              </AlertDescription>
            </Alert>
        ) 
        : null     
      }

        <SignInButton className='text-base uppercase font-Inter font-normal px-10 py-6 mt-6' />
    </div>
  )
}
