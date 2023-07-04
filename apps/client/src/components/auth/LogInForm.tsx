"use client"

import { Form, FormField, FormItem, FormControl, FormMessage, Input } from '@siberiana/ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { AuthDictType } from '@siberiana/schemas'
import { useLocale } from '~/lib/utils/useLocale'
import Link from 'next/link'
import ButtonComponent from '../ui/ButtonComponent'
import AuthButtons from './AuthButtons'

export default function LogInForm({ text }: { text: AuthDictType }) {

    const lang = useLocale()

    const LogInFormSchema = z.object({
      email: z
        .string({
          required_error: text.errors.required,
        })
        .email({
          message: text.errors.email,
        }),
      password: z
        .string({
          required_error: text.errors.required,
        }).min(6, { 
          message: text.errors.passwordMin
        })
    });

    const form = useForm<z.infer<typeof LogInFormSchema>>({
      resolver: zodResolver(LogInFormSchema),
    });

      
    function handleLogIn(data: z.infer<typeof LogInFormSchema>) {
      console.log(data)    
    }
    

  return (
    <div className='flex sm:flex-col-reverse flex-col-reverse justify-around items-center'>
        <Form {...form}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={form.handleSubmit(handleLogIn)} className="mt-1 h-full w-full">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-center">
                      <FormControl>
                          <Input type="email" className='p-5 mb-0 placeholder:uppercase' placeholder={text.email} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="text-center">
                      <FormControl>
                          <Input type="password" className='p-5 mt-6 mb-0 placeholder:uppercase' placeholder={text.password} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex sm:flex-row flex-col-reverse justify-between items-center mt-6">
                    <Link href={`/${lang}/reset`} className='text-sm underline'>
                        {text.reset}
                    </Link>
                    <ButtonComponent type="submit" className='px-10 py-6 uppercase text-sm sm:mb-0 mb-6'>
                        {text.logIn}
                    </ButtonComponent>
                </div>
            </form>
        </Form>

        <p className='text-center mt-5 mb-5'>{text.or}</p>
        
        <AuthButtons text={text} />
    </div>
  )
}
