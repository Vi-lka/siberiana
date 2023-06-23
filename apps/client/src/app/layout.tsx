import { Toaster } from "@siberiana/ui";

import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata  = {
  title: "Сибириана",
  description: "Агрегатор культурного наследия",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
