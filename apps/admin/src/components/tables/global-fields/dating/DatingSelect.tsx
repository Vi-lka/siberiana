"use client";

import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { ChevronsUpDown, Loader2, RotateCcw, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import type { Dating } from "@siberiana/schemas";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  ScrollArea,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import type { DatingType, Prefix } from "~/lib/utils/getDating";
import {
  centurize,
  generateValues,
  getDating,
  PREFIXES,
} from "~/lib/utils/getDating";
import Century from "./Century";
import Era from "./Era";
import MultiCentury from "./MultiCentury";
import OneYear from "./OneYear";
import TwoYears from "./TwoYears";

export default function DatingSelect({
  formValueName,
  datingStringName,
  defaultDating,
  defaultDatingString,
  className,
}: {
  formValueName: string;
  datingStringName: string;
  defaultDating: Dating;
  defaultDatingString?: string;
  className?: string;
}) {
  const [openCombobox, setOpenCombobox] = React.useState(false);
  const [datingType, setDatingType] = React.useState<DatingType>("century");
  const [isPending, startTransition] = React.useTransition();

  const form = useFormContext();
  const selected = form.getValues(formValueName) as Dating;
  const selectedLable = getDating(
    selected.datingStart,
    selected.datingEnd,
    datingType,
  );

  // Default values
  const defaultCentury =
    Math.abs(
      Math.abs(defaultDating.datingStart) - Math.abs(defaultDating.datingEnd),
    ) <= 99
      ? defaultDating.datingStart >= 0
        ? centurize(defaultDating.datingEnd).toString()
        : centurize(defaultDating.datingStart).toString()
      : "";

  const startForDefaultPrefix = Math.abs(
    defaultDating.datingStart % 100,
  ).toString();
  const endForDefaultPrefix = Math.abs(
    defaultDating.datingEnd % 100,
  ).toString();
  const defaultPrefix = PREFIXES.find(
    (prefix) =>
      prefix.start ===
        (startForDefaultPrefix.length < 2
          ? "0" + startForDefaultPrefix
          : startForDefaultPrefix) &&
      prefix.end ===
        (endForDefaultPrefix.length < 2
          ? "0" + endForDefaultPrefix
          : endForDefaultPrefix),
  );

  const defaultMutliCentury = {
    first: centurize(defaultDating.datingStart).toString(),
    second: centurize(defaultDating.datingEnd).toString(),
  };

  const defaultPrefixFirst = PREFIXES.find(
    (prefix) =>
      prefix.start ===
      (startForDefaultPrefix.length < 2
        ? "0" + startForDefaultPrefix
        : startForDefaultPrefix),
  );
  const defaultPrefixSecond = PREFIXES.find(
    (prefix) =>
      prefix.start ===
      (endForDefaultPrefix.length < 2
        ? "0" + endForDefaultPrefix
        : endForDefaultPrefix),
  );
  const defaultMutliPrefix = {
    first: defaultPrefixFirst,
    second: defaultPrefixSecond,
  };

  // Values
  const [values, setValues] = React.useState(selected);
  const [isAD, setIsAD] = React.useState(
    values.datingStart >= 0 ? true : false,
  );

  const selectedCentury =
    Math.abs(Math.abs(values.datingStart) - Math.abs(values.datingEnd)) <= 99
      ? isAD
        ? centurize(values.datingEnd).toString()
        : centurize(values.datingStart).toString()
      : "";

  const startForPrefix = Math.abs(values.datingStart % 100).toString();
  const endForPrefix = Math.abs(values.datingEnd % 100).toString();

  const selectedPrefix = PREFIXES.find(
    (prefix) =>
      prefix.start ===
        (startForPrefix.length < 2 ? "0" + startForPrefix : startForPrefix) &&
      prefix.end ===
        (endForPrefix.length < 2 ? "0" + endForPrefix : endForPrefix),
  );

  const [century, setCentury] = React.useState<string>(selectedCentury);
  const [prefix, setPrefix] = React.useState<Prefix | undefined>(
    selectedPrefix,
  );

  // Multi Values
  const [isADMulti, setIsADMulti] = React.useState({
    first: values.datingStart >= 0 ? true : false,
    second: values.datingEnd >= 0 ? true : false,
  });
  const [centuryMulti, setCenturyMulti] = React.useState({
    first: centurize(values.datingStart).toString(),
    second: centurize(values.datingEnd).toString(),
  });

  const selectedPrefixFirst = PREFIXES.find(
    (prefix) =>
      prefix.start ===
      (startForPrefix.length < 2 ? "0" + startForPrefix : startForPrefix),
  );
  const selectedPrefixSecond = PREFIXES.find(
    (prefix) =>
      prefix.start ===
      (endForPrefix.length < 2 ? "0" + endForPrefix : endForPrefix),
  );

  const [prefixMulti, setPrefixMulti] = React.useState({
    first: selectedPrefixFirst,
    second: selectedPrefixSecond,
  });

  const handleNewValue = React.useCallback(
    (newValue: Dating) => {
      startTransition(() => {
        form.setValue(
          datingStringName,
          getDating(newValue.datingStart, newValue.datingEnd, datingType),
          { shouldDirty: true, shouldValidate: true, shouldTouch: true },
        );
        form.setValue(formValueName, newValue, {
          shouldDirty: true,
          shouldValidate: true,
          shouldTouch: true,
        });
      });
      setOpenCombobox(false);
    },
    [datingStringName, datingType, form, formValueName],
  );

  const handleOpen = (open: boolean) => {
    setOpenCombobox(open);
    if (!open) handleNewValue(values);
  };

  const clear = () => {
    setValues({ datingStart: 0, datingEnd: 0 });
    setDatingType("century");
    setCentury("");
    setPrefix(undefined);
    setCenturyMulti({ first: "", second: "" });
    setPrefixMulti({ first: undefined, second: undefined });
    form.setValue(datingStringName, "", {
      shouldDirty: true,
      shouldValidate: true,
      shouldTouch: true,
    });
    form.setValue(
      formValueName,
      { datingStart: 0, datingEnd: 0 },
      { shouldDirty: true, shouldValidate: true, shouldTouch: true },
    );
    setOpenCombobox(false);
  };

  const onSelectPrefix = (prefix: Prefix | undefined) => {
    setDatingType("century");
    setPrefix(prefix);
    const { forStart, forEnd } = generateValues(century, prefix);

    if (prefix) {
      const valueStart = isAD
        ? Number(forStart + prefix.start)
        : -Number(forStart + prefix.start);
      const valueEnd = isAD
        ? Number(forEnd + prefix.end)
        : -Number(forEnd + prefix.end);
      if (isAD)
        setValues({
          datingStart: valueStart,
          datingEnd: valueEnd,
        });
      else
        setValues({
          datingStart: valueEnd,
          datingEnd: valueStart,
        });
    } else {
      const valueStart = isAD
        ? Number(forStart + "01")
        : -Number(forStart + "01");
      const valueEnd = isAD ? Number(century + "00") : -Number(century + "00");
      if (isAD)
        setValues({
          datingStart: valueStart,
          datingEnd: valueEnd,
        });
      else
        setValues({
          datingStart: valueEnd,
          datingEnd: valueStart,
        });
    }
  };

  const onChangeCentury = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDatingType("century");
    const value = e.target.value;
    setCentury(value);
    const { forStart, forEnd } = generateValues(value, prefix);

    if (prefix) {
      const valueStart = isAD
        ? Number(forStart + prefix.start)
        : -Number(forStart + prefix.start);
      const valueEnd = isAD
        ? Number(forEnd + prefix.end)
        : -Number(forEnd + prefix.end);
      if (isAD)
        setValues({
          datingStart: valueStart,
          datingEnd: valueEnd,
        });
      else
        setValues({
          datingStart: valueEnd,
          datingEnd: valueStart,
        });
    } else {
      const valueStart = isAD
        ? Number(forStart + "01")
        : -Number(forStart + "01");
      const valueEnd = isAD ? Number(value + "00") : -Number(value + "00");
      if (isAD)
        setValues({
          datingStart: valueStart,
          datingEnd: valueEnd,
        });
      else
        setValues({
          datingStart: valueEnd,
          datingEnd: valueStart,
        });
    }
  };

  const onIsADChange = (pressed: boolean) => {
    setDatingType("century");
    setIsAD(pressed);
    setValues({
      datingStart: -values.datingEnd,
      datingEnd: -values.datingStart,
    });
  };

  const onSelectPrefixMulti = (
    prefix: Prefix | undefined,
    isFirst: boolean,
  ) => {
    setDatingType("century");
    if (isFirst) {
      setPrefixMulti({
        ...prefixMulti,
        first: prefix,
      });
      const century = Number(centuryMulti.first);
      const newString = prefix
        ? `${century - 1}${prefix.start}`
        : `${century}00`;
      const newNumber = isADMulti.first
        ? Number(newString)
        : -Number(newString);

      setValues({
        ...values,
        datingStart: newNumber,
      });
    } else {
      setPrefixMulti({
        ...prefixMulti,
        second: prefix,
      });
      const century = Number(centuryMulti.second);
      const newString = prefix
        ? `${century - 1}${prefix.start}`
        : `${century}00`;
      const newNumber = isADMulti.second
        ? Number(newString)
        : -Number(newString);

      setValues({
        ...values,
        datingEnd: newNumber,
      });
    }
  };

  const onChangeCenturyMulti = (inputValue: number, isFirst: boolean) => {
    setDatingType("century");
    if (isFirst) {
      setCenturyMulti({
        ...centuryMulti,
        first: inputValue.toString(),
      });

      const newString = prefixMulti.first
        ? `${inputValue - 1}${prefixMulti.first.start}`
        : `${inputValue}00`;
      const newNumber = isADMulti.first
        ? Number(newString)
        : -Number(newString);

      setValues({
        ...values,
        datingStart: newNumber,
      });
    } else {
      setCenturyMulti({
        ...centuryMulti,
        second: inputValue.toString(),
      });

      const newString = prefixMulti.second
        ? `${inputValue - 1}${prefixMulti.second.start}`
        : `${inputValue}00`;
      const newNumber = isADMulti.second
        ? Number(newString)
        : -Number(newString);

      setValues({
        ...values,
        datingEnd: newNumber,
      });
    }
  };

  const onIsADChangeMulti = (pressed: boolean, isFirst: boolean) => {
    setDatingType("century");
    if (isFirst) {
      setIsADMulti({
        ...isADMulti,
        first: pressed,
      });
      setValues({
        datingStart: -values.datingStart,
        datingEnd: values.datingEnd,
      });
    } else {
      setIsADMulti({
        ...isADMulti,
        second: pressed,
      });
      setValues({
        datingStart: values.datingStart,
        datingEnd: -values.datingEnd,
      });
    }
  };

  const handleSetValue = (newValue: Dating) => {
    setDatingType("year");
    setValues({
      datingStart: newValue.datingStart,
      datingEnd: newValue.datingEnd,
    });
  };

  return (
    <div className={cn("relative h-full w-full", className)}>
      <DropdownMenu open={openCombobox} onOpenChange={handleOpen}>
        <DropdownMenuTrigger asChild>
          <Button
            variant={
              form.getFieldState(formValueName).isDirty ? "outline" : "ghost"
            }
            role="combobox"
            aria-expanded={openCombobox}
            className={cn(
              "text-foreground relative h-fit w-full min-w-[12rem] max-w-[14rem] justify-between px-2 py-8 text-left text-xs font-normal",
              form.getFieldState(formValueName).invalid
                ? "border-red-600"
                : form.getFieldState(formValueName).isDirty
                ? "border-green-500"
                : "",
            )}
          >
            {isPending ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <>
                {selected.datingStart === 0 && selected.datingEnd === 0
                  ? "__"
                  : selectedLable}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </>
            )}
          </Button>
        </DropdownMenuTrigger>
        {values.datingStart !== 0 && values.datingEnd !== 0 ? (
          <div className="text-muted-foreground w-full text-center text-[10px] font-light">
            <span>{values.datingStart}</span> - <span>{values.datingEnd}</span>
          </div>
        ) : null}
        <DropdownMenuContent
          side="bottom"
          align="start"
          className="font-Inter w-[200px]"
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
              {!(selected.datingStart === 0 && selected.datingEnd === 0) ? (
                <span
                  className="text-muted-foreground hover:text-foreground my-1 flex cursor-pointer items-center justify-center text-xs transition-all hover:scale-110"
                  onClick={clear}
                >
                  <X className="h-5 w-5" /> Удалить
                </span>
              ) : null}
              <ScrollArea type="always" classNameViewport="max-h-72">
                <DropdownMenuGroup className="w-max">
                  <OneYear
                    title="XXXX год"
                    placeholder={values.datingStart.toString()}
                    postfix="год"
                    onChange={(e) =>
                      handleSetValue({
                        datingStart: Number(e.target.value),
                        datingEnd: 0,
                      })
                    }
                  />
                  <OneYear
                    title="около XXXX года"
                    placeholder={values.datingStart.toString()}
                    prefix="около"
                    postfix="года"
                    onChange={(e) =>
                      handleSetValue({
                        datingStart: Number(e.target.value),
                        datingEnd: Number(e.target.value),
                      })
                    }
                  />
                  <OneYear
                    title="не ранее XXXX года"
                    placeholder={values.datingStart.toString()}
                    prefix="не ранее"
                    postfix="года"
                    onChange={(e) =>
                      handleSetValue({
                        datingStart: Number(e.target.value),
                        datingEnd: 999999,
                      })
                    }
                  />
                  <OneYear
                    title="не позднее XXXX года"
                    placeholder={values.datingEnd.toString()}
                    prefix="не позднее"
                    postfix="года"
                    onChange={(e) =>
                      handleSetValue({
                        datingStart: 999999,
                        datingEnd: Number(e.target.value),
                      })
                    }
                  />
                  <OneYear
                    title="XXXX-e годы"
                    placeholder={`${Math.floor(values.datingStart / 10) * 10}`}
                    postfix="-е годы"
                    onChange={(e) =>
                      handleSetValue({
                        datingStart:
                          Math.floor(Number(e.target.value) / 10) * 10,
                        datingEnd:
                          Math.floor(Number(e.target.value) / 10) * 10 + 9,
                      })
                    }
                  />
                  <TwoYears
                    id="yy"
                    title="XXXX-XXXX гг."
                    placeholderStart={values.datingStart.toString()}
                    placeholderEnd={values.datingEnd.toString()}
                    postfix="гг."
                    onChangeStart={(e) =>
                      handleSetValue({
                        ...values,
                        datingStart: Number(e.target.value),
                      })
                    }
                    onChangeEnd={(e) =>
                      handleSetValue({
                        ...values,
                        datingEnd: Number(e.target.value),
                      })
                    }
                  />
                  <TwoYears
                    id="yy-e"
                    title="XXXX-XXXX-e годы"
                    placeholderStart={`${
                      Math.floor(values.datingStart / 10) * 10
                    }`}
                    placeholderEnd={`${Math.floor(values.datingEnd / 10) * 10}`}
                    postfix="-е годы"
                    onChangeStart={(e) =>
                      handleSetValue({
                        ...values,
                        datingStart:
                          Math.floor(Number(e.target.value) / 10) * 10,
                      })
                    }
                    onChangeEnd={(e) =>
                      handleSetValue({
                        ...values,
                        datingEnd:
                          Math.floor(Number(e.target.value) / 10) * 10 + 9,
                      })
                    }
                  />
                  <Century
                    prefix={prefix}
                    century={century}
                    isAD={isAD}
                    onSelectPrefix={onSelectPrefix}
                    onChangeCentury={onChangeCentury}
                    onIsADChange={onIsADChange}
                  />
                  <MultiCentury
                    prefix={prefixMulti}
                    century={centuryMulti}
                    isAD={isADMulti}
                    onSelectPrefix={onSelectPrefixMulti}
                    onChangeCentury={onChangeCenturyMulti}
                    onIsADChange={onIsADChangeMulti}
                  />
                  <Era
                    selected={values}
                    handleNewValue={(newValue) => {
                      setValues({
                        datingStart: newValue.datingStart,
                        datingEnd: newValue.datingEnd,
                      });
                      handleNewValue(newValue);
                    }}
                  />
                </DropdownMenuGroup>
              </ScrollArea>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
      {form.getFieldState(formValueName).isDirty ? (
        <RotateCcw
          className="text-muted-foreground hover:text-foreground absolute right-1 top-1 z-50 h-3.5 w-3.5 cursor-pointer transition-all hover:scale-150"
          onClick={() => {
            setValues(defaultDating);
            setDatingType("century");
            setCentury(defaultCentury);
            setPrefix(defaultPrefix);
            setCenturyMulti(defaultMutliCentury);
            setPrefixMulti(defaultMutliPrefix);
            form.setValue(datingStringName, defaultDatingString, {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            });
            form.setValue(formValueName, defaultDating, {
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
