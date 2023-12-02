"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { TechSupportDict } from "@siberiana/schemas";
import {
  Checkbox,
  Dialog,
  DialogContent,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from "@siberiana/ui";

import ButtonComponent from "../ui/ButtonComponent";
import sendMailAction from "./sendMailAction";

export default function FeedbackForm({ dict }: { dict: TechSupportDict }) {
  const [personal, setPersonal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

  const id = useId();

  const TechSupportFormSchema = z.object({
    name: z
      .string({
        required_error: dict.errors.required,
      })
      .min(1, dict.errors.required),
    email: z
      .string({
        required_error: dict.errors.required,
      })
      .email({
        message: dict.errors.email,
      }),
    reason: z.string({
      required_error: dict.errors.required,
    }),
    text: z
      .string({
        required_error: dict.errors.required,
      })
      .min(1, dict.errors.required),
  });

  const form = useForm<z.infer<typeof TechSupportFormSchema>>({
    resolver: zodResolver(TechSupportFormSchema),
    mode: "onChange",
  });

  const handleSubmit = async (data: z.infer<typeof TechSupportFormSchema>) => {
    await sendMailAction(data);
    form.reset();
    setSuccessModal(true);
  };

  return (
    <div>
      <Form {...form}>
        <form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={form.handleSubmit(handleSubmit)}
          className="mt-1 h-full w-full"
        >
          <FormField
            control={form.control}
            name="name"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    className="mb-0 p-5 placeholder:uppercase"
                    placeholder={dict.name}
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
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="text"
                    className="mb-0 mt-6 p-5 placeholder:uppercase"
                    placeholder={dict.emali}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="mb-0 mt-6 p-5">
                      <SelectValue
                        placeholder={
                          <span className="text-muted-foreground uppercase">
                            {dict.reason}
                          </span>
                        }
                      />
                    </SelectTrigger>

                    <SelectContent>
                      <SelectItem
                        value="1"
                        className="font-Inter cursor-pointer"
                      >
                        Lorem ipsum dolor sit amet.
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="text"
            defaultValue=""
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    rows={5}
                    className="mb-0 mt-6 p-4 placeholder:uppercase"
                    placeholder={dict.text}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="mt-6">
            <ButtonComponent
              disabled={!personal || form.formState.isSubmitting}
              type="submit"
              className="px-10 py-6 text-sm uppercase"
            >
              {dict.submit}
            </ButtonComponent>
          </div>

          <div className="mb-0 mt-8 flex flex-row items-center space-x-5 space-y-0">
            <Checkbox
              className="data-[state=checked]:bg-background dark:data-[state=checked]:bg-beaverLight border-graphite h-4 w-4 rounded-[4px]"
              checked={personal}
              id={id + "-personal"}
              onCheckedChange={() => setPersonal((prev) => !prev)}
            />

            <div className="space-y-1 leading-none">
              <label
                htmlFor={id + "-personal"}
                className="cursor-pointer text-xs sm:text-sm"
              >
                {dict.personalData}
              </label>
            </div>
          </div>
        </form>
      </Form>

      <Dialog open={successModal} onOpenChange={() => setSuccessModal(false)}>
        <DialogContent className="font-Inter max-w-[48rem] overflow-hidden whitespace-nowrap py-20 text-center">
          <h1 className="text-foreground text-2xl font-bold uppercase">
            {dict.successTitle}
          </h1>
          <p className="mb-5 inline text-base">{dict.successSubtitle}</p>

          <div>
            <Link href={`/`}>
              <ButtonComponent className="px-10 py-6 text-sm uppercase">
                {dict.backHomeButton}
              </ButtonComponent>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
