"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
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
  useToast,
} from "@siberiana/ui";

import ButtonComponent from "../ui/ButtonComponent";

export default function LogInForm({ dict }: { dict: AuthDict }) {
  const router = useRouter();
  const { toast } = useToast();

  const LogInFormSchema = z.object({
    username: z.string({
      required_error: dict.errors.required,
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
    mode: "onChange",
  });

  const handleLogIn = async (data: z.infer<typeof LogInFormSchema>) => {
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: data.username,
        password: data.password,
      });
      if (!res?.error) {
        router.refresh(); // apply in header
        router.push("/account");
      } else {
        throw new Error(res.error ? res.error : "Error");
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: dict.errors.denied,
        description: dict.errors.deniedDescription,
        className: "font-Inter",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-around">
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(handleLogIn)}
          className="mt-1 h-full w-full"
        >
          <FormField
            control={form.control}
            name="username"
            defaultValue=""
            render={({ field }) => (
              <FormItem className="text-center">
                <FormControl>
                  <Input
                    type="text"
                    disabled={form.formState.isSubmitting}
                    className="mb-0 p-5 placeholder:uppercase"
                    placeholder={dict.login}
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
            defaultValue=""
            render={({ field }) => (
              <FormItem className="text-center">
                <FormControl>
                  <Input
                    type="password"
                    disabled={form.formState.isSubmitting}
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
              disabled={!(form.formState.isDirty && form.formState.isValid)}
              type="submit"
              className="mb-6 px-10 py-6 text-sm uppercase sm:mb-0"
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="mx-auto h-8 w-8 animate-spin" />
              ) : (
                dict.signIn
              )}
            </ButtonComponent>
          </div>
        </form>
      </Form>
    </div>
  );
}
