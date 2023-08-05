import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Организации",
};

export default function OrganizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <main className="font-Inter flex flex-col">
      <div className="font-OpenSans mx-auto mt-10 w-[85%] max-w-[1600px]">
        {children}
      </div>
    </main>
  );
}
