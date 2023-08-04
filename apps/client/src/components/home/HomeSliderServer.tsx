import React from "react";
import { ZodError } from "zod";

import type { ErrorsDictType } from "@siberiana/schemas";

import { getSlider } from "~/lib/queries/strapi-server";
import ErrorToast from "../ui/ErrorToast";
import HomeSlider from "./HomeSlider";

export default async function HomeSliderServer({
  errorDict,
}: {
  errorDict: ErrorsDictType;
}) {
  try {
    await getSlider();
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      return <ErrorToast dict={errorDict} error={error.issues} place="Slider" />;
    } else {
      return <ErrorToast dict={errorDict} error={(error as Error).message} place="Slider" />;
    }
  }

  const dataResult = await getSlider();

  return <HomeSlider data={dataResult} />;
}
