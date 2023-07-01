"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import type { DictionaryType } from "@siberiana/schemas";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@siberiana/ui";

import ButtonComponent from "../ui/button-component";
import { HomeInputSearch } from "./home-input-search";

export default function HomeSearch({ dict }: { dict: DictionaryType }) {
  const [searchButton, setSearchButton] = React.useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  const SearchFormSchema = z.object({
    query: z
      .string({
        required_error: `${dict.search.error}`,
      })
      .min(2, {
        message: `${dict.search.error}`,
      }),
  });

  const form = useForm<z.infer<typeof SearchFormSchema>>({
    resolver: zodResolver(SearchFormSchema),
  });

  const watchQuery = form.watch("query");

  React.useEffect(() => {
    if (watchQuery && watchQuery.length >= 2) {
      console.log(watchQuery);
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
        React.startTransition(() => {
          router.push(`${pathname}/objects?${params.toString()}`);
          console.log(`${pathname}/objects?${params.toString()}`);
        });
      } else {
        params.delete("search");
      }
    },
    [pathname, router],
  );

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
                  className="w-[85vw] rounded-3xl border-[1.5px] py-6 pl-2 pr-1 sm:pl-6 md:w-[60vw] lg:w-[50vw] xl:w-[40vw]"
                  placeholder={dict.search.placeholder}
                  {...field}
                >
                  {searchButton ? (
                    <ButtonComponent
                      className="rounded-3xl px-2 text-[10px] uppercase sm:px-6 sm:text-sm"
                      type="submit"
                    >
                      {dict.search.button}
                    </ButtonComponent>
                  ) : (
                    <div className="invisible px-2 text-[10px] uppercase sm:px-6 sm:text-sm">
                      Найти
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
