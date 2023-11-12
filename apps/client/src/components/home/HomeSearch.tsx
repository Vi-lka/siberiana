"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { SearchDict } from "@siberiana/schemas";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@siberiana/ui";

import { HomeInputSearch } from "./HomeInputSearch";

export default function HomeSearch({ dict }: { dict: SearchDict }) {
  const [searchButton, setSearchButton] = React.useState<boolean>(false);

  const [focus, setFocus] = React.useState<boolean>(false);

  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const SearchFormSchema = z.object({
    query: z
      .string({
        required_error: dict.error,
      })
      .min(2, {
        message: dict.error,
      }),
  });

  const form = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
  });

  const watchQuery = form.watch("query");

  React.useEffect(() => {
    if (watchQuery && watchQuery.length >= 2) {
      setSearchButton(true);
    } else setSearchButton(false);
  }, [watchQuery]);

  function onSubmit(data: z.infer<typeof SearchFormSchema>) {
    handleSearchParams(data.query);
  }

  const handleSearchParams = React.useCallback(
    (inputValue: string) => {
      const params = new URLSearchParams(window.location.search);
      if (inputValue.length > 0) {
        params.set("search", inputValue);
        startTransition(() => {
          router.push(`${pathname}objects?${params.toString()}`);
        });
      } else {
        params.delete("search");
      }
    },
    [pathname, router],
  );

  if (isPending) return <Loader2 className="animate-spin" />;

  return (
    <Form {...form}>
      {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-1 h-fit w-fit">
        <FormField
          control={form.control}
          name="query"
          render={({ field }) => (
            <FormItem className="text-center">
              <FormControl>
                <HomeInputSearch
                  className={
                    focus
                      ? "ring-ring w-[85vw] border-[1.5px] py-6 pl-2 pr-1 ring-2 ring-offset-2 sm:pl-6 md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
                      : "w-[85vw] border-[1.5px] py-6 pl-2 pr-1 sm:pl-6 md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
                  }
                  placeholder={dict.placeholder}
                  {...field}
                  onFocus={() => setFocus(true)}
                  onBlur={() => setFocus(false)}
                >
                  {searchButton ? (
                    <Button
                      variant={"ghost"}
                      className="px-2 text-sm uppercase sm:px-6"
                      type="submit"
                    >
                      {dict.button}
                    </Button>
                  ) : (
                    <div className="invisible px-2 text-sm uppercase sm:px-6">
                      {dict.button}
                    </div>
                  )}
                </HomeInputSearch>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
