"use client";

import React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import type { SortData, SortDict } from "@siberiana/schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import ButtonComponent from "../ButtonComponent";

export default function Sort({
  dict,
  data,
  defaultValue,
  side = "bottom",
  align = "end",
  className,
}: {
  dict: SortDict;
  data: SortData[];
  defaultValue?: string;
  side?: "bottom" | "top" | "right" | "left";
  align?: "end" | "center" | "start";
  className?: string;
}) {
  const [isPending, startTransition] = React.useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sort = searchParams.get("sort") ?? undefined;

  const handleSortParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set("sort", value);
        startTransition(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        params.delete("sort");
      }
    },
    [pathname, router],
  );

  if (isPending)
    return <Loader2 className={cn("h-10 w-5 animate-spin", className)} />;

  return (
    <Select
      defaultValue={defaultValue}
      value={sort}
      onValueChange={handleSortParams}
    >
      <SelectTrigger className={cn("font-Inter w-fit border-none", className)}>
        <SelectValue placeholder={dict.placeholder} />
      </SelectTrigger>
      <SelectContent side={side} align={align}>
        {data.map((elem, index) =>
          elem.val ? (
            <SelectItem
              key={index}
              value={`${elem.val}`}
              className="font-Inter cursor-pointer"
              // Prevent propagation: https://github.com/radix-ui/primitives/issues/1658#issuecomment-1664079551
              ref={(ref) => {
                if (!ref) return;
                ref.ontouchstart = (e) => {
                  e.preventDefault();
                };
              }}
            >
              {elem.text}
            </SelectItem>
          ) : (
            <Separator key={index} className="my-1" />
          ),
        )}
        {sort && sort !== defaultValue ? (
          <ButtonComponent
            className="font-Inter z-[100] mt-4 h-8 w-full rounded-sm px-2 py-0 text-xs font-normal uppercase"
            onClick={() => {
              const params = new URLSearchParams(window.location.search);
              params.delete("sort");
              startTransition(() => {
                router.push(`${pathname}?${params.toString()}`, {
                  scroll: false,
                });
              });
            }}
          >
            {dict.reset}
          </ButtonComponent>
        ) : null}
      </SelectContent>
    </Select>
  );
}
