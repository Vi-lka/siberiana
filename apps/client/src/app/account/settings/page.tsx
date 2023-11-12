import React from "react";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";

import { Dictionary } from "@siberiana/schemas";

import { authOptions } from "~/app/api/auth/[...nextauth]/route";
import NoSession from "~/components/errors/NoSession";
import { getDictionary } from "~/lib/utils/getDictionary";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  // fetch data
  const dict = await getDictionary();

  return {
    title: dict.breadcrumbs.settings,
  };
}

export default async function Settings() {
  const dict = await getDictionary();
  const dictResult = Dictionary.parse(dict);

  const session = await getServerSession(authOptions);
  if (!!!session) return <NoSession />;

  return <div>{dictResult.account.settings}</div>;
}
