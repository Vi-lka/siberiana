import type { Metadata } from "next";
import React, { Suspense } from "react";

import { getProjects } from "~/lib/queries/strapi-server";

export const metadata: Metadata = {
  title: "Коллекции"
};

export default async function Collections({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const data = await getProjects(locale);

  return (
    <div>
      <p>{locale}</p>
      Collections
      <Suspense fallback={<p>Loading...</p>}>{data.toString()}</Suspense>
    </div>
  );
}
