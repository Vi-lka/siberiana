import "./globals.css";

import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import { getServerSession } from "next-auth";

import { Toaster } from "@siberiana/ui";

import NoSession from "~/components/errors/NoSession";
import Header from "~/components/header/Header";
import MenuBar from "~/components/header/MenuBar";
import LogoSvg from "~/components/LogoSvg";
import { ClientHydration } from "~/components/providers/ClientHydration";
import Providers from "~/components/providers/Providers";
import { authOptions } from "./api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_URL as string),
  title: {
    template: "%s | Сибириана-Admin",
    default: "Сибириана-Admin",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--Inter",
  // Fix font load errors: https://github.com/vercel/next.js/issues/45080#issuecomment-1646678980
  preload: false,
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--OpenSans",
  // Fix font load errors: https://github.com/vercel/next.js/issues/45080#issuecomment-1646678980
  preload: false,
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const roles = session?.user.roles;

  const canEnter =
    !!session &&
    (roles?.includes("administrator") || roles?.includes("moderator"));

  return (
    <html
      lang={"ru"}
      suppressHydrationWarning
      className={`${inter.variable} ${openSans.variable}`}
    >
      <body className="m m-0 flex min-h-screen flex-col">
        <Providers>
          <Header />
          <main className="flex-1 pt-20">
            {canEnter ? (
              children
            ) : (
              <div className="flex h-[70dvh] flex-col items-center justify-center gap-6">
                <div className="">
                  <LogoSvg className="h-[5.5rem] w-[15rem] md:h-[7rem] md:w-[19rem]" />
                </div>
                <NoSession
                  alert={
                    !!session &&
                    !(
                      roles?.includes("administrator") ||
                      roles?.includes("moderator")
                    )
                  }
                />
              </div>
            )}
          </main>
          {canEnter ? (
            <ClientHydration>
              <MenuBar />
            </ClientHydration>
          ) : null}
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
