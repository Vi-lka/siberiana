import { Toaster } from "@siberiana/ui";

import "./globals.css";

import type { Metadata } from "next";

import LocaleSwitcher from "~/components/locale-switcher";
import { getLangs } from "~/lib/queries/strapi-api";

export const metadata: Metadata = {
  title: "Сибириана",
  description: "Агрегатор культурного наследия",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { localesCodes } = await getLangs();

  return (
    <html lang={params.locale}>
      <body>
        <LocaleSwitcher locales={localesCodes} />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
