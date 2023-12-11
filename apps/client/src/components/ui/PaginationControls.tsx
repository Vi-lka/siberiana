"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
  Loader2,
} from "lucide-react";

import type { PaginationDict } from "@siberiana/schemas";
import { Button, Input } from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import ButtonComponent from "./ButtonComponent";

export default function PaginationControls({
  dict,
  length,
  defaultPageSize,
  pageParam,
  perParam,
  className,
  classNameMore,
}: {
  dict: PaginationDict;
  length: number;
  defaultPageSize: number;
  pageParam?: string;
  perParam?: string;
  className?: string;
  classNameMore?: string;
}) {
  const [isPendingMore, startTransitionMore] = React.useTransition();
  const [isPendingPage, startTransitionPage] = React.useTransition();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const pageP = pageParam ?? "page";
  const perP = perParam ?? "per";

  const page = searchParams.get(pageP) ?? "1";
  const per = searchParams.get(perP) ?? defaultPageSize;

  const [pageInput, setPageInput] = React.useState(page);

  React.useEffect(() => {
    setPageInput(page);
  }, [page]);

  const max_page = Math.ceil(length / Number(per));

  const handleChangeInput = (value: string) => {
    if (Number(value) > max_page) {
      setPageInput(max_page.toString());
    } else if (Number(value) <= 0) {
      setPageInput("");
    } else setPageInput(value);
  };

  const handlePageParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set(pageP, value);
        startTransitionPage(() => {
          router.push(`${pathname}?${params.toString()}`);
        });
      } else if (value.length === 0) {
        setPageInput(page);
      } else {
        params.delete(pageP);
      }
    },
    [page, pageP, pathname, router],
  );

  const handlePageSizeParams = React.useCallback(
    (value: string) => {
      const params = new URLSearchParams(window.location.search);
      if (value.length > 0) {
        params.set(perP, value);
        startTransitionMore(() => {
          router.push(`${pathname}?${params.toString()}`, { scroll: false });
        });
      } else {
        params.delete(perP);
      }
    },
    [perP, pathname, router],
  );

  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-12 xl:flex-row xl:items-start xl:justify-end xl:gap-0",
        className,
      )}
    >
      {Number(pageInput) === 1 ? (
        <ButtonComponent
          className={cn(
            "xl:absolute xl:left-1/2 xl:-translate-x-1/2",
            classNameMore,
          )}
          variant={Number(page) >= max_page ? "hidden" : "default"}
          disabled={isPendingPage || isPendingMore}
          onClick={() =>
            handlePageSizeParams((Number(per) + defaultPageSize).toString())
          }
        >
          <span className="sr-only">{dict.showMore}</span>
          {isPendingMore ? <Loader2 className="animate-spin" /> : dict.showMore}
        </ButtonComponent>
      ) : null}

      <div
        className="flex flex-col-reverse items-center gap-3 lg:flex-row lg:gap-6"
        style={{ display: Number(per) >= length ? "none" : "flex" }}
      >
        <p className="font-Inter flex items-center">
          {isPendingPage ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              {dict.page}
              <Input
                className={cn(
                  "font-Inter mx-2 w-16 text-base font-normal",
                  max_page < 9 ? "w-14" : max_page > 99 ? "w-20" : "w-16",
                )}
                type="number"
                value={pageInput}
                onChange={(e) => handleChangeInput(e.target.value)}
                onKeyDownCapture={(event) => {
                  if (event.key === "Enter") {
                    handlePageParams(pageInput);
                  }
                }}
                onBlurCapture={() => handlePageParams(pageInput)}
              />
              {dict.of} {max_page}
            </>
          )}
        </p>

        <div className="flex items-center space-x-2">
          {/* FIRST */}
          <Button
            variant="outline"
            className="h-10 w-10 p-0"
            disabled={Number(page) <= 1 || isPendingPage || isPendingMore}
            onClick={() => handlePageParams("1")}
          >
            {/* For SEO */}
            <Link
              href={`${pathname}/?${pageP}=1&${perP}=${per}`}
              className="hidden"
            >
              {dict.firstPage}
            </Link>
            <span className="sr-only">{dict.firstPage}</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          {/* PREVIOUS */}
          <Button
            variant="outline"
            className="h-10 w-10 p-0"
            disabled={Number(page) <= 1 || isPendingPage || isPendingMore}
            onClick={() => handlePageParams((Number(page) - 1).toString())}
          >
            {/* For SEO */}
            <Link
              href={`${pathname}/?${pageP}=${Number(page) - 1}&${perP}=${per}`}
              className="hidden"
            >
              {dict.previousPage}
            </Link>
            <span className="sr-only">{dict.previousPage}</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {/* NEXT */}
          <Button
            variant="outline"
            className="h-10 w-10 p-0"
            disabled={
              Number(page) >= max_page || isPendingPage || isPendingMore
            }
            onClick={() => handlePageParams((Number(page) + 1).toString())}
          >
            {/* For SEO */}
            <Link
              href={`${pathname}/?${pageP}=${Number(page) + 1}&${perP}=${per}`}
              className="hidden"
            >
              {dict.nextPage}
            </Link>
            <span className="sr-only">{dict.nextPage}</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>

          {/* LAST */}
          <Button
            variant="outline"
            className="h-10 w-10 p-0"
            disabled={
              Number(page) >= max_page || isPendingPage || isPendingMore
            }
            onClick={() => handlePageParams(max_page.toString())}
          >
            {/* For SEO */}
            <Link
              href={`${pathname}/?${pageP}=${max_page}&${perP}=${per}`}
              className="hidden"
            >
              {dict.lastPage}
            </Link>
            <span className="sr-only">{dict.lastPage}</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
