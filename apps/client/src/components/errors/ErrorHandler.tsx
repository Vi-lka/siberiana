import React from "react";
import { ZodError } from "zod";

import { Dictionary } from "@siberiana/schemas";

import { getDictionary } from "~/lib/utils/getDictionary";
import ErrorToast from "./ErrorToast";
import NotFound from "./NotFound";

type Props = {
  error: unknown;
  place: string;
  children?: React.ReactNode;
} & (TrueNotFoundProps | FalseNotFoundProps);

type TrueNotFoundProps = {
  notFound: true;
  goBack: boolean;
};

type FalseNotFoundProps = {
  notFound: false;
};

export default async function ErrorHandler(props: Props) {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  if ((props.error as Error).message === "NEXT_NOT_FOUND") {
    if (props.notFound)
      return (
        <NotFound dict={dictResult.errors} goBack={props.goBack}>
          {props.children}
        </NotFound>
      );
    else return null;
  } else {
    console.log("ErrorHandler: ", props.error);
    return (
      <ErrorToast
        dict={dictResult.errors}
        error={
          props.error instanceof ZodError
            ? props.error.issues
            : (props.error as Error).message
        }
        place={props.place}
      />
    );
  }
}
