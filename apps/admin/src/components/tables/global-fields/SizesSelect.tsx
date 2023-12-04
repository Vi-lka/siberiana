"use client";

import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { ChevronsUpDown, CircleDot, Loader2, RotateCcw, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { Sizes } from "@siberiana/schemas";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Input,
  Label,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import { getLable, isWhat, isZero } from "~/lib/utils/sizes-utils";

export default function SizesSelect({
  formValueName,
  defaultValues,
  className,
}: {
  formValueName: string;
  defaultValues: Sizes;
  className?: string;
}) {
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const form = useFormContext();
  const selected = form.getValues(formValueName) as Sizes;
  const selectedLable = getLable(selected);

  const [values, setValues] = React.useState(selected);

  const zeroObj = {
    width: 0,
    height: 0,
    length: 0,
    depth: 0,
    diameter: 0,
  };

  const clear = () => {
    setValues(zeroObj);
    form.setValue(formValueName, zeroObj, {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    setOpenCombobox(false);
  };

  const handleNewValue = React.useCallback(
    (newValue: Sizes) => {
      startTransition(() => {
        form.setValue(formValueName, newValue, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      });
      setOpenCombobox(false);
    },
    [form, formValueName],
  );

  const handleOpen = (open: boolean) => {
    setOpenCombobox(open);
    if (!open) handleNewValue(values);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && openCombobox) {
      setOpenCombobox(false);
      handleNewValue(values);
    }
  };

  const customDirty =
    JSON.stringify(selected) !== JSON.stringify(defaultValues);

  return (
    <div className="relative h-full w-full">
      <DropdownMenu open={openCombobox} onOpenChange={handleOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openCombobox}
            className={cn(
              "text-foreground relative h-fit w-max min-w-[70px] justify-between border-transparent px-2 py-8 text-left text-xs font-normal",
              className,
              form.getFieldState(formValueName).invalid
                ? "border-red-600"
                : form.getFieldState(formValueName).isDirty || customDirty
                  ? "border-green-500"
                  : "",
            )}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {selectedLable}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="bottom"
          align="start"
          className="font-Inter w-[200px]"
          onKeyDown={handleKeyDown}
        >
          <DropdownMenuLabel className="flex items-center justify-between">
            Выберите:
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {isPending ? (
            <Loader2 className="h-8 w-8 animate-spin" />
          ) : (
            <>
              {!isZero(selected) ? (
                <span
                  className="text-muted-foreground hover:text-foreground my-1 flex cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
                  onClick={clear}
                >
                  <X className="h-5 w-5" /> Удалить
                </span>
              ) : null}
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="p-3">
                    <CircleDot
                      className={cn(
                        "mr-2 h-4 w-4",
                        isWhat(selected) === "3D" ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span>3D</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="flex flex-col gap-2 p-2">
                    <div className="flex w-full max-w-sm items-center gap-1">
                      <Label htmlFor="x">X:</Label>
                      <Input
                        type="number"
                        id="x"
                        placeholder={values.width.toString()}
                        className="m-0 max-h-8 w-auto max-w-[8rem] overflow-visible truncate border-solid px-2 py-0 text-xs"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            width: Number(e.target.value),
                            diameter: 0,
                            length: 0,
                          })
                        }
                      />
                    </div>
                    <div className="flex w-full max-w-sm items-center gap-1">
                      <Label htmlFor="y">Y:</Label>
                      <Input
                        type="number"
                        id="y"
                        placeholder={values.height.toString()}
                        className="m-0 max-h-8 w-auto max-w-[8rem] overflow-visible truncate border-solid px-2 py-0 text-xs"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            height: Number(e.target.value),
                            diameter: 0,
                            length: 0,
                          })
                        }
                      />
                    </div>
                    <div className="flex w-full max-w-sm items-center gap-1">
                      <Label htmlFor="z">Z:</Label>
                      <Input
                        type="number"
                        id="z"
                        placeholder={values.depth.toString()}
                        className="m-0 max-h-8 w-auto max-w-[8rem] overflow-visible truncate border-solid px-2 py-0 text-xs"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            depth: Number(e.target.value),
                            diameter: 0,
                            length: 0,
                          })
                        }
                      />
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="p-3">
                    <CircleDot
                      className={cn(
                        "mr-2 h-4 w-4",
                        isWhat(selected) === "2D" ? "opacity-100" : "opacity-0",
                      )}
                    />
                    <span>2D</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="flex flex-col gap-2 p-2">
                    <div className="flex w-full max-w-sm flex-col gap-1">
                      <Label htmlFor="x">Ширина:</Label>
                      <Input
                        type="number"
                        id="x"
                        placeholder={values.width.toString()}
                        className="m-0 max-h-8 w-auto max-w-[8rem] overflow-visible truncate border-solid px-2 py-0 text-xs"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            width: Number(e.target.value),
                            depth: 0,
                            diameter: 0,
                            height: 0,
                          })
                        }
                      />
                    </div>
                    <div className="flex w-full max-w-sm flex-col gap-1">
                      <Label htmlFor="y">Длина:</Label>
                      <Input
                        type="number"
                        id="y"
                        placeholder={values.length.toString()}
                        className="m-0 max-h-8 w-auto max-w-[8rem] overflow-visible truncate border-solid px-2 py-0 text-xs"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            length: Number(e.target.value),
                            depth: 0,
                            diameter: 0,
                            height: 0,
                          })
                        }
                      />
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>

                <DropdownMenuSub>
                  <DropdownMenuSubTrigger className="p-3">
                    <CircleDot
                      className={cn(
                        "mr-2 h-4 w-4",
                        isWhat(selected) === "diameter"
                          ? "opacity-100"
                          : "opacity-0",
                      )}
                    />
                    <span>Диаметр</span>
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="flex flex-col gap-2 p-2">
                    <div className="flex w-full max-w-sm flex-col gap-1">
                      <Label htmlFor="y">Высота:</Label>
                      <Input
                        type="number"
                        id="y"
                        placeholder={values.height.toString()}
                        className="m-0 max-h-8 w-auto max-w-[8rem] overflow-visible truncate border-solid px-2 py-0 text-xs"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            height: Number(e.target.value),
                            depth: 0,
                            length: 0,
                            width: 0,
                          })
                        }
                      />
                    </div>
                    <div className="flex w-full max-w-sm flex-col gap-1">
                      <Label htmlFor="x">Диаметр:</Label>
                      <Input
                        type="number"
                        id="x"
                        placeholder={values.diameter.toString()}
                        className="m-0 max-h-8 w-auto max-w-[8rem] overflow-visible truncate border-solid px-2 py-0 text-xs"
                        onChange={(e) =>
                          setValues({
                            ...values,
                            diameter: Number(e.target.value),
                            depth: 0,
                            length: 0,
                            width: 0,
                          })
                        }
                      />
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              </DropdownMenuGroup>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {form.getFieldState(formValueName).isDirty || customDirty ? (
        <RotateCcw
          className="text-muted-foreground hover:text-foreground absolute right-1 top-1 z-50 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
          onClick={() => {
            setValues(defaultValues);
            form.setValue(formValueName, defaultValues, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
          }}
        />
      ) : null}
      <ErrorMessage
        errors={form.formState.errors}
        name={formValueName}
        render={({ message }) => (
          <p className="text-destructive text-sm font-medium">{message}</p>
        )}
      />
    </div>
  );
}
