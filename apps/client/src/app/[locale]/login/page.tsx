import { DictionarySchema } from '@siberiana/schemas';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@siberiana/ui';
import React from 'react'
import LogInForm from '~/components/auth/LogInForm';
import SignUpForm from '~/components/auth/SignUpForm';
import { getDictionary } from '~/lib/utils/getDictionary';

export default async function Login({
    params: { locale },
  }: {
    params: { locale: string };
  }) {

    const dict = await getDictionary(locale);

    const dataResult = DictionarySchema.parse(dict);

  return (
    <div className='font-Inter flex justify-center'>
        <Tabs defaultValue="signIn" className="w-full">
          <div className="bg-background w-full flex justify-center border-b-2 fixed z-40 pt-10 mt-[-8px]">
            <TabsList className="grid w-fit grid-cols-2 bg-transparent rounded-none sm:mb-0 mb-[-4px]">
              <TabsTrigger value="signIn" className="sm:text-base text-sm md:px-4 px-0 rounded-none border-b-2 border-transparent data-[state=active]:text-dark data-[state=active]:border-beaver dark:data-[state=active]:text-white dark:data-[state=active]:border-white">
                {dataResult.auth.logIn}
              </TabsTrigger>
              <TabsTrigger value="signUp" className="sm:text-base text-sm md:px-4 px-0 rounded-none border-b-2 border-transparent data-[state=active]:text-dark data-[state=active]:border-beaver dark:data-[state=active]:text-white dark:data-[state=active]:border-white">
                {dataResult.auth.signUp}
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="signIn" className="max-w-[600px] mx-auto mt-24 sm:px-20 px-8 pt-8 pb-8">
            <LogInForm text={dataResult.auth} />
          </TabsContent>
          <TabsContent value="signUp" className="max-w-[600px] mx-auto mt-24 sm:px-20 px-8 pt-8 pb-8 lg:max-w-[1200px]">
            <SignUpForm text={dataResult.auth} />
          </TabsContent>
        </Tabs>
    </div>
  )
}
