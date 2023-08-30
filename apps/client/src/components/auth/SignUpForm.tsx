"use client";

import React from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { AuthDict } from "@siberiana/schemas";
import {
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@siberiana/ui";

import ButtonComponent from "../ui/ButtonComponent";
import AuthButtons from "./AuthButtons";

export default function SignUpForm({ dict }: { dict: AuthDict }) {

  const SignUpFormSchema = z
    .object({
      lastName: z.string({
        required_error: dict.errors.required,
      }),
      firstName: z.string({
        required_error: dict.errors.required,
      }),
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
      passwordConfirm: z
        .string({
          required_error: dict.errors.required,
        })
        .min(6, {
          message: dict.errors.passwordMin,
        }),
      researcher: z.boolean().default(false).optional(),
      ORCID: z.string().optional(),
      personalData: z
        .boolean({
          required_error: dict.errors.required,
        })
        .default(false),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: dict.errors.passwordMatch,
      path: ["passwordConfirm"], // path of error
    })
    .refine(
      (data) => {
        if (
          data.researcher === true &&
          (data.ORCID === undefined || data.ORCID === null || data.ORCID === "")
        )
          return false;

        return true;
      },
      {
        message: dict.errors.required,
        path: ["ORCID"], // path of error
      },
    )
    .refine(
      (data) => {
        if (data.personalData === false) return false;

        return true;
      },
      {
        message: dict.errors.required,
        path: ["personalData"], // path of error
      },
    );

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      researcher: false,
      personalData: false,
    },
  });

  function handleSignUp(data: z.infer<typeof SignUpFormSchema>) {
    if (data.researcher === false) {
      data.ORCID = "";
    }
    console.log(data);
  }

  return (
    <div className="flex flex-col-reverse items-center justify-around lg:flex-row-reverse">
      <Form {...form}>
        <form
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(handleSignUp)}
          className="mt-1 h-full lg:w-[45%]"
        >
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="mb-0 text-center">
                <FormControl>
                  <Input
                    className="p-5 placeholder:uppercase"
                    placeholder={dict.lastName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="mb-0 mt-6 text-center">
                <FormControl>
                  <Input
                    className="p-5 placeholder:uppercase"
                    placeholder={dict.firstName}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-0 mt-6 text-center">
                <FormControl>
                  <Input
                    type="email"
                    className="p-5 placeholder:uppercase"
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
              <FormItem className="mb-0 mt-6 text-center">
                <FormControl>
                  <Input
                    type="password"
                    className="p-5 placeholder:uppercase"
                    placeholder={dict.password}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => (
              <FormItem className="mb-0 mt-6 text-center">
                <FormControl>
                  <Input
                    type="password"
                    className="p-5 placeholder:uppercase"
                    placeholder={dict.passwordConfirm}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="researcher"
            render={({ field }) => (
              <FormItem className="mb-0 mt-8 flex flex-row items-start space-x-5 space-y-0">
                <FormControl>
                  <Checkbox
                    className="data-[state=checked]:bg-background dark:data-[state=checked]:bg-beaverLight border-graphite h-4 w-4 rounded-[4px]"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      checked !== "indeterminate"
                        ? field.onChange(checked)
                        : field.onChange(false);
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs sm:text-sm">
                    {dict.regAs}{" "}
                    <Link href={`/info`} className="underline">
                      {dict.researcher}
                    </Link>
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
              <FormItem className="mb-0 mt-6 text-center">
                <FormControl>
                  <Input
                    type="password"
                    className="p-5 placeholder:uppercase"
                    style={{
                      display: form.getValues().researcher ? "block" : "none",
                    }}
                    placeholder={dict.ORCID}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="personalData"
            render={({ field }) => (
              <FormItem className="mb-10 mt-6 flex flex-row items-start space-x-5 space-y-0">
                <FormControl>
                  <Checkbox
                    className="data-[state=checked]:bg-background dark:data-[state=checked]:bg-beaverLight border-graphite h-4 w-4 rounded-[4px]"
                    checked={field.value}
                    onCheckedChange={(checked) => {
                      checked !== "indeterminate"
                        ? field.onChange(checked)
                        : field.onChange(false);
                    }}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-xs sm:text-sm">
                    {dict.personalData}{" "}
                    <Link href={`/policy`} className="underline">
                      {dict.personalDataLinkText}
                    </Link>
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-6">
            <ButtonComponent
              type="submit"
              className="w-full px-10 py-6 text-sm uppercase"
            >
              {dict.create}
            </ButtonComponent>
          </div>
        </form>
      </Form>

      <p className="mb-5 mt-5 text-center lg:w-[5%]">{dict.or}</p>

      <AuthButtons dict={dict} className="gap-12 lg:w-[45%]" />
    </div>
  );
}
