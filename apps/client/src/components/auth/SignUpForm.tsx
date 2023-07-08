"use client"

import { Form, FormField, FormItem, FormControl, FormLabel, Input, FormMessage, Checkbox } from '@siberiana/ui'
import React from 'react'
import ButtonComponent from '../ui/ButtonComponent'
import AuthButtons from './AuthButtons'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { AuthDictType } from '@siberiana/schemas'
import Link from 'next/link'
import { useLocale } from '~/lib/utils/useLocale'

export default function SignUpForm({ text }: { text: AuthDictType }) {

    const lang = useLocale()

    const SignUpFormSchema = z.object({
        lastName: z
            .string({
              required_error: text.errors.required,
            }),
        firstName: z
            .string({
              required_error: text.errors.required,
            }),
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
          }),
          passwordConfirm: z
          .string({
            required_error: text.errors.required,
          }).min(6, { 
            message: text.errors.passwordMin
          }),
        researcher: z.boolean().default(false).optional(),
        ORCID: z.string().optional(),
        personalData: z.boolean({
          required_error: text.errors.required,
        }).default(false)
      }).refine((data) => data.password === data.passwordConfirm, 
        {
          message: text.errors.passwordMatch,
          path: ["passwordConfirm"], // path of error
        },
      ).refine((data) => 
        {
          if ((data.researcher === true) && ((data.ORCID === undefined) || (data.ORCID === null) || (data.ORCID === ""))) return false

          return true
        },
        {
          message: text.errors.required,
          path: ["ORCID"], // path of error
        }
      ).refine((data) => 
      {
        if (data.personalData === false) return false

        return true
      },
      {
        message: text.errors.required,
        path: ["personalData"], // path of error
      }
    )
  

    const form = useForm<z.infer<typeof SignUpFormSchema>>({
      resolver: zodResolver(SignUpFormSchema),
      defaultValues: {
        researcher: false,
        personalData: false,
      },
    });

    function handleSignUp(data: z.infer<typeof SignUpFormSchema>) {
      if (data.researcher === false) {
        data.ORCID = ""
      }
      console.log(data)    
    }

    
  return (
    <div className='flex lg:flex-row-reverse flex-col-reverse justify-around items-center'>
        <Form {...form}>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={form.handleSubmit(handleSignUp)} className="mt-1 h-full lg:w-[45%]">
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="text-center mb-0">
                      <FormControl>
                          <Input className='p-5 placeholder:uppercase' placeholder={text.lastName} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="text-center mt-6 mb-0">
                      <FormControl>
                          <Input className='p-5 placeholder:uppercase' placeholder={text.firstName} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="text-center mt-6 mb-0">
                      <FormControl>
                          <Input type="email" className='p-5 placeholder:uppercase' placeholder={text.email} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="text-center mt-6 mb-0">
                      <FormControl>
                          <Input type='password' className='p-5 placeholder:uppercase' placeholder={text.password} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem className="text-center mt-6 mb-0">
                      <FormControl>
                          <Input type='password' className='p-5 placeholder:uppercase' placeholder={text.passwordConfirm} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="researcher"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-5 space-y-0 mt-8 mb-0">
                      <FormControl>
                        <Checkbox
                          className='data-[state=checked]:bg-background dark:data-[state=checked]:bg-beaverLight w-4 h-4 border-graphite rounded-[4px]' 
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            checked !== "indeterminate"
                                ? field.onChange(checked)
                                : field.onChange(false)
                            }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className='sm:text-sm text-[12px]'>
                          {text.regAs} <Link href={`/${lang}/info`} className='underline'>{text.researcher}</Link>
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ORCID"
                  render={({ field }) => (
                    <FormItem className="text-center mt-6 mb-0">
                      <FormControl>
                          <Input type='password' className='p-5 placeholder:uppercase' style={{ display: form.getValues().researcher ? "block" : "none" }} placeholder={text.ORCID} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="personalData"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-5 space-y-0 mt-6 mb-10">
                      <FormControl>
                        <Checkbox
                          className='data-[state=checked]:bg-background dark:data-[state=checked]:bg-beaverLight w-4 h-4 border-graphite rounded-[4px]' 
                          checked={field.value}
                          onCheckedChange={(checked) => {
                            checked !== "indeterminate"
                                ? field.onChange(checked)
                                : field.onChange(false)
                            }}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className='sm:text-sm text-[12px]'>
                          {text.personalData} <Link href={`/${lang}/policy`} className='underline'>{text.personalDataLinkText}</Link>
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-6">
                    <ButtonComponent type="submit" className='w-full px-10 py-6 uppercase text-sm'>
                        {text.create}
                    </ButtonComponent>
                </div>
            </form>
        </Form>

        <p className='text-center mt-5 mb-5 lg:w-[5%]'>{text.or}</p>
                
        <AuthButtons text={text} className='lg:w-[45%] gap-12'/>                  
    </div> 
  )
}
