import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Коллекции",
};

export default function Collections({
  params: { locale },
}: {
  params: { locale: string };
}) {

  return (
    <div>
      <p>{locale}</p>
      Collections
    </div>
  );
}
