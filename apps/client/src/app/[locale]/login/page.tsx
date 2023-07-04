import { Tabs, TabsList, TabsTrigger, TabsContent } from '@siberiana/ui';
import React from 'react'
import LogInForm from '~/components/auth/LogInForm';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function Login({
    params: { locale },
  }: {
    params: { locale: string };
  }) {

    const dict = await getDictionary(locale);

  return (
    <div className='font-Inter flex justify-center mt-10'>
        <Tabs defaultValue="signIn" className="w-full">
          <div className="w-full flex justify-center border-b-2">
            <TabsList className="grid w-fit grid-cols-2 bg-transparent rounded-none mb-[-4px]">
              <TabsTrigger value="signIn" className="rounded-none border-b-2 border-transparent data-[state=active]:text-dark data-[state=active]:border-beaver dark:data-[state=active]:text-white dark:data-[state=active]:border-white">
                {dict.auth.logIn}
              </TabsTrigger>
              <TabsTrigger value="signUp" className="rounded-none border-b-2 border-transparent data-[state=active]:text-dark data-[state=active]:border-beaver dark:data-[state=active]:text-white dark:data-[state=active]:border-white">
                {dict.auth.signUp}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="signIn" className="max-w-[600px] mx-auto p-20 pt-8">
            <LogInForm text={dict.auth} />
          </TabsContent>
          <TabsContent value="signUp" className="p-20 pt-8">
            Регистрация
          </TabsContent>
        </Tabs>
    </div>
  )
}
