import type { Metadata } from "next";
import { Encode_Sans, Inter } from "next/font/google";

import { Toaster } from "@siberiana/ui";

import Header from "~/components/Header";
import { ThemeProvider } from "~/components/ui/theme-provider";

import "../globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--Inter",
});

const encodeSans = Encode_Sans({
  subsets: ["latin"],
  variable: "--EncodeSans",
});

export const metadata: Metadata = {
  title: "Сибириана",
  description: "Агрегатор культурного наследия",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <html
      lang={params.locale}
      suppressHydrationWarning
      className={`${inter.variable} ${encodeSans.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" enableSystem={true}>
          <Header lang={params.locale} />
          <main>{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

// export async function generateStaticParams() {
// }
