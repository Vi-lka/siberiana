"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2, Search, X } from "lucide-react";

import { Button } from "@siberiana/ui";

import resetPaginationts from "~/lib/utils/resetPagination";
import { InputSearch } from "./InputSearch";

export default function SearchField({ placeholder }: { placeholder: string }) {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [debouncedValue, setDebouncedValue] = React.useState<string>("");
  const [mounted, setMounted] = React.useState<boolean>(false);

  const [focus, setFocus] = React.useState<boolean>(false);

  const inputRef = React.createRef<HTMLInputElement>();

  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = React.useTransition();

  const handleSearchParams = React.useCallback(
    (inputValue: string) => {
      const params = new URLSearchParams(window.location.search);

      // reset pagination(page) to prevent zero results
      resetPaginationts(params);

      if (inputValue.length > 0) {
        params.set("search", inputValue);
      } else {
        params.delete("search");
      }

      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      });
    },
    [pathname, router],
  );

  // Set Focus
  if (inputValue.length > 0) inputRef.current?.focus();

  // EFFECT: Set Initial Params
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("search") ?? "";
    setInputValue(searchQuery);
  }, []);

  // EFFECT: Set Mounted
  React.useEffect(() => {
    if (debouncedValue.length > 0 && !mounted) {
      setMounted(true);
    }
  }, [debouncedValue, mounted]);

  // EFFECT: Debounce Input Value
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue]);

  // EFFECT: Search Params
  React.useEffect(() => {
    if (mounted) handleSearchParams(debouncedValue);
  }, [debouncedValue, handleSearchParams, mounted]);

  return (
    <div className="relative">
      <InputSearch
        ref={inputRef}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder={placeholder}
        className={focus ? "ring-ring w-full ring-2 ring-offset-2" : "w-full"}
      >
        <Search className="h-4 w-4" />
      </InputSearch>

      {isPending ? (
        <div className="absolute right-2 top-2">
          <Loader2 className="animate-spin" />
        </div>
      ) : null}

      {inputValue.length > 0 ? (
        <Button
          variant="ghost"
          className="absolute right-2 top-2 h-fit w-fit p-0"
          onClick={() => {
            setDebouncedValue("");
            setInputValue("");
          }}
        >
          <X />
        </Button>
      ) : null}
    </div>
  );
}
