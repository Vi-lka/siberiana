import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { Dictionary } from "@siberiana/schemas";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@siberiana/ui";

import LogInForm from "~/components/auth/LogInForm";
import SignUpForm from "~/components/auth/SignUpForm";
import { getDictionary } from "~/lib/utils/getDictionary";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function LoginUnused() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/account");
  }

  return (
    <div className="font-Inter flex justify-center">
      <Tabs defaultValue="signIn" className="w-full">
        <div className="bg-background fixed z-40 mt-[-8px] flex w-full justify-center border-b-2 pt-10">
          <TabsList className="mb-[-4px] grid w-fit grid-cols-2 rounded-none bg-transparent sm:mb-0">
            <TabsTrigger
              value="signIn"
              className="data-[state=active]:text-dark data-[state=active]:border-beaver rounded-none border-b-2 border-transparent px-0 text-sm dark:data-[state=active]:border-white dark:data-[state=active]:text-white sm:text-base md:px-4"
            >
              {dictResult.auth.signIn}
            </TabsTrigger>
            <TabsTrigger
              value="signUp"
              className="data-[state=active]:text-dark data-[state=active]:border-beaver rounded-none border-b-2 border-transparent px-0 text-sm dark:data-[state=active]:border-white dark:data-[state=active]:text-white sm:text-base md:px-4"
            >
              {dictResult.auth.signUp}
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent
          value="signIn"
          className="mx-auto mt-24 max-w-[600px] px-8 pb-8 pt-8 sm:px-20"
        >
          <LogInForm dict={dictResult.auth} />
        </TabsContent>
        <TabsContent
          value="signUp"
          className="mx-auto mt-24 max-w-[600px] px-8 pb-8 pt-8 sm:px-20 lg:max-w-[1200px]"
        >
          <SignUpForm dict={dictResult.auth} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
