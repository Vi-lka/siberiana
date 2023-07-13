import React from "react";
import type { Metadata } from "next";
import { ZodError } from "zod";

import { DictionarySchema } from "@siberiana/schemas";

import ErrorToast from "~/components/ui/ErrorToast";
import { getOrganizations } from "~/lib/queries/strapi-server";
import { getDictionary } from "~/lib/utils/getDictionary";

export const metadata: Metadata = {
  title: "Организации",
};

export default async function Organizations({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const dict = await getDictionary(locale);
  const dictResult = DictionarySchema.parse(dict);

  try {
    await getOrganizations(locale);
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error.issues);
      return <ErrorToast dict={dictResult.errors} error={error.issues} />;
    } else {
      return (
        <ErrorToast dict={dictResult.errors} error={(error as Error).message} />
      );
    }
  }

  const dataResult = await getOrganizations(locale);

  return <div className="">{dataResult.toString()}</div>;
}
