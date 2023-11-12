"use client";

import React from "react";

import {
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  Input,
  Label,
} from "@siberiana/ui";

export default function TwoYears(props: {
  id: string;
  title: string;
  placeholderStart: string;
  placeholderEnd: string;
  postfix: string;
  onChangeStart: React.ChangeEventHandler<HTMLInputElement>;
  onChangeEnd: React.ChangeEventHandler<HTMLInputElement>;
  prefix?: string;
}) {
  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger className="p-3">
        <span>{props.title}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent className="flex items-end gap-1 p-4">
        {props.prefix ? (
          <span className="whitespace-nowrap">{props.prefix}</span>
        ) : null}
        <div className="flex w-full max-w-sm flex-col gap-1">
          <Label htmlFor={`yearStart${props.id}`}>Начало:</Label>
          <Input
            type="number"
            id={`yearStart${props.id}`}
            placeholder={props.placeholderStart}
            className="m-0 max-h-8 w-auto max-w-[6rem] overflow-visible truncate border-solid p-4 text-sm"
            onChange={props.onChangeStart}
          />
        </div>
        <span className="text-lg font-semibold">-</span>
        <div className="flex w-full max-w-sm flex-col gap-1">
          <Label htmlFor={`yearEnd${props.id}`}>Конец:</Label>
          <Input
            type="number"
            id={`yearEnd${props.id}`}
            placeholder={props.placeholderEnd}
            className="m-0 max-h-8 w-auto max-w-[6rem] overflow-visible truncate border-solid p-4 text-sm"
            onChange={props.onChangeEnd}
          />
        </div>
        <span className="whitespace-nowrap">{props.postfix}</span>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}
