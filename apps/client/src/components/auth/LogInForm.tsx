"use client";

import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { AuthDict } from "@siberiana/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
} from "@siberiana/ui";
import ButtonComponent from "../ui/ButtonComponent";
import AuthButtons from "./AuthButtons";

export default function LogInForm({ dict }: { dict: AuthDict }) {

  const LogInFormSchema = z.object({
    email: z
      .string({
        required_error: dict.errors.required,
      })
      .email({
        message: dict.errors.email,
      }),
    password: z
      .string({
        required_error: dict.errors.required,
      })
      .min(6, {
        message: dict.errors.passwordMin,
      }),
  });

  const form = useForm<z.infer<typeof LogInFormSchema>>({
    resolver: zodResolver(LogInFormSchema),
  });

  function handleLogIn(data: z.infer<typeof LogInFormSchema>) {
    console.log(data);
  }

  return (
    <div className="flex flex-col-reverse items-center justify-around sm:flex-col-reverse">
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(handleLogIn)}
          className="mt-1 h-full w-full"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="text-center">
                <FormControl>
                  <Input
                    type="email"
                    className="mb-0 p-5 placeholder:uppercase"
                    placeholder={dict.email}
                    {...field}
                  />
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
                  <Input
                    type="password"
                    className="mb-0 mt-6 p-5 placeholder:uppercase"
                    placeholder={dict.password}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6 flex flex-col-reverse items-center justify-between sm:flex-row">
            <Link href={`/reset`} className="text-sm underline">
              {dict.reset}
            </Link>
            <ButtonComponent
              type="submit"
              className="mb-6 px-10 py-6 text-sm uppercase sm:mb-0"
            >
              {dict.signIn}
            </ButtonComponent>
          </div>
        </form>
      </Form>

      <p className="mb-5 mt-5 text-center">{dict.or}</p>

      <AuthButtons dict={dict} />
    </div>
  );
}
