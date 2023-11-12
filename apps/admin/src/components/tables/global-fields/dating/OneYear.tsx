"use client";

import React from "react";

import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  Input,
} from "@siberiana/ui";

export default function OneYear(props: {
  title: string;
  placeholder: string;
  postfix: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  prefix?: string;
}) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="p-3">
        <span>{props.title}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="flex items-center gap-2 p-4">
        {props.prefix ? (
          <span className="whitespace-nowrap">{props.prefix}</span>
        ) : null}
        <div className="flex w-full max-w-sm items-center gap-1">
          <Input
            type="number"
            placeholder={props.placeholder}
            className="m-0 max-h-8 w-auto max-w-[6rem] overflow-visible truncate border-solid p-4 text-sm"
            onChange={props.onChange}
          />
        </div>
        <span className="whitespace-nowrap">{props.postfix}</span>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
