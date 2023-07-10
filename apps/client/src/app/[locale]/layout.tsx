import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";

import { Toaster } from "@siberiana/ui";

import Header from "~/components/header/Header";
import { ThemeProvider } from "~/components/ui/ThemeProvider";

import "../globals.css";

const inter = Inter({
  subsets: ["cyrillic", "latin"],
  variable: "--Inter",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--OpenSans",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
  alternates: {
    canonical: '/',
    languages: {
      'ru': '/ru',
      'en': '/en',
    },
  },
  openGraph: {
    title: 'Сибириана',
    description: 'Агрегатор культурного наследия',
    url: process.env.NEXT_PUBLIC_URL,
    siteName: 'Сибириана',
    images: '/images/og-image.png',
  },
  title: {
    default: "Сибириана",
    template: "%s | Сибириана"
  },
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
      className={`${inter.variable} ${openSans.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" enableSystem={true}>
          <Header lang={params.locale} />
          <main className="pt-20">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
// TODO: generate locales
// export async function generateStaticParams() {
// }
